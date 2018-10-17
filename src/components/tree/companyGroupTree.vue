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
  name: "companyGroupTree",
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
      // 点击单位分组获取详细信息
      if (data.id > 1000) {
        Bus.$emit('currentId', data.id);
        http.companyGroupDetail(data.id).then(response => {
          console.log(response);
          if (response.status === 200 && response.data.result === '00000000') {
            Bus.$emit('details', response.data.data);
            Bus.$emit('disabled', true);
            Bus.$emit('packageItems2', response.data.data.examGroupItems);
            Bus.$emit("saveDisabledCompanyGroup", true);
            Bus.$emit("deleteDisabledCompanyGroup", false);
            Bus.$emit("updateDisabledCompanyGroup", false);
          }
        }).catch(error => {
          console.log(error);
        });
      }
      if (data.pid) {
        http.companyDetail2(data.pid).then(response => {
          console.log(response);
          if (response.status === 200 && response.data.result === '00000000') {
            Bus.$emit('companyCode', response.data.data.company.code);
            Bus.$emit('examTimes', response.data.data.company.examTimes);
            Bus.$emit('disabled', true);
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
      http.companyGroupTree().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.data = response.data.data;
          that.loading = false;
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  },
  mounted () {
    this.getTree();
    Bus.$on('companyGroupTree', (e) => {
      this.data = e;
    });
    Bus.$on('deleteCompanyGroup', (e) => {
      this.data = e;
    });
    Bus.$on('updateCompanyGroup', (e) => {
      this.data = e;
    });
    Bus.$on("reloadTree", (e) => {
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
