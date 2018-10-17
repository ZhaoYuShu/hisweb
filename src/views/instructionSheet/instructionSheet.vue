<!--批量打印指引单-->
<template>
  <div class="container">
    <instruction-sheet-tree></instruction-sheet-tree>
    <instruction-sheet-form></instruction-sheet-form>
  </div>
</template>

<script>
import InstructionSheetTree from "../../components/tree/instructionSheetTree";
import InstructionSheetForm from "../../components/form/instructionSheetForm";
export default {
  name: "instructionSheet",
  components: {InstructionSheetForm, InstructionSheetTree}
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:hidden;
  }
</style>
