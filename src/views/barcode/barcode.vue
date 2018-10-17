<template>
    <div class="container">
      <barcode-tree></barcode-tree>
      <barcode-form></barcode-form>
    </div>
</template>

<script>
import BarcodeTree from "../../components/tree/barcodeTree";
import BarcodeForm from "../../components/form/barcodeForm";
export default {
  name: "barcode",
  components: {BarcodeForm, BarcodeTree}
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:hidden;
  }
</style>
