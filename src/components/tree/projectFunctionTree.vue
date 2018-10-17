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
  name: "projectFunction",
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
    width:15%;
    height:99%;
    padding-top:1%;
    float:left;
    overflow:auto;
    background:#f5f5f5;
  }
</style>
