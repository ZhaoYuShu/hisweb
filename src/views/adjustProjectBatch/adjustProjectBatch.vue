<template>
    <div class="container">
      <adjust-project-batch-tree></adjust-project-batch-tree>
      <adjust-project-batch-form></adjust-project-batch-form>
    </div>
</template>

<script>
import AdjustProjectBatchTree from "../../components/tree/adjustProjectBatchTree";
import AdjustProjectBatchForm from "../../components/form/adjustProjectBatchForm";
export default {
  name: "adjustProjectBatch",
  components: {AdjustProjectBatchForm, AdjustProjectBatchTree}
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:hidden;
  }
</style>
