<template>
  <div class="rightForm">
    <!--对话框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定删除服务行业？</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteOffice">确 定</el-button>
        </span>
    </el-dialog>
    <!--表单-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="行业编号" prop="code" :span="12" required>
            <el-input v-model.number="ruleForm.code" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="有效日期" prop="effectiveDate" :span="12" required>
            <el-input v-model.number="ruleForm.effectiveDate" placeholder="请输入有效日期"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="行业名称" prop="name" required>
        <el-input v-model="ruleForm.name" placeholder="请输入行业名称"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="ruleForm.remark" placeholder="请输入备注" type="textarea"></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="操作员" prop="operator">
            <el-input type="text" v-model="ruleForm.operator" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="修改日期" prop="date">
            <el-input v-model="ruleForm.date" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" @click="resetForm('ruleForm')" size="small">增加</el-button>
            <el-button type="success" @click="submitForm('ruleForm')" size="small">保存</el-button>
            <el-button type="danger" @click="dialogVisible = true" size="small">删除</el-button>
            <el-button type="warning" @click="updateOffice('ruleForm')" size="small">修改</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import http from '@/api/index.js'
// import bus from '@/util/bus.js'
export default {
  name: "serviceForm",
  data () {
    return {
      ruleForm: {
        code: '',
        effectiveDate: '',
        name: '',
        pid: '',
        remark: '',
        operator: '',
        date: ''
      },
      currentId: '',
      dialogVisible: false,
      rules: {
        name: [
          { required: true, message: '请输入行业名称', trigger: 'blur' }
        ],
        effectiveDate: [
          { required: true, message: '请输入有效日期', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    // 增加服务行业
    submitForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          http.addOffice(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '添加服务行业成功！',
                type: 'success'
              });
              that.getOfficeList();
              http.officeTree().then(function (response) {
                console.log(response);
                that.$parent.$children[0].data = response.data.data;
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
    },
    // 删除服务行业
    deleteOffice () {
      let that = this;
      that.dialogVisible = false;
      http.deleteOffice(this.currentId).then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.$message({
            message: '删除服务行业成功！',
            type: 'success'
          });
          that.resetForm('ruleForm');
          http.officeTree().then(function (response) {
            console.log(response);
            that.$parent.$children[0].data = response.data.data;
          }).catch(function (error) {
            console.log(error);
          });
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    // 修改服务行业
    updateOffice (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          http.updateOffice(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '修改服务行业成功！',
                type: 'success'
              });
              that.getOfficeList();
              http.officeTree().then(function (response) {
                console.log(response);
                that.$parent.$children[0].data = response.data.data;
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
    }
  },
  mounted () {
    this.getCode();
  }
}
</script>

<style scoped>
  .rightForm{
    float:right;
    width:80%;
    height:90%;
    background:#fff;
    margin-left:4%;
    padding-right:1%;
    padding-top:20px;
    overflow:auto;
  }
  .el-radio-group{
    width:100%;
  }
  .el-select{
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
