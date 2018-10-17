<!--疾病分类设置-->
<template>
    <div class="container">
      <diseases-tree></diseases-tree>
      <diseases-tabs></diseases-tabs>
    </div>
</template>

<script>
import DiseasesTree from '@/components/tree/diseasesTree'
import DiseasesTabs from '@/components/tabs/diseases/diseasesTabs'
export default {
  name: "diseases",
  components: {DiseasesTree, DiseasesTabs}
}
</script>

<style scoped>
.container{
  width:100%;
  height:100%;
  overflow:hidden;
}
</style>
