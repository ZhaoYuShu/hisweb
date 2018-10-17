<template>
    <div class="container">
      <menus-tree></menus-tree>
      <menus-form></menus-form>
    </div>
</template>

<script>
import MenusTree from "../../components/tree/menusTree";
import MenusForm from "../../components/form/menusForm";
export default {
  name: "menus",
  components: {MenusForm, MenusTree}
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:hidden;
  }
</style>
