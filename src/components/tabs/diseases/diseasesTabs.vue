<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="分类主档信息" name="first">
      <diseases1></diseases1>
    </el-tab-pane>
    <el-tab-pane label="分类疾病项目" name="second">
      <diseases2></diseases2>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Diseases1 from '@/components/tabs/diseases/diseases1'
import Diseases2 from '@/components/tabs/diseases/diseases2'
export default {
  name: "diseasesTabs",
  data () {
    return {
      activeName: 'first'
    }
  },
  components: {Diseases1, Diseases2},
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
    overflow:auto;
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
