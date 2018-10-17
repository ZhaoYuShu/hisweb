<!--体检项目设置-->
<template>
    <div class="container">
      <exam-tree></exam-tree>
      <exam-form></exam-form>
    </div>
</template>

<script>
import ExamTree from '@/components/tree/examTree'
import ExamForm from '@/components/form/examForm'
export default {
  name: "examItems",
  components: {ExamTree, ExamForm}
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:hidden;
  }
</style>
