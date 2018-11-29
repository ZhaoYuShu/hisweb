<template>
  <div class="rightForm">
    <!--对话框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定删除体检项目？</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="deleteExamItem" size="small">确 定</el-button>
        </span>
    </el-dialog>
    <!--表单-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="科室名称" prop="officeId" :span="12" required>
            <el-select v-model="ruleForm.officeId" filterable placeholder="请选择科室">
              <el-option v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单价" prop="price" :span="12" required>
            <el-input v-model.number="ruleForm.price" placeholder="请输入单价"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="项目编号" required prop="code">
            <el-input v-model="ruleForm.code" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="显示顺序" prop="seq" required>
            <el-input v-model.number="ruleForm.seq" placeholder="请输入显示顺序"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="项目名称" prop="name" required>
            <el-input v-model="ruleForm.name" placeholder="请输入项目名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" prop="sex" required>
            <el-select v-model="ruleForm.sex" placeholder="请选择性别">
              <!--<el-option label="男" value="1"></el-option>-->
              <!--<el-option label="女" value="2"></el-option>-->
              <!--<el-option label="所有" value="0"></el-option>-->
              <el-option
                v-for="item in sex"
                :key="item.id"
                :label="item.value"
                :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="临床类型" prop="clinicId">
            <el-select v-model="ruleForm.clinicId" filterable placeholder="请选择临床类型">
                <el-option
                  v-for="item in type"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位" prop="unit">
            <el-input v-model="ruleForm.unit" placeholder="请输入单位"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="收费类别" prop="chargeType">
            <el-select v-model="ruleForm.chargeType" filterable placeholder="请选择收费类别">
              <el-option
                v-for="item in chargeType"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="正常结果" prop="normalResult">
            <el-input v-model="ruleForm.normalResult" placeholder="请输入正常结果"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="结果类型" prop="resultType" required>
            <el-radio-group v-model="ruleForm.resultType">
              <!--<el-radio label="1">字符</el-radio>-->
              <!--<el-radio label="0">数值</el-radio>-->
              <el-radio
                v-for="item in resultType"
                :key="item.id"
                :label="item.id">{{item.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="启用标志" prop="status" required>
            <el-radio-group v-model="ruleForm.status">
              <!--<el-radio label="1">是</el-radio>-->
              <!--<el-radio label="0">否</el-radio>-->
              <el-radio
                v-for="item in status"
                :key="item.id"
                :label="item.id">{{item.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="最小极限值" prop="minValue">
            <el-input type="text" v-model="ruleForm.minValue"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最大极限值" prop="maxValue">
            <el-input type="text" v-model="ruleForm.maxValue"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <!--<el-col :span="12">-->
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
  name: "examForm",
  data () {
    return {
      ruleForm: {
        officeId: '',
        price: '',
        code: '',
        seq: '',
        name: '',
        sex: '',
        clinicId: '',
        unit: '',
        normalResult: '',
        resultType: '',
        status: '',
        minValue: '',
        maxValue: '',
        chargeType: ''
      },
      rules: {
        officeId: [
          {required: true, message: '请选择科室名称'}
        ],
        price: [
          {required: true, message: '请输入单价', trigger: 'blur'},
          {type: 'number', message: '单价必须为数字', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '项目编号不能为空', trigger: 'blur'}
        ],
        seq: [
          { required: true, message: '请输入显示顺序', trigger: 'blur' },
          {type: 'number', message: '显示顺序必须为数字', trigger: 'blur'}
        ],
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        resultType: [
          {required: true, message: "请选择结果类型", trigger: 'change'}
        ],
        status: [
          {required: true, message: '请选择启用标志', trigger: 'change'}
        ]
      },
      options: [],
      currentId: '',
      resultType: [
        {id: 1, value: '字符'},
        {id: 0, value: '数值'}
      ],
      status: [
        {id: 1, value: '是'},
        {id: 0, value: '否'}
      ],
      dialogVisible: false,
      sex: [
        {id: 1, value: '男'},
        {id: 2, value: '女'},
        {id: 0, value: '所有'}
      ],
      type: [],
      chargeType: [],
      saveDisabled: false,
      deleteDisabled: true,
      updateDisabled: true
    };
  },
  methods: {
    submitForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          http.addExamItem(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '添加体检项目成功！',
                type: 'success'
              });
              that.resetForm('ruleForm');
              http.examItemTree().then(function (response) {
                console.log(response);
                Bus.$emit("addExamTree", response.data.data);
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
    resetForm (formName) {
      this.$refs[formName].resetFields();
      this.getCode();
      this.saveDisabled = false;
      this.deleteDisabled = true;
      this.updateDisabled = true;
      this.ruleForm.id = '';
    },
    handleChange (value) {
      console.log(value);
    },
    // 获取项目编号
    getCode () {
      let that = this;
      http.examItemCode().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.ruleForm.code = response.data.data;
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    // 获取科室名称
    getOffice () {
      let that = this;
      http.officeList().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          let arr = [];
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].pid !== 0) {
              arr.push(response.data.data[i]);
            }
          }
          that.options = arr;
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    // 获取所有收费类别
    getAllChargeType () {
      let that = this;
      http.getAllChargeType().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          let arr = [];
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].pid !== 0) {
              arr.push(response.data.data[i]);
            }
          }
          that.chargeType = arr;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 获取所有临床类型
    getAllClinic () {
      let that = this;
      http.allClinic().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          let arr = [];
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].pid !== 0) {
              arr.push(response.data.data[i]);
            }
          }
          arr.unshift({id: 0, name: '无'});
          that.type = arr;
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    // 删除体检项目
    deleteExamItem () {
      let that = this;
      that.dialogVisible = false;
      http.deleteExamItem(this.currentId).then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.$message({
            message: '删除体检项目成功！',
            type: 'success'
          });
          that.resetForm('ruleForm');
          http.examItemTree().then(function (response) {
            console.log(response);
            Bus.$emit("deleteExamTree", response.data.data);
          }).catch(function (error) {
            console.log(error);
          });
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    // 修改体检项目
    updateForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          http.updateExamItem(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '修改体检项目成功！',
                type: 'success'
              });
              http.examItemTree().then(function (response) {
                console.log(response);
                Bus.$emit("updateExamTree", response.data.data);
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
    // 刷新树结构
    reloadTree () {
      let that = this;
      Bus.$emit("loading1", true);
      http.examItemTree().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          Bus.$emit("reloadExamTree", response.data.data);
          Bus.$emit("loading2", false);
        }
      }).catch(function (error) {
        console.log(error);
      })
    }
  },
  created () {
    this.getCode();
    this.getOffice();
    this.getAllClinic();
    this.getAllChargeType();
    Bus.$on("examDetail", (e) => {
      this.ruleForm = e;
      // let date = new Date(e.updatedAt);
      // let year = date.getFullYear();
      // let month = date.getMonth() + 1;
      // let day = date.getDate();
      this.operator = e.operator;
      this.updatedAt = formatDate(e.updatedAt);
    });
    Bus.$on('currentId', (e) => {
      this.currentId = e;
    });
    Bus.$on("saveDisabledExam", (e) => {
      this.saveDisabled = e;
    });
    Bus.$on("deleteDisabledExam", (e) => {
      this.deleteDisabled = e;
    });
    Bus.$on("updateDisabledExam", (e) => {
      this.updateDisabled = e;
    });
  }
}
</script>

<style scoped>
  .rightForm{
    float:right;
    width:77%;
    height:90%;
    background:#fff;
    margin-left:2%;
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
</style>
<!--<style>-->
  <!--@import '../../style/common.css';-->
<!--</style>-->
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
