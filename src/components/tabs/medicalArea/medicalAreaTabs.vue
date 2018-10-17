<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="体检区主档信息" name="first">
      <medical-area-form></medical-area-form>
    </el-tab-pane>
    <el-tab-pane label="体检区诊台信息" name="second">
      <medical-area1></medical-area1>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import MedicalAreaForm from "../../form/medicalAreaForm";
import MedicalArea1 from "./medicalArea1";
export default {
  name: "medicalAreaTabs",
  components: {MedicalArea1, MedicalAreaForm},
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
<style>
  .el-tabs__content{
    width:100%;
    height:90%;
    overflow:auto;
  }
</style>
