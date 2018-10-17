<!--单位分组-->
<template>
    <div class="container">
      <company-group-tree></company-group-tree>
      <company-group-tabs></company-group-tabs>
    </div>
</template>

<script>
import CompanyGroupTree from "../../components/tree/companyGroupTree";
import CompanyGroupTabs from "../../components/tabs/companyGroup/companyGroupTabs";
export default {
  name: "companyGroup",
  components: {CompanyGroupTabs, CompanyGroupTree}
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:hidden;
  }
</style>
