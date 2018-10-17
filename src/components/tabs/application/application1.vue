<template>
  <div class="box">
    <application-form></application-form>
    <application-card></application-card>
  </div>
</template>

<script>
import ApplicationForm from '@/components/form/applicationForm'
import ApplicationCard from '@/components/card/applicationCard'
export default {
  name: "application1",
  components: {ApplicationForm, ApplicationCard}
}
</script>

<style scoped>
  .box{
    width:100%;
    height:100%;
    overflow:hidden;
  }
</style>
