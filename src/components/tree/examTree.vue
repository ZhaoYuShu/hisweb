<!--体检项目设置-->
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
  name: "tree3",
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
    // 点击树节点获取详细信息
    handleNodeClick (data) {
      console.log(data, data.id);
      if (!data.children) {
        let officeId = data.id;
        Bus.$emit("currentId", officeId);
        http.examItemDetail(officeId).then(function (response) {
          console.log(response);
          if (response.status === 200 && response.data.result === '00000000') {
            Bus.$emit("examDetail", response.data.data);
            Bus.$emit("saveDisabledExam", true);
            Bus.$emit("deleteDisabledExam", false);
            Bus.$emit("updateDisabledExam", false);
          }
        }).catch(function (error) {
          console.log(error);
        })
      }
    },
    // 获取树结构
    getTree () {
      let that = this;
      that.loading = true;
      http.examItemTree().then(function (response) {
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
    Bus.$on("addExamTree", (e) => {
      this.data = e;
    });
    Bus.$on("deleteExamTree", (e) => {
      this.data = e;
    });
    Bus.$on("updateExamTree", (e) => {
      this.data = e;
    });
    Bus.$on("reloadExamTree", (e) => {
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
    width:20%;
    height:99%;
    float:left;
    padding-top:1%;
    overflow:auto;
    background:#f5f5f5;
  }
</style>
