<template>
  <div class="container">
    <company-tree></company-tree>
    <company-tabs></company-tabs>
  </div>
</template>

<script>
import CompanyTree from "../../components/tree/companyTree";
import CompanyTabs from "../../components/tabs/company/companyTabs";
export default {
  name: "company",
  components: {CompanyTabs, CompanyTree}
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:hidden;
  }
</style>
