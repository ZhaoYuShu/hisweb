<template>
    <div class="container">
      <group-tree></group-tree>
      <group-form></group-form>
      <group-table></group-table>
    </div>
</template>

<script>
import GroupTree from '@/components/tree/groupTree'
import GroupForm from '@/components/form/groupForm'
import GroupTable from '@/components/table/groupTable'
export default {
  name: "programGroup",
  components: {
    GroupTree, GroupForm, GroupTable
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
