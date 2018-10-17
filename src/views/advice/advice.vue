<!--诊断建议设置-->
<template>
  <div class="container">
    <advice-tree></advice-tree>
    <advice-table></advice-table>
  </div>
</template>

<script>
import AdviceTree from '@/components/tree/adviceTree'
import AdviceTable from "../../components/table/adviceTable";
export default {
  name: "advice",
  components: {
    AdviceTable,
    AdviceTree
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
