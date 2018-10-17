<!--体检区域设置-->
<template>
    <div class="container">
      <medical-area-tree></medical-area-tree>
      <medical-area-tabs></medical-area-tabs>
    </div>
</template>

<script>
import MedicalAreaTree from "../../components/tree/medicalAreaTree";
import MedicalAreaTabs from "../../components/tabs/medicalArea/medicalAreaTabs";
export default {
  name: "medicalArea",
  components: {MedicalAreaTabs, MedicalAreaTree}
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:hidden;
  }
</style>
