<template>
    <div class="container">
      <questions-tree></questions-tree>
      <questions-form></questions-form>
    </div>
</template>

<script>
import QuestionsTree from "../../components/tree/questionsTree";
import QuestionsForm from '../../components/form/questionsForm'
export default {
  name: "questions",
  components: {QuestionsTree, QuestionsForm}
}
</script>

<style scoped>
.container{
  width:100%;
  height:100%;
  overflow:hidden;
}
</style>
