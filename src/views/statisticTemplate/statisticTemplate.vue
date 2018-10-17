<!--疾病模板-->
<template>
    <div class="container">
      <statistic-template-tree></statistic-template-tree>
      <statistic-template-tabs></statistic-template-tabs>
    </div>
</template>

<script>
import StatisticTemplateTree from "../../components/tree/statisticTemplateTree";
import StatisticTemplateTabs from "../../components/tabs/statisticTemplate/statisticTemplateTabs";
export default {
  name: "statisticTemplate",
  components: {StatisticTemplateTabs, StatisticTemplateTree}
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:hidden;
  }
</style>
