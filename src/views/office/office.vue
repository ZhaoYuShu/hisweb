<!--体检科室维护-->
<template>
    <div class="container">
      <office-tree></office-tree>
      <office-form></office-form>
    </div>
</template>

<script>
import OfficeTree from '@/components/tree/officeTree'
import OfficeForm from '@/components/form/officeForm'
export default {
  name: "office",
  components: {
    OfficeTree,
    OfficeForm
  }
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:hidden;
  }
</style>
