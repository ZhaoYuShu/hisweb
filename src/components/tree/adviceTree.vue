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
  name: "adviceTree",
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
      // let that = this;
      console.log(data, data.id);
      let examItemId = data.id;
      Bus.$emit("saveDisabled", true);
      Bus.$emit("saveDisabled2", true);
      http.diagnoseInfoDetail(examItemId).then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          Bus.$emit('diagnoseInfo', response.data.data);
          Bus.$emit('officeId', examItemId);
          if (response.data.data.length === 0) {
            Bus.$emit('diagnoseContent', []);
          }
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    getTree () {
      let that = this;
      that.loading = true;
      http.officeTree().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.data = response.data.data;
          that.loading = false;
        }
      }).catch(function (error) {
        console.log(error);
      })
    }
  },
  mounted () {
    this.getTree();
  }
}
</script>

<style scoped>
  .el-tree{
    width:15%;
    float:left;
    padding-top:1%;
    height:99%;
    background:#f5f5f5;
    overflow:auto;
  }
</style>
