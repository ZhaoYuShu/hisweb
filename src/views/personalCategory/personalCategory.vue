<!--人员类别-->
<template>
    <div class="container">
      <personal-category-tree></personal-category-tree>
      <personal-category-form></personal-category-form>
    </div>
</template>

<script>
import PersonalCategoryTree from "../../components/tree/personalCategoryTree";
import PersonalCategoryForm from '../../components/form/personalCategoryForm'
export default {
  name: "personalCategory",
  components: {PersonalCategoryTree, PersonalCategoryForm}
}
</script>

<style scoped>
.container{
  width:100%;
  height:100%;
  overflow:hidden;
}
</style>
