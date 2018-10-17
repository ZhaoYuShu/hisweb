<!--标本类型设置-->
<template>
  <el-tree
    :data="data"
    :props="defaultProps"
    accordion
    :highlight-current="true"
    @node-click="handleNodeClick"
    node-key="id"
    default-expand-all
    v-loading="loading">
  </el-tree>
</template>

<script>
import http from '@/api/index.js'
import Bus from '@/utils/bus.js'
export default {
  name: "tree2",
  data () {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'text'
      },
      loading: false
    }
  },
  methods: {
    handleNodeClick (data) {
      console.log(data, data.id);
      let currentId = data.id;
      http.sampleDetail(currentId).then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          Bus.$emit("sampleDetail", response.data.data);
          Bus.$emit("currentId", currentId);
          Bus.$emit("saveDisabledSample", true);
          Bus.$emit("deleteDisabledSample", false);
          Bus.$emit("updateDisabledSample", false);
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    getTree () {
      let that = this;
      that.loading = true;
      http.sampleTree().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.data = response.data.data;
          Bus.$emit("length", response.data.data.length);
          that.loading = false;
        }
      }).catch(function (error) {
        console.log(error);
      })
    }
  },
  mounted () {
    this.getTree();
    Bus.$on("addSampleTree", (e) => {
      this.data = e;
    });
    Bus.$on("deleteSampleTree", (e) => {
      this.data = e;
    });
    Bus.$on("updateSampleTree", (e) => {
      this.data = e;
    });
    Bus.$on("reloadSampleTree", (e) => {
      this.data = e;
    });
    Bus.$on("loading1", (e) => {
      this.loading = e;
    });
    Bus.$on("loading2", (e) => {
      this.loading = e;
    });
  }
}
</script>

<style scoped>
  .el-tree{
    width:15%;
    height:99%;
    float:left;
    padding-top:1%;
    overflow:auto;
    background:#f5f5f5;
  }
</style>
