<template>
    <div class="rightForm">
      <!--对话框-->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
        <span>确定删除科室信息？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="deleteOffice" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <!--表单-->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="科室编号" prop="code" :span="12" required>
              <el-input v-model.number="ruleForm.code" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示顺序" prop="seq" :span="12" required>
              <el-input v-model.number="ruleForm.seq" placeholder="请输入显示顺序"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="科室名称" required prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入科室名称"></el-input>
            </el-form-item>
          </el-col>
          <!--<el-col :span="12">-->
            <!--<el-form-item label="导检顺序" prop="pilotSeq" required>-->
              <!--<el-input-number v-model="ruleForm.pilotSeq" controls-position="right" @change="handleChange" :min="1" style="width:100%;" placeholder="请输入导检顺序"></el-input-number>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        </el-row>
        <el-form-item label="科室类型" prop="type" required>
          <el-radio-group v-model="ruleForm.type">
            <el-radio v-for="type in officeType" :label="type.id" :key="type.id">{{type.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <!--<el-form-item label="科室汇总" prop="summary">-->
          <!--<el-input v-model="ruleForm.summary" placeholder="请输入科室汇总"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="备注" prop="remark">
          <el-input v-model="ruleForm.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="操作员" prop="operator">
              <el-input type="text" v-model="operator" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="修改日期" prop="updatedAt">
              <el-input v-model="updatedAt" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <!--<el-col :span="12">-->
            <!--<el-form-item>-->
          <el-button type="primary" @click="resetForm('ruleForm')" size="small">增加</el-button>
          <el-button type="success" @click="submitForm('ruleForm')" size="small" :disabled="saveDisabled">保存</el-button>
          <el-button type="danger" @click="dialogVisible = true" size="small" :disabled="deleteDisabled">删除</el-button>
          <el-button type="warning" @click="updateOffice('ruleForm')" size="small" :disabled="updateDisabled">修改</el-button>
          <el-button size="small" @click="reloadTree">刷新</el-button>
            <!--</el-form-item>-->
          <!--</el-col>-->
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item></el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
</template>

<script>
import http from '@/api/index.js'
import Bus from '@/utils/bus.js'
import formatDate from '@/utils/formatDate.js'
export default {
  name: "officeForm",
  data () {
    return {
      ruleForm: {
        code: '',
        seq: '',
        name: '',
        // pilotSeq: '',
        pid: 0,
        type: '',
        // summary: '',
        remark: ''
      },
      currentId: '',
      length: '',
      dialogVisible: false,
      operator: '',
      updatedAt: '',
      rules: {
        seq: [
          { required: true, message: '请输入显示顺序', trigger: 'blur' },
          {type: 'number', message: '显示顺序必须为数字', trigger: 'blur'}
        ],
        name: [
          { required: true, message: '请输入科室名称', trigger: 'blur' }
        ],
        // pilotSeq: [
        //   { required: true, message: '请选择导检顺序', trigger: 'change' },
        //   {type: 'number', message: '导检顺序必须为数字', trigger: 'change'}
        // ],
        type: [
          { required: true, message: '请选择科室类型', trigger: 'change' }
        ],
        pid: [
          {required: true, message: '请选择上级科室', trigger: 'change'}
        ]
      },
      options: [],
      officeType: [],
      pid: '',
      saveDisabled: false,
      deleteDisabled: true,
      updateDisabled: true
    };
  },
  methods: {
    // 增加科室信息
    submitForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          console.log(that.length);
          console.log(that.options);
          if (that.options.length > 0) {
            that.ruleForm.pid = that.options[0].id;
          }
          console.log(that.ruleForm.pid);
          http.addOffice(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '添加科室信息成功！',
                type: 'success'
              });
              that.resetForm('ruleForm');
              http.officeTree().then(function (response) {
                console.log(response);
                if (response.status === 200 && response.data.result === '00000000') {
                  Bus.$emit("addOfficeTree", response.data.data);
                  that.length = response.data.data.length;
                  if (response.data.data[0].pid === 0) {
                    console.log(response.data.data[0].pid);
                    that.pid = response.data.data[0].id;
                    console.log(that.pid);
                  }
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
      this.getOfficeList();
      this.saveDisabled = false;
      this.deleteDisabled = true;
      this.updateDisabled = true;
    },
    // 删除科室信息
    deleteOffice () {
      let that = this;
      that.dialogVisible = false;
      console.log(that.currentId);
      http.deleteOffice(that.currentId).then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.$message({
            message: '删除科室信息成功！',
            type: 'success'
          });
          that.resetForm('ruleForm');
          http.officeTree().then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              Bus.$emit("deleteOfficeTree", response.data.data);
              that.length = response.data.data.length;
            }
          }).catch(function (error) {
            console.log(error);
          });
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    // 修改科室信息
    updateOffice (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          http.updateOffice(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '修改科室信息成功！',
                type: 'success'
              });
              http.officeTree().then(function (response) {
                console.log(response);
                if (response.status === 200 && response.data.result === '00000000') {
                  Bus.$emit("updateOfficeTree", response.data.data);
                  that.length = response.data.data.length;
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
    handleChange (value) {
      console.log(value);
    },
    // 获取上级科室列表
    getOfficeList () {
      let that = this;
      http.officeList().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.options = response.data.data;
          for (let i = 0; i < that.options.length; i++) {
            that.options[i].value = that.options[i].name;
          }
          console.log(that.options);
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    // 获取科室类型
    getOfficeType () {
      let that = this;
      http.officeType().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          console.log(that.officeType);
          let obj = [];
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].pid !== 0) {
              obj.push(response.data.data[i]);
            }
          }
          that.officeType = obj;
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    // 选择上级科室
    selectOffice (value) {
      // let that = this;
      console.log(value);
    },
    // 获取下一个科室编号
    getCode () {
      let that = this;
      http.officeCode().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.ruleForm.code = response.data.data;
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    // 刷新树结构
    reloadTree () {
      let that = this;
      Bus.$emit("loading1", true);
      http.officeTree().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.length = response.data.data.length;
          Bus.$emit("reloadOfficeTree", response.data.data);
          Bus.$emit("loading2", false);
        }
      }).catch(function (error) {
        console.log(error);
      })
    }
  },
  mounted () {
    this.getOfficeList();
    this.getOfficeType();
    this.getCode();
    Bus.$on("officeDetail", (e) => {
      this.ruleForm = e;
      this.operator = e.operator;
      this.updatedAt = formatDate(e.updatedAt);
    });
    Bus.$on("currentId", (e) => {
      this.currentId = e;
    });
    Bus.$on("length", (e) => {
      this.length = e;
    });
    Bus.$on("saveDisabledOffice", (e) => {
      this.saveDisabled = e;
    });
    Bus.$on("deleteDisabledOffice", (e) => {
      this.deleteDisabled = e;
    });
    Bus.$on("updateDisabledOffice", (e) => {
      this.updateDisabled = e;
    });
  }
}
</script>

<style scoped>
  .rightForm{
    float:right;
    width:83%;
    height:90%;
    background:#fff;
    margin-left:1%;
    padding-right:1%;
    padding-top:1%;
    overflow:auto;
  }
  .el-radio-group{
    width:100%;
  }
  .el-select{
    width:100%;
  }
  .el-input{
    width:100%!important;
  }
</style>
<style>
  @import '../../styles/common.css';
</style>

