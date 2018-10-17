<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="模板主档信息" name="first">
      <statistic-template1></statistic-template1>
    </el-tab-pane>
    <el-tab-pane label="模板疾病项目" name="second">
      <statistic-template2></statistic-template2>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import StatisticTemplate1 from '@/components/tabs/statisticTemplate/statisticTemplate1'
import StatisticTemplate2 from '@/components/tabs/statisticTemplate/statisticTemplate2'
export default {
  name: "statisticTemplateTabs",
  data () {
    return {
      activeName: 'first'
    }
  },
  components: {StatisticTemplate1, StatisticTemplate2},
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
    width:80%;
    height:90%;
    background:#fff;
    margin-left:3%;
    padding-right:1%;
    padding-left:1%;
    /*padding-top:20px;*/
    overflow:auto;
  }
  .el-tab-pane{
    width:100%;
    height:100%;
  }
</style>
