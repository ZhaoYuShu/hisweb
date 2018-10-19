<template>
  <div class="rightForm">
    <!--对话框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定删除申请单？</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="deleteApplication" size="small">确 定</el-button>
        </span>
    </el-dialog>
    <!--表单-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="分类编号" prop="code" required>
            <el-input v-model="ruleForm.code" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分类名称" prop="name" required>
            <el-input v-model="ruleForm.name" placeholder="请输入分类名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="显示顺序" prop="seq">
            <el-input v-model.number="ruleForm.seq" placeholder="请输入显示顺序"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标本类型" prop="sampleTypeCode" required>
            <el-select v-model="ruleForm.sampleTypeCode">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="检查类型" prop="type" required>
            <el-radio-group v-model="ruleForm.type">
              <el-radio
                v-for="item in checkType"
                :key="item.id"
                :label="item.id">{{item.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="ruleForm.remark" placeholder='请输入备注'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="操作员" prop="operator">
            <el-input type="text" v-model="operator" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="修改日期" prop="updatedAt">
            <el-input type="text" v-model="updatedAt" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <!--<el-col :span="24">-->
          <!--<el-form-item>-->
        <el-button type="primary" @click="resetForm('ruleForm')" size="small">增加</el-button>
        <el-button type="success" @click="submitForm('ruleForm')" size="small" :disabled="saveDisabled">保存</el-button>
        <el-button type="danger" @click="dialogVisible = true" size="small" :disabled="deleteDisabled">删除</el-button>
        <el-button type="warning" @click="updateForm('ruleForm')" size="small" :disabled="updateDisabled">修改</el-button>
        <el-button size="small" @click="reloadTree">刷新</el-button>
          <!--</el-form-item>-->
        <!--</el-col>-->
      </el-row>
    </el-form>
  </div>
</template>

<script>
import http from '@/api/index.js'
import Bus from '@/utils/bus.js'
import formatDate from '@/utils/formatDate.js'
export default {
  name: "applicationForm",
  data () {
    return {
      ruleForm: {
        code: '',
        name: '',
        seq: '',
        sampleTypeCode: '',
        type: '',
        remark: '',
        pid: '0',
        examGroupItemList: []
      },
      updatedAt: '',
      operator: '',
      rules: {
        name: [
          {required: true, message: '请输入分类名称', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请选择检查类型', trigger: 'change'}
        ],
        sampleTypeCode: [
          {required: true, message: '请选择标本类型', trigger: 'change'}
        ]
      },
      checkType: [
        {id: 1, value: '检验项目'},
        {id: 2, value: '医生检查'},
        {id: 3, value: '功能检查'}
      ],
      options: [],
      currentId: '',
      dialogVisible: false,
      saveDisabled: false,
      deleteDisabled: true,
      updateDisabled: true,
      length: '',
      pid: ''
    };
  },
  methods: {
    // 保存
    submitForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          console.log(that.length);
          // 判断是一级菜单还是二级菜单
          if (that.length > 0) {
            that.ruleForm.pid = that.pid;
          }
          http.addApplication(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '添加申请单成功！',
                type: 'success'
              });
              that.resetForm('ruleForm');
              http.applicationTree().then(function (response) {
                console.log(response);
                if (response.status === 200 && response.data.result === '00000000') {
                  Bus.$emit('addApplicationTree', response.data.data);
                  that.length = response.data.data.length;
                } else {
                  that.$message({
                    message: response.data.msg,
                    type: 'error'
                  });
                }
              }).catch(function (error) {
                console.log(error);
              });
            } else {
              that.$message({
                message: response.data.msg,
                type: 'error'
              });
            }
          }).catch(function (error) {
            console.log(error);
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields();
      this.getCode();
      Bus.$emit('examItems2', []);
      this.saveDisabled = false;
      this.deleteDisabled = true;
      this.updateDisabled = true;
      this.ruleForm.id = '';
    },
    handleChange (value) {
      console.log(value);
    },
    // 获取编号
    getCode () {
      let that = this;
      http.applicationCode().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.ruleForm.code = response.data.data;
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    // 获取标本类型
    getSampleType () {
      let that = this;
      http.sampleList().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          let arr = [];
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].pid !== 0) {
              arr.push(response.data.data[i]);
            }
          }
          arr.unshift({code: '0', name: '无', id: 0});
          that.options = arr;
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    // 删除申请单
    deleteApplication () {
      let that = this;
      that.dialogVisible = false;
      http.deleteApplication(this.currentId).then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.$message({
            message: '删除申请单成功！',
            type: 'success'
          });
          that.resetForm('ruleForm');
          http.applicationTree().then(function (response) {
            console.log(response);
            Bus.$emit('deleteApplicationTree', response.data.data);
            that.length = response.data.data.length;
          }).catch(function (error) {
            console.log(error);
          });
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    // 修改申请单
    updateForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          http.updateApplication(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '修改申请单成功！',
                type: 'success'
              });
              Bus.$emit('applicationItems', []);
              http.applicationTree().then(function (response) {
                console.log(response);
                Bus.$emit('updateApplicationTree', response.data.data);
                that.length = response.data.data.length;
              }).catch(function (error) {
                console.log(error);
              });
            } else {
              that.$message({
                message: response.data.msg,
                type: 'error'
              });
            }
          }).catch(function (error) {
            console.log(error);
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 获取顶级id
    getId () {
      let that = this;
      http.applicationTree().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.pid = response.data.data[0].id
        }
        console.log(that.pid);
      }).catch(error => {
        console.log(error);
      });
    },
    // 刷新左边树结构
    reloadTree () {
      let that = this;
      Bus.$emit("loading1", true);
      http.applicationTree().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.length = response.data.data.length;
          Bus.$emit("reloadApplicationTree", response.data.data);
          Bus.$emit("loading2", false);
        }
      }).catch(function (error) {
        console.log(error);
      })
    }
  },
  mounted () {
    this.getCode();
    this.getSampleType();
    this.getId();
    let that = this;
    Bus.$on('applicationForm', (e) => {
      that.ruleForm = e;
      // let date = new Date(e.updatedAt);
      // let year = date.getFullYear();
      // let month = date.getMonth() + 1;
      // let day = date.getDate();
      this.operator = e.operator;
      this.updatedAt = formatDate(e.updatedAt);
    });
    Bus.$on('applicationId', (e) => {
      that.currentId = e;
      console.log(e);
    });
    Bus.$on('examGroupItems2', (e) => {
      that.ruleForm.examGroupItemList = e;
      console.log(e);
    });
    Bus.$on("saveDisabledApplication", (e) => {
      this.saveDisabled = e;
    });
    Bus.$on("deleteDisabledApplication", (e) => {
      this.deleteDisabled = e;
    });
    Bus.$on("updateDisabledApplication", (e) => {
      this.updateDisabled = e;
    });
    Bus.$on("length", (e) => {
      this.length = e;
    });
  }
}
</script>

