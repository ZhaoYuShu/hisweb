<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="分类主档信息" name="first">
      <application1></application1>
    </el-tab-pane>
    <el-tab-pane label="分类组合项目" name="second">
      <application2></application2>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Application1 from "./application1";
import Application2 from './application2';
export default {
  name: "applicationTabs",
  components: {Application1, Application2},
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    }
  },
  data () {
    return {
      activeName: 'first'
    }
  }
}
</script>

<style scoped>
  .el-tabs{
    float:right;
    width:80%;
    height:90%;
    background:#fff;
    margin-left:3%;
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
    overflow:auto;
  }
  #pane-second{
    overflow:hidden;
  }
</style>
<style>
  .el-tabs__content{
    width:100%;
    height:90%;
    overflow:auto;
  }
</style>
