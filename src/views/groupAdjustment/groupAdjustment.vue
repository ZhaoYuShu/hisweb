<template>
    <div class="container">
      <group-adjustment-tree></group-adjustment-tree>
      <group-adjustment-form></group-adjustment-form>
    </div>
</template>

<script>
import GroupAdjustmentTree from "../../components/tree/groupAdjustmentTree";
import GroupAdjustmentForm from "../../components/form/groupAdjustmentForm";
export default {
  name: "groupAdjustment",
  components: {GroupAdjustmentForm, GroupAdjustmentTree}
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:hidden;
  }
</style>
