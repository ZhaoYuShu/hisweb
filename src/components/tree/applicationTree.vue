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
  name: "applicationTree",
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
      let that = this;
      console.log(data, data.id);
      if (!data.children) {
        let examItemId = data.id;
        http.applicationDetail(examItemId).then(function (response) {
          console.log(response);
          if (response.status === 200 && response.data.result === '00000000') {
            Bus.$emit('applicationForm', response.data.data.applyPageTypeResultDto);
            Bus.$emit('applicationId', response.data.data.applyPageTypeResultDto.id);
            Bus.$emit('packageItems2', response.data.data.applyPageTypeResultDto.examGroupItemList);
            Bus.$emit("saveDisabledApplication", true);
            Bus.$emit("deleteDisabledApplication", false);
            Bus.$emit("updateDisabledApplication", false);
          } else if (response.data.msg === '体检组合项目不存在') {
            console.log('体检组合项目不存在');
            that.$parent.$children[2].tableData = [];
            console.log(that.$parent.$children[2].tableData);
          }
        }).catch(function (error) {
          console.log(error);
        })
      }
    },
    getTree () {
      let that = this;
      that.loading = true;
      http.applicationTree().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.data = response.data.data;
          Bus.$emit("length", response.data.data.length);
          that.loading = false;
        }
      }).catch(function (error) {
        console.log(error);
      })
    }
  },
  mounted () {
    this.getTree();
    let that = this;
    Bus.$on('addApplicationTree', (e) => {
      that.data = e;
    });
    Bus.$on("updateApplicationTree", (e) => {
      that.data = e;
    });
    Bus.$on("deleteApplicationTree", (e) => {
      that.data = e;
    });
    Bus.$on("reloadApplicationTree", (e) => {
      that.data = e;
    });
    Bus.$on("loading1", (e) => {
      that.loading = e;
    });
    Bus.$on("loading2", (e) => {
      that.loading = e;
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
