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
  name: "personalCategoryTree",
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
      Bus.$emit("currentId", data.id);
      http.customerTypeDetail(data.id).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          Bus.$emit("customerTypeDetail", response.data.data);
          Bus.$emit("saveDisabledPersonalCategory", true);
          Bus.$emit("deleteDisabledPersonalCategory", false);
          Bus.$emit("updateDisabledPersonalCategory", false);
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 获取人员类别树
    getTree () {
      let that = this;
      that.loading = true;
      http.customerTypeTree().then(response => {
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
    Bus.$on('addCustomerTypeTree', (e) => {
      this.data = e;
    });
    Bus.$on("deleteCustomerTypeTree", (e) => {
      this.data = e;
    });
    Bus.$on("updateCustomerTypeTree", (e) => {
      this.data = e;
    });
    Bus.$on("reloadCustomerTypeTree", (e) => {
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
    overflow:auto;
    padding-top:1%;
    background:#f5f5f5;
  }
</style>
