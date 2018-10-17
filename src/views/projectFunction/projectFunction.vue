<!--组合项目函数设置-->
<template>
  <div class="container">
    <project-function-tree></project-function-tree>
    <project-function-form></project-function-form>
  </div>
</template>

<script>
import ProjectFunctionTree from '@/components/tree/projectFunctionTree'
import ProjectFunctionForm from "../../components/form/projectFunctionForm";
export default {
  name: "projectFunction",
  components: {ProjectFunctionForm, ProjectFunctionTree}
}
</script>

<style scoped>
.container{
  width:100%;
  height:100%;
  overflow:hidden;
}
</style>
