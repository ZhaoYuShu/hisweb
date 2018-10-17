<template>
  <el-tree
    :data="data"
    :props="defaultProps"
    accordion
    :highlight-current="true"
    node-key="id"
    @node-click="handleNodeClick"
    default-expand-all
    v-loading="loading">
  </el-tree>
</template>

<script>
import http from '@/api/index.js'
import Bus from '@/utils/bus.js'
export default {
  name: "chargeTypeTree",
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
      console.log(data);
      if (data.pid !== 0) {
        let currentId = data.id;
        Bus.$emit("currentId", currentId);
        http.chargeTypeDetail(currentId).then(response => {
          console.log(response);
          if (response.status === 200 && response.data.result === '00000000') {
            Bus.$emit("chargeTypeDetail", response.data.data);
            Bus.$emit("saveDisabledChargeType", true);
            Bus.$emit("deleteDisabledChargeType", false);
            Bus.$emit("updateDisabledChargeType", false);
          }
        }).catch(error => {
          console.log(error);
        });
      }
    },
    // 获取树结构
    getTree () {
      let that = this;
      that.loading = true;
      http.chargeTypeTree().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.data = response.data.data;
          Bus.$emit("length", response.data.data.length);
          that.loading = false;
        }
      }).catch(error => {
        console.log(error);
      });
    }
  },
  mounted () {
    this.getTree();
    Bus.$on("addChargeTypeTree", (e) => {
      this.data = e;
    });
    Bus.$on("deleteChargeTypeTree", (e) => {
      this.data = e;
    });
    Bus.$on("updateChargeTypeTree", (e) => {
      this.data = e;
    });
    Bus.$on("reloadChargeTypeTree", (e) => {
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
    padding-top:1%;
    float:left;
    overflow:auto;
    background:#f5f5f5;
  }
</style>
