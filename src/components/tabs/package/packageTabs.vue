<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="套餐主档信息" name="first">
      <package1></package1>
    </el-tab-pane>
    <el-tab-pane label="套餐体检项目" name="second">
      <package2></package2>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Package1 from './package1'
import Package2 from './package2'
export default {
  name: "packageTabs",
  data () {
    return {
      activeName: 'first'
    }
  },
  components: {Package1, Package2},
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style scoped>
  .el-tabs{
    float:right;
    width:81%;
    height:90%;
    background:#fff;
    margin-left:2%;
    padding-right:1%;
    padding-left:1%;
    /*padding-top:20px;*/
    overflow:hidden;
  }
  .el-tab-pane{
    width:100%;
    height:100%;
  }
  .el-tab__body{
    height:100%;
    overflow:hidden;
  }
  #pane-second{
    overflow:hidden;
  }
</style>
<style scoped>
  >>>.el-tabs__content{
    width:100%;
    height:90%;
    overflow:auto;
  }
</style>
