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
  name: "adjustProjectBatchTree",
  data () {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'text'
      }
    }
  },
  methods: {
    handleNodeClick (data) {
      console.log(data);
    }
  },
  mounted () {}
}
</script>

<style scoped>
  .el-tree{
    width:15%;
    height:90%;
    padding-top:1%;
    float:left;
    overflow:auto;
    background:#f5f5f5;
  }
</style>