<style scoped>
  .rightForm{
    float:left;
    width:68%;
    height:100%;
    background:#fff;
    padding-right:1%;
    padding-top:20px;
    overflow:auto;
    overflow-x:hidden;
  }
  .el-radio-group{
    width:100%;
  }
</style>
<style scoped>
  >>>.el-form-item__label{
    font-size:12px;
  }
  >>>.el-input__inner{
    height:30px;
    line-height:30px;
  }
  >>>.el-input-number.is-controls-right .el-input-number__increase{
    height:15px;
    top:5px;
  }
  >>>.el-input-number.is-controls-right .el-input-number__decrease{
    height:15px;
    bottom:5px;
  }
  >>>.el-form-item{
    margin-bottom:15px;
  }
  >>>.el-date-editor.el-input, >>>.el-date-editor.el-input__inner{
    width:100%;
  }
  >>>.el-select{
    width:100%;
  }
  >>>.el-table{
    font-size:12px;
  }
  >>>.el-table td, >>>.el-table th{
    padding:0.8vh 0;
  }
  >>>.el-tree-node__label{
    font-size:12px;
  }
  >>>.el-radio__label{
    font-size:12px;
  }
  >>>.el-checkbox+.el-checkbox{
    display:block;
  }
  >>>.el-transfer-panel__item.el-checkbox{
    margin-left:30px;
  }

</style>
