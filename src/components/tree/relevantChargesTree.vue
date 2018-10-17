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
  name: "relevantChargesTree",
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
    // 点击树节点获取相应的信息
    handleNodeClick (data) {
      console.log(data);
      if (data.id > 1) {
        Bus.$emit("currentId", data.id);
        http.otherChargeDetail(data.id).then(response => {
          console.log(response);
          if (response.status === 200 && response.data.result === '00000000') {
            Bus.$emit("otherChargeDetail", response.data.data);
            Bus.$emit("saveDisabledRelevant", true);
            Bus.$emit("deleteDisabledRelevant", false);
            Bus.$emit("updateDisabledRelevant", false);
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
      http.otherChargeTree().then(response => {
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
    Bus.$on("addRelevantTree", (e) => {
      this.data = e;
    });
    Bus.$on("deleteRelevantTree", (e) => {
      this.data = e;
    });
    Bus.$on("updateRelevantTree", (e) => {
      this.data = e;
    });
    Bus.$on("reloadRelevantTree", (e) => {
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
