<template>
    <div class="el-main">
      <router-view name="app_main"/>
    </div>
</template>

<script>
export default {
  name: 'AppMain'
}
</script>

<style scoped>
  .el-main{
    background:#e9eef3;
    color:#333;
    text-align:center;
    width:100%;
    height:100%;
  }
</style>
