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
  name: "packageTree",
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
      let that = this;
      console.log(data, data.id);
      if (!data.children) {
        let examItemId = data.id;
        http.packageDetail(examItemId).then(function (response) {
          console.log(response);
          if (response.status === 200 && response.data.result === '00000000') {
            Bus.$emit('packageForm', response.data.data);
            Bus.$emit('packageId', response.data.data.code);
            Bus.$emit('packageItems', response.data.data.examGroupItems);
            Bus.$emit("saveDisabledPackage", true);
            Bus.$emit("deleteDisabledPackage", false);
            Bus.$emit("updateDisabledPackage", false);
          }
        }).catch(function (error) {
          console.log(error);
        })
      }
    },
    getTree () {
      let that = this;
      that.loading = true;
      http.packageTree().then(function (response) {
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
    Bus.$on('addPackageTree', (e) => {
      this.data = e;
    });
    Bus.$on("deletePackageTree", (e) => {
      this.data = e;
    });
    Bus.$on("updatePackageTree", (e) => {
      this.data = e;
    });
    Bus.$on("reloadPackageTree", (e) => {
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
