<!--医技设备设置-->
<template>
  <div class="container">
    <equipment-tree></equipment-tree>
    <equipment-form></equipment-form>
  </div>
</template>

<script>
import EquipmentTree from "../../components/tree/equipmentTree";
import EquipmentForm from "../../components/form/equipmentForm";
export default {
  name: "equipment",
  components: {EquipmentForm, EquipmentTree}
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:hidden;
  }
</style>
