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
  name: "menusTree",
  data () {
    return {
      data: [],
      defaultProps: {
        children: 'childMenu',
        label: 'name'
      },
      loading: false
    }
  },
  methods: {
    handleNodeClick (data) {
      console.log(data);
      Bus.$emit("menuCode", data.menuCode);
      http.menuDetail(data.menuCode).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          Bus.$emit('menuDetail', response.data.data);
          Bus.$emit("saveDisabledMenus", true);
          Bus.$emit("deleteDisabledMenus", false);
          Bus.$emit("updateDisabledMenus", false);
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 获取树结构
    getTree () {
      let that = this;
      that.loading = true;
      http.menuTree().then(response => {
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
    Bus.$on("addMenusTree", (e) => {
      this.data = e;
    });
    Bus.$on('deleteMenusTree', (e) => {
      this.data = e;
    });
    Bus.$on('updateMenusTree', (e) => {
      this.data = e;
    });
    Bus.$on("reloadMenusTree", (e) => {
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
    padding-top: 1%;
    float:left;
    overflow:auto;
    background:#f5f5f5;
  }
</style>
