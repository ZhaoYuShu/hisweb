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
  name: "clinicTree",
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
      console.log(data, data.id);
      if (data.id !== 1) {
        let clinicId = data.id;
        Bus.$emit("currentId", clinicId);
        http.clinicDetail(clinicId).then(function (response) {
          console.log(response);
          if (response.status === 200 && response.data.result === '00000000') {
            Bus.$emit("clinicDetail", response.data.data);
            Bus.$emit("saveDisabledClinic", true);
            Bus.$emit("deleteDisabledClinic", false);
            Bus.$emit("updateDisabledClinic", false);
          }
        }).catch(function (error) {
          console.log(error);
        })
      }
    },
    getTree () {
      let that = this;
      that.loading = true;
      http.clinicTree().then(function (response) {
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
    Bus.$on("addClinicTree", (e) => {
      this.data = e;
    });
    Bus.$on("updateClinicTree", (e) => {
      this.data = e;
    });
    Bus.$on("deleteClinicTree", (e) => {
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
