<template>
  <el-tree
    :data="data"
    :props="defaultProps"
    accordion
    :highlight-current="true"
    @node-click="handleNodeClick"
    node-key="id"
    default-expand-all>
  </el-tree>
</template>

<script>
import http from '@/api/index.js'
import Bus from '@/utils/bus.js'
export default {
  name: "diseasesTree",
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
    // 点击树节点获取对应信息
    handleNodeClick (data) {
      console.log(data);
    },
    // 获取疾病分类树
    getTree () {
      let that = this;
      http.illTypeTree().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.data = response.data.data;
          Bus.$emit("length", response.data.data.length);
        }
      }).catch(error => {
        console.log(error);
      });
    }
  },
  mounted () {
    this.getTree();
    Bus.$on("addTree", (e) => {
      this.data = e;
    });
    Bus.$on("deleteTree", (e) => {
      this.data = e;
    });
    Bus.$on("updateTree", (e) => {
      this.data = e;
    });
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
