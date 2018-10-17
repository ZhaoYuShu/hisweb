<template>
  <div class="container">
    <adjust-project-tree></adjust-project-tree>
    <adjust-project-form></adjust-project-form>
  </div>
</template>

<script>
import AdjustProjectTree from "../../components/tree/adjustProjectTree";
import AdjustProjectForm from "../../components/form/adjustProjectForm";
export default {
  name: "adjustProject",
  components: {AdjustProjectForm, AdjustProjectTree}
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:hidden;
  }
</style>
