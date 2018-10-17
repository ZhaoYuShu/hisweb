<!--汇总项目-->
<template>
    <div class="container">
      <summary-project-tree></summary-project-tree>
      <summary-project-form></summary-project-form>
    </div>
</template>

<script>
import SummaryProjectTree from "../../components/tree/summaryProjectTree";
import SummaryProjectForm from "../../components/form/summaryProjectForm";
export default {
  name: "summaryProject",
  components: {SummaryProjectForm, SummaryProjectTree}
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:hidden;
  }
</style>
