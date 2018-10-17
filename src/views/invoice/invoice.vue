<!--发票项目-->
<template>
    <div class="container">
      <invoice-tree></invoice-tree>
      <invoice-form></invoice-form>
    </div>
</template>

<script>
import InvoiceTree from "../../components/tree/invoiceTree";
import InvoiceForm from "../../components/form/invoiceForm";
export default {
  name: "invoice",
  components: {InvoiceForm, InvoiceTree}
}
</script>

<style scoped>
.container{
  width:100%;
  height:100%;
  overflow:hidden;
}
</style>
