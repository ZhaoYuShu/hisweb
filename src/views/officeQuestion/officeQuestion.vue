<!--科室问题关联-->
<template>
    <div class="container">
      <office-question-tree></office-question-tree>
      <office-question-transfer></office-question-transfer>
    </div>
</template>

<script>
import OfficeQuestionTree from "../../components/tree/officeQuestionTree";
import OfficeQuestionTransfer from '../../components/transfer/officeQuestionTransfer'
export default {
  name: "officeQuestion",
  components: {OfficeQuestionTree, OfficeQuestionTransfer}
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:hidden;
  }
</style>
