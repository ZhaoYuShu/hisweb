<template>
  <el-tree
    :data="data"
    :props="defaultProps"
    accordio
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
  name: "groupTree",
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
      Bus.$emit("multipleSelection", []);
      console.log(data, data.id);
      if (!data.children) {
        let examItemId = data.id;
        Bus.$emit("currentId", examItemId);
        http.groupDetail(examItemId).then(function (response) {
          console.log(response);
          if (response.status === 200 && response.data.result === '00000000') {
            Bus.$emit("groupDetail", response.data.data);
            Bus.$emit("examItemList", response.data.data.examItemList);
            Bus.$emit("saveDisabledGroup", true);
            Bus.$emit("deleteDisabledGroup", false);
            Bus.$emit("updateDisabledGroup", false);
          } else if (response.data.msg === '体检组合项目不存在') {
            console.log('体检组合项目不存在');
            Bus.$emit("tableNull", []);
          }
        }).catch(function (error) {
          console.log(error);
        })
      }
    },
    getTree () {
      let that = this;
      that.loading = true;
      http.groupTree().then(function (response) {
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
    Bus.$on("addGroupTree", (e) => {
      this.data = e;
    });
    Bus.$on("deleteGroupTree", (e) => {
      this.data = e;
    });
    Bus.$on("updateGroupTree", (e) => {
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
