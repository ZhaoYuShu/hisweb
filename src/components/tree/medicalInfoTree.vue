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
  name: "medicalInfoTree",
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
        let obj = {};
        obj.companyGroupCode = data.id;
        obj.companyRecordId = data.pid;
        http.getOfficiallyPeople(obj).then(response => {
          console.log(response);
          if (response.status === 200 && response.data.result === '00000000') {
            Bus.$emit('tableData', response.data.data);
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
