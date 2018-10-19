<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="单位分组信息" name="first">
      <company-group-form></company-group-form>
    </el-tab-pane>
    <el-tab-pane label="选择体检项目" name="second">
      <company-group2></company-group2>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import CompanyGroupForm from "../../form/companyGroupForm";
import CompanyGroup2 from "./companyGroup2";
export default {
  name: "companyGroupTabs",
  components: {CompanyGroup2, CompanyGroupForm},
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
    width:80%;
    height:100%;
    background:#fff;
    margin-left:3%;
    padding-right:1%;
    padding-left:1%;
    overflow:hidden;
  }
  >>>.el-tab-pane{
    width:100%;
    height:100%;
    overflow:auto;
    overflow-x:hidden;
  }
  >>>.el-tabs__content{
    height:100%;
  }
</style>
