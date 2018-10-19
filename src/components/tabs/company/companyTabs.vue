<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="单位信息" name="first">
      <company-form></company-form>
    </el-tab-pane>
    <el-tab-pane label="单位体检记录" name="second">
      <company-table></company-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import CompanyForm from "@/components/form/companyForm";
import CompanyTable from "@/components/table/companyTable";
export default {
  name: "companyTabs",
  components: {CompanyTable, CompanyForm},
  data () {
    return {
      activeName: 'first'
    }
  },
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
    height:100%;
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
    overflow-y:auto;
  }
  .el-tab__body{
    height:100%;
    overflow-y:auto;
  }
  #pane-second{
    overflow:hidden;
  }
</style>
<style scoped>
  >>>.el-tabs__content{
    width:100%;
    height:90%;
    overflow:hidden;
    overflow-y:auto;
  }
</style>
