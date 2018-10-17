<!--体检结论设置-->
<template>
  <div class="container">
    <conclusion-tree></conclusion-tree>
    <conclusion-form></conclusion-form>
  </div>
</template>

<script>
import ConclusionTree from "../../components/tree/conclusionTree";
import ConclusionForm from '../../components/form/conclusionForm'
export default {
  name: "conclusion",
  components: {ConclusionTree, ConclusionForm}
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:hidden;
  }
</style>
