<!--相关收费-->
<template>
    <div class="container">
      <relevant-charges-tree></relevant-charges-tree>
      <relevant-charges-form></relevant-charges-form>
    </div>
</template>

<script>
import RelevantChargesTree from "../../components/tree/relevantChargesTree";
import RelevantChargesForm from "../../components/form/relevantChargesForm";
export default {
  name: "relevantCharges",
  components: {RelevantChargesForm, RelevantChargesTree}
}
</script>

<style scoped>
.container{
  width:100%;
  height:100%;
  overflow:hidden;
}
</style>
