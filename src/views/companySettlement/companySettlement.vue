<!--单位体检结算方式设置-->
<template>
    <div class="container">
      <company-settlement-tree></company-settlement-tree>
      <company-settlement-table></company-settlement-table>
    </div>
</template>

<script>
import CompanySettlementTree from "../../components/tree/companySettlementTree";
import CompanySettlementTable from "../../components/table/companySettlementTable";
export default {
  name: "companySettlement",
  components: {CompanySettlementTable, CompanySettlementTree}
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:hidden;
  }
</style>
