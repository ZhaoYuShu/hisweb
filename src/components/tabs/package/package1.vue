<template>
  <div class="box">
    <package-form></package-form>
    <package-card></package-card>
  </div>
</template>

<script>
// import http from '@/api/index.js'
import PackageForm from "../../form/packageForm";
// import PackageTable from "../../table/packageTable";
import PackageCard from '../../card/packageCard'
export default {
  name: "package1",
  components: {PackageCard, PackageForm}
}
</script>

<style scoped>
  .box{
    width:100%;
    height:100%;
    overflow:hidden;
  }
</style>
