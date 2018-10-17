<!--折扣设置-->
<template>
    <div class="container">
      <discount-tree></discount-tree>
      <discount-form></discount-form>
    </div>
</template>

<script>
import DiscountTree from "../../components/tree/discountTree";
import DiscountForm from "../../components/form/discountForm";
export default {
  name: "discount",
  components: {DiscountForm, DiscountTree}
}
</script>

<style scoped>
.container{
  width:100%;
  height:100%;
  overflow:hidden;
}
</style>
