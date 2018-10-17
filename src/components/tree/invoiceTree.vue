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
  name: "invoiceTree",
  data () {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'text'
      },
      loading:false
    }
  },
  methods: {
    // 点击树节点获取对应信息
    handleNodeClick (data) {
      console.log(data);
      if (data.id > 1) {
        Bus.$emit('currentId', data.id);
        http.invoiceDetail(data.id).then(response => {
          console.log(response);
          if (response.status === 200 && response.data.result === '00000000') {
            Bus.$emit("invoiceDetail", response.data.data);
            Bus.$emit("saveDisabledInvoice", true);
            Bus.$emit("deleteDisabledInvoice", false);
            Bus.$emit("updateDisabledInvoice", false);
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
      http.invoiceTree().then(response => {
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
    Bus.$on("addInvoiceTree", (e) => {
      this.data = e;
    });
    Bus.$on("updateInvoiceTree", (e) => {
      this.data = e;
    });
    Bus.$on("deleteInvoiceTree", (e) => {
      this.data = e;
    });
    Bus.$on("reloadInvoiceTree", (e) => {
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
