<!--汇总科室-->
<template>
    <div class="container">
      <summary-office-tree></summary-office-tree>
      <summary-office-form></summary-office-form>
    </div>
</template>

<script>
import SummaryOfficeTree from "../../components/tree/summaryOfficeTree";
import SummaryOfficeForm from "../../components/form/summaryOfficeForm";
export default {
  name: "summaryOffice",
  components: {SummaryOfficeForm, SummaryOfficeTree}
}
</script>

<style scoped>
.container{
  width:100%;
  height:100%;
  overflow:hidden;
}
</style>
