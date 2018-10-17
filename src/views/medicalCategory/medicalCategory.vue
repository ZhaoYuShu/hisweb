<!--体检类别-->
<template>
    <div class="container">
      <medical-category-tree></medical-category-tree>
      <medical-category-form></medical-category-form>
    </div>
</template>

<script>
import MedicalCategoryTree from "../../components/tree/medicalCategoryTree";
import MedicalCategoryForm from '../../components/form/medicalCategoryForm'
export default {
  name: "medicalCategory",
  components: {MedicalCategoryTree, MedicalCategoryForm}
}
</script>

<style scoped>
.container{
  width:100%;
  height:100%;
  overflow:hidden;
}
</style>
