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
  name: "medicalCategoryTree",
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
    // 点击树节点获取详情
    handleNodeClick (data) {
      console.log(data);
      Bus.$emit("currentId", data.id);
      http.examTypeDetail(data.id).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          Bus.$emit("examTypeDetail", response.data.data);
          Bus.$emit("saveDisabledMedicalCategory", true);
          Bus.$emit("deleteDisabledMedicalCategory", false);
          Bus.$emit("updateDisabledMedicalCategory", false);
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 获取体检类别树结构
    getTree () {
      let that = this;
      that.loading = true;
      http.examTypeTree().then(response => {
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
    Bus.$on("addExamTypeTree", (e) => {
      this.data = e;
    });
    Bus.$on("updateExamTypeTree", (e) => {
      this.data = e;
    });
    Bus.$on("deleteExamTypeTree", (e) => {
      this.data = e;
    });
    Bus.$on("reloadExamTypeTree", (e) => {
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
  overflow:auto;
  float:left;
  background:#f5f5f5;
}
</style>
