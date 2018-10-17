<template>
  <el-tree
    :data="data"
    :props="defaultProps"
    accordion
    :hightlight-current="true"
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
  name: "companyTree",
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
      // 获取当前点击的树节点ID
      Bus.$emit('currentId', data.id);
      // 点击树节点获取对应的详情信息
      http.companyDetail(data.id).then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          Bus.$emit('companyDetail', response.data.data.company);
          let companyCode = response.data.data.company.code;
          let companyName = response.data.data.company.name;
          Bus.$emit("companyCode", companyCode);
          Bus.$emit("companyName", companyName);
          Bus.$emit("saveDisabledCompany", true);
          Bus.$emit("deleteDisabledCompany", false);
          Bus.$emit("updateDisabledCompany", false);
          console.log(companyCode);
          // 根据单位code获取单位的体检次数
          http.companyExamRecordTimes(companyCode).then(response => {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              Bus.$emit("times", response.data.data.times);
            }
          }).catch(error => {
            console.log(error);
          });
          // 根据体检单位Code获取体检预约历史
          http.companyExamRecordList(companyCode).then(response => {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              Bus.$emit('companyExamRecordList', response.data.data);
            }
          }).catch(error => {
            console.log(error);
          });
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    // 获取体检单位树结构
    getCompanyTree () {
      let that = this;
      that.loading = true;
      http.companyTree().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.data = response.data.data;
          Bus.$emit('treeLength', response.data.data.length);
          that.loading = false;
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  },
  mounted () {
    this.getCompanyTree();
    Bus.$on('addCompanyTree', (e) => {
      this.data = e;
    });
    Bus.$on('deleteCompanyTree', (e) => {
      this.data = e;
    });
    Bus.$on('updateCompanyTree', (e) => {
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
  height: 99%;
  padding-top:1%;
  float:left;
  overflow:auto;
  background:#f5f5f5;
}
</style>
