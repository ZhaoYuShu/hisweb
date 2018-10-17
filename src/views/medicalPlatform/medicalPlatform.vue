<!--体检诊台设置-->
<template>
    <div class="container">
      <medical-platform-tree></medical-platform-tree>
      <medical-platform-tabs></medical-platform-tabs>
    </div>
</template>

<script>
import MedicalPlatformTree from "../../components/tree/medicalPlatformTree";
import MedicalPlatformTabs from "../../components/tabs/medicalPlatform/medicalPlatformTabs";
export default {
  name: "medicalPlatform",
  components: {MedicalPlatformTabs, MedicalPlatformTree}
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:hidden;
  }
</style>
