<!--正式登记-->
<template>
    <div class="container">
      <!--<officially-tree></officially-tree>-->
      <officially-form></officially-form>
    </div>
</template>

<script>
import OfficiallyTree from "../../components/tree/officiallyTree";
import OfficiallyForm from "../../components/form/officiallyForm";
export default {
  name: "officiallyRegistered",
  components: {OfficiallyForm, OfficiallyTree}
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:hidden;
  }
</style>
