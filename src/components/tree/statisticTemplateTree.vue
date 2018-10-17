<template>
    <el-tree
      :data="data"
      :props="defaultProps"
      accordion
      :highlight-current="true"
      node-key="id"
      @node-click="handleNodeClick"
      default-expand-all>
    </el-tree>
</template>

<script>
export default {
  name: "statisticTemplateTree",
  data () {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'text'
      }
    }
  }
}
</script>

<style scoped>
  .el-tree{
    float:left;
    width:15%;
    height:90%;
    padding-top:1%;
    overflow:auto;
    background:#f5f5f5;
  }
</style>
