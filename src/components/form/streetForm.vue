<template>
  <div class="rightForm">
    <!--对话框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定删除街道名称？</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteOffice">确 定</el-button>
        </span>
    </el-dialog>
    <!--表单-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="街道编号" prop="code" :span="12" required>
            <el-input v-model.number="ruleForm.code" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="街道名称" required prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入街道名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="操作员" prop="operator">
            <el-input type="text" v-model="ruleForm.modifier" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="修改日期" prop="date">
            <el-input v-model="ruleForm.date" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="resetForm('ruleForm')">增加</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button type="primary" @click="dialogVisible = true">删除</el-button>
        <el-button type="primary" @click="updateOffice('ruleForm')">修改</el-button>
      </el-form-item>
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
export default {
  name: "streetForm",
  data () {
    return {
      ruleForm: {
        code: '',
        name: '',
        pid: '',
        operator: '',
        date: ''
      },
      currentId: '',
      dialogVisible: false,
      rules: {
        name: [
          { required: true, message: '请输入街道名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 增加街道名称
    submitForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          http.addOffice(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '添加街道名称成功！',
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
    // 删除街道名称
    deleteOffice () {
      let that = this;
      that.dialogVisible = false;
      http.deleteOffice(this.currentId).then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.$message({
            message: '删除街道名称成功！',
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
    // 修改街道名称
    updateOffice (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          http.updateOffice(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '修改街道名称成功！',
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
  width:80%;
  height:90%;
  float:right;
  padding-right:1%;
  margin-left:4%;
  padding-top:20px;
  overflow:auto;
  background:#fff;
}
</style>
