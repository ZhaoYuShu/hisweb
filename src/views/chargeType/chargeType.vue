<!--收费类别-->
<template>
    <div class="container">
      <charge-type-tree></charge-type-tree>
      <charge-type-form></charge-type-form>
    </div>
</template>

<script>
import ChargeTypeTree from "../../components/tree/chargeTypeTree";
import ChargeTypeForm from "../../components/form/chargeTypeForm";
export default {
  name: "chargeType",
  components: {ChargeTypeForm, ChargeTypeTree}
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:hidden;
  }
</style>
