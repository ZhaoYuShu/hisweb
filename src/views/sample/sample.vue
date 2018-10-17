
<template>
    <div class="container">
      <sample-tree></sample-tree>
      <sample-form></sample-form>
    </div>
</template>

<script>
import SampleTree from '@/components/tree/sampleTree'
import SampleForm from '@/components/form/sampleForm'
export default {
  name: "sample",
  components: {SampleTree, SampleForm}
}
</script>

<style scoped>
  .container {
    width:100%;
    height:100%;
    overflow:hidden;
  }
</style>
