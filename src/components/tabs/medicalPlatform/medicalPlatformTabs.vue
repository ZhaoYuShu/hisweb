<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="体检诊台主档信息" name="first">
      <medical-platform-form></medical-platform-form>
    </el-tab-pane>
    <el-tab-pane label="体检诊台明细信息" name="second">
      <medical-platform1></medical-platform1>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import MedicalPlatformForm from "../../form/medicalPlatformForm";
import MedicalPlatform1 from "./medicalPlatform1";
export default {
  name: "medicalPlatformTabs",
  components: {MedicalPlatform1, MedicalPlatformForm},
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
    overflow:auto;
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
