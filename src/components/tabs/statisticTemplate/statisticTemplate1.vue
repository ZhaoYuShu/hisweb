<template>
   <div class="box">
     <statistic-template-form></statistic-template-form>
     <statistic-template-card></statistic-template-card>
   </div>
</template>

<script>
import StatisticTemplateForm from '@/components/form/statisticTemplateForm'
import StatisticTemplateCard from '@/components/card/statisticTemplateCard'
export default {
  name: "statisticTemplate1",
  components: {StatisticTemplateForm, StatisticTemplateCard}
}
</script>

<style scoped>
.box{
  width:100%;
  height:100%;
  overflow:hidden;
}
</style>
