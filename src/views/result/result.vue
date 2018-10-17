<!--常见结果设置-->
<template>
    <div class="container">
      <result-tree></result-tree>
      <result-form></result-form>
    </div>
</template>

<script>
import ResultTree from "../../components/tree/resultTree";
import ResultForm from "../../components/form/resultForm";
export default {
  name: "result",
  components: {ResultForm, ResultTree}
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:hidden;
  }
</style>
