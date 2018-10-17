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
  name: "resultTree",
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
      if (!data.children) {
        Bus.$emit("currentId", data.id);
        http.commonResultsDetail(data.id).then(response => {
          console.log(response);
          if (response.status === 200 && response.data.result === '00000000') {
            let ruleForm = {};
            if (response.data.data.commonResultParamDtoList) {
              Bus.$emit("tableData", response.data.data.commonResultParamDtoList);
              ruleForm.inNode = response.data.data.inNode;
              ruleForm.inNodeName = response.data.data.inNodeName;
              ruleForm.sex = response.data.data.sex;
              ruleForm.resultType = response.data.data.resultType;
              Bus.$emit('ruleForm', ruleForm);
            } else {
              Bus.$emit('tableData', []);
              ruleForm.inNode = '';
              ruleForm.inNodeName = '';
              ruleForm.sex = '';
              ruleForm.resultType = '';
              Bus.$emit('ruleForm', ruleForm);
            }
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
      http.examItemTree().then(response => {
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
    Bus.$on("reloadResultTree", (e) => {
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
    width:17%;
    height:99%;
    float:left;
    padding-top:1%;
    overflow:auto;
    background:#f5f5f5;
  }
</style>
