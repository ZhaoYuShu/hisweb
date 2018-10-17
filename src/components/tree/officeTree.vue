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
  name: "officeTree",
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
      if (data.pid !== 0) {
        let officeId = data.id;
        Bus.$emit("currentId", officeId);
        http.officeDetail(officeId).then(function (response) {
          console.log(response);
          if (response.status === 200 && response.data.result === '00000000') {
            Bus.$emit("officeDetail", response.data.data.office);
            Bus.$emit("saveDisabledOffice", true);
            Bus.$emit("deleteDisabledOffice", false);
            Bus.$emit("updateDisabledOffice", false);
          }
        }).catch(function (error) {
          console.log(error);
        })
      }
    },
    getTree () {
      let that = this;
      that.loading = true;
      http.officeTree().then(function (response) {
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
    Bus.$on("addOfficeTree", (e) => {
      this.data = e;
    });
    Bus.$on("deleteOfficeTree", (e) => {
      this.data = e;
    });
    Bus.$on("updateOfficeTree", (e) => {
      this.data = e;
    });
    Bus.$on("reloadOfficeTree", (e) => {
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
