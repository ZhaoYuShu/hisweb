<template>
    <el-tree
      :data="data"
      :props="defaultProps"
      accordion
      :highlight-current="true"
      @node-click="handleNodeClick"
      node-key="id"
      default-expand-all></el-tree>
</template>

<script>
import http from '@/api/index.js'
export default {
  name: "conclusionTree",
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
    },
    // 获取树结构
    getTree () {
      let that = this;
      http.examResultTypeTree().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.data = response.data.data;
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  },
  mounted () {
    this.getTree();
  }
}
</script>

<style scoped>
  .el-tree{
    width:15%;
    height:90%;
    /*background:#fff;*/
    float:left;
    padding-top:1%;
    background:#f5f5f5;
  }
</style>
