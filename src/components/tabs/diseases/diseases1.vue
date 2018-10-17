<template>
  <div class="box">
    <diseases-form></diseases-form>
    <diseases-card></diseases-card>
  </div>
</template>

<script>
import DiseasesForm from "@/components/form/diseasesForm";
import DiseasesCard from '@/components/card/diseasesCard'
export default {
  name: "diseases1",
  components: {DiseasesForm, DiseasesCard}
}
</script>

<style scoped>
  .box{
    width:100%;
    height:100%;
    overflow:hidden;
  }
</style>
