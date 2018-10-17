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
  name: "remindDiagnosisTree",
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
  float:left;
  width:15%;
  height:90%;
  overflow:auto;
  padding-top:1%;
  background:#f5f5f5;
}
</style>
