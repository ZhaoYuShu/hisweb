<!--临床类型设置-->
<template>
    <div class="container">
      <clinic-tree></clinic-tree>
      <clinic-form></clinic-form>
    </div>
</template>

<script>
import ClinicTree from "../../components/tree/clinicTree";
import ClinicForm from "../../components/form/clinicForm";
export default {
  name: "clinic",
  components: {ClinicForm, ClinicTree}
}
</script>

<style scoped>
.container{
  width:100%;
  height:100%;
  overflow:hidden;
}
</style>
