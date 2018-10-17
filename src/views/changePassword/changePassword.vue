<template>
  <div class="container">
    <el-form :model="form" ref="form" :rules="rules" label-width="100px" class="demo-form">
      <el-row type="flex" justify="center">
        <el-col :span="8">
          <el-form-item label="原密码" prop="oldPassWord">
            <el-input v-model="form.oldPassWord" placeholder="请输入原密码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="8">
          <el-form-item label="新密码" prop="passWord">
            <el-input v-model="form.passWord" placeholder="请输入新密码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="8">
          <el-form-item label="确认密码" prop="rePassWord">
            <el-input v-model="form.rePassWord" placeholder="请输入确认密码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-button type="primary" size="small" @click="submitForm('form')">保存</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import http from '@/api/index.js'
export default {
  name: "changePassword",
  data () {
    let checkPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入确认密码"));
      }
      if (value !== this.form.passWord) {
        return callback(new Error("两次密码不一致"));
      }
      if (value && value === this.form.passWord) {
        return callback();
      }
    };
    return {
      form: {
        oldPassWord: '',
        passWord: '',
        rePassWord: '',
        userNo: ''
      },
      rules: {
        oldPassWord: [
          {required: true, message: '请输入原密码', trigger: 'blur'}
        ],
        passWord: [
          {required: true, message: '请输入新密码', trigger: 'blur'}
        ],
        rePassWord: [
          {required: true, validator: checkPassword, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 保存
    submitForm (formName) {
      let that = this;
      that.$refs[formName].validate((valid) => {
        if (valid) {
          http.userPassword(that.form).then(response => {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '修改密码成功',
                type: 'success'
              });
            } else {
              that.$message({
                message: response.data.msg,
                type: 'error'
              });
            }
          }).catch(error => {
            console.log(error);
          });
        }
      });
    },
    // 获取当前登录用户信息
    getCurrentInfo () {
      let that = this;
      http.currentUser().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.form.userNo = response.data.data.userNo;
        }
      }).catch(error => {
        console.log(error);
      });
    }
  },
  mounted () {
    this.getCurrentInfo();
  }
}
</script>

<style scoped>
  .container{
    width:100%;
    height:90%;
    overflow:hidden;
    padding-top:1%;
    background:#fff;
  }
  .title{
    font-size:12px;
    font-weight: bold;
    text-align: left;
    text-indent: 20px;
  }
</style>
