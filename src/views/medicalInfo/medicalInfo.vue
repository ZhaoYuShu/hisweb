<!--体检人员信息-->
<template>
  <div class="container">
    <medical-info-tree></medical-info-tree>
    <medical-info-form></medical-info-form>
  </div>
</template>

<script>
import MedicalInfoTree from "../../components/tree/medicalInfoTree";
import MedicalInfoForm from "../../components/form/medicalInfoForm";
export default {
  name: "medicalInfo",
  components: {MedicalInfoForm, MedicalInfoTree}
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:hidden;
  }
</style>
