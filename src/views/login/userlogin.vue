<template>
  <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
    <el-form-item prop="mobile">
      <el-input size="small" @keyup.enter.native="handleLogin" v-model="loginForm.mobile" auto-complete="off" placeholder="请输入用户名">
        <i slot="prefix" class="icon-yonghu"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="passWord">
      <el-input size="small" @keyup.enter.native="handleLogin" :type="passwordType" v-model="loginForm.passWord" auto-complete="off" placeholder="请输入密码">
        <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
        <i slot="prefix" class="icon-mima"></i>
      </el-input>
    </el-form-item>
    <!--<el-checkbox v-model="checked">记住账号</el-checkbox>-->
    <el-form-item>
      <el-button type="primary" size="small" @click.native.prevent="handleLogin" class="login-submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// import { isvalidUsername } from '@/utils/validate'
import { login } from '@/api/login'
import http from '@/api/index.js'
export default {
  name: 'userlogin',
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!isvalidUsername(value)) {
    //     callback(new Error('请输入正确的用户名'))
    //   } else {
    //     callback()
    //   }
    // }
    const validateCode = (rule, value, callback) => {
      if (this.code.value !== value) {
        this.loginForm.code = ''
        this.refreshCode()
        callback(new Error('请输入正确的验证码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        mobile: '',
        passWord: ''
      },
      checked: false,
      code: {
        src: '',
        value: '',
        len: 4,
        type: 'text'
      },
      loginRules: {
        mobile: [
          { required: true, trigger: 'blur', message: '请输入用户名' }
        ],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' }
        ]
      },
      passwordType: 'password'
    }
  },
  created() {
  },
  mounted() {},
  computed: {
  },
  props: [],
  methods: {
    showPassword() {
      this.passwordType === ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
    handleLogin() {
      let that = this;
      that.$refs.loginForm.validate(valid => {
        if (valid) {
          // this.$store.dispatch('Login', this.loginForm)
          http.login(that.loginForm).then(response => {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              const menuList = JSON.stringify(response.data.data.menuList);
              const buttonList = JSON.stringify(response.data.data.buttonList);
              const user = response.data.data.user;
              const token = response.data.data.user.token;
              localStorage.setItem('menuList', menuList);
              localStorage.setItem('buttonList', buttonList);
              localStorage.setItem('user', user);
              localStorage.setItem('token', token);
              console.log((this.$router));
              that.$router.push({ path: '/' })
              // this.$router.go()
            } else {
              that.$message({
                message: response.data.msg,
                type: 'error'
              });
            }
          }).catch(error => {
            console.log(error)
          })
        }
      })
    }
  }
}
</script>
<style>
</style>
