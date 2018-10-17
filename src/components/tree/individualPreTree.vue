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
  name: "individualPreTree",
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
      if (data.id > 1000) {
        Bus.$emit("currentId", data.id);
        http.getAllStaff(data.id).then(response => {
          console.log(response);
          if (response.status === 200 && response.data.result === '00000000') {
            Bus.$emit('tableData', response.data.data);
            Bus.$emit("saveDisabledIndividual", false);
            Bus.$emit("deleteDisabledIndividual", true);
            Bus.$emit("updateDisabledIndividual", true);
          }
        }).catch(error => {
          console.log(error);
        });
      }
    },
    // 获取单位分组树
    getTree () {
      let that = this;
      that.loading = true;
      http.companyGroupTree().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.data = response.data.data;
          that.loading = false;
        }
      }).catch(error => {
        console.log(error);
      });
    }
  },
  mounted () {
    this.getTree();
    Bus.$on("reloadIndividualTree", (e) => {
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
    width: 15%;
    height: 99%;
    padding-top: 1%;
    overflow: auto;
    float:left;
    background:#f5f5f5;
  }
</style>
