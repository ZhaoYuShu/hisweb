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
  name: "serviceRegistrationTree",
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
  }
}
</script>

<style scoped>
  .el-tree{
    width:15%;
    height:90%;
    padding-top:1%;
    overflow:auto;
    float:left;
    background:#f5f5f5;
  }
</style>
