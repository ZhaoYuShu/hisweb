<template>
    <el-header>
      <span class="title">体检管理系统</span>
      <el-dropdown size="small">
        <el-button type="primary" size="small">
          更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><router-link to="/" class="item">工作台</router-link></el-dropdown-item>
          <el-dropdown-item><router-link to="/changePassword" class="item">修改密码</router-link></el-dropdown-item>
          <el-dropdown-item><router-link to="/login" class="item">退出系统</router-link></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
</template>

<script>
export default {
  name: 'Headers',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .el-header{
    display:block;
    width:100%;
    background:#fff;
    color:#333;
    text-align:center;
    line-height:60px;
    position:relative;
  }
  .el-header .title{
    font-size:20px;
    font-weight:bold;
    position:absolute;
    left:20px;
  }
  .el-header .el-dropdown{
    position:absolute;
    right:20px;
  }
  .item{
    text-decoration: none;
    color:#606266;
  }
  .item:hover{
    color:#66b1ff;
  }
</style>
