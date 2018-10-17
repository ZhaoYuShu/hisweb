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
  name: "equipmentTree",
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
      if (data.pid !== 0) {
        let equipmentId = data.id;
        Bus.$emit("equipmentId", data.id);
        http.equipmentDetail(equipmentId).then(function (response) {
          console.log(response);
          if (response.status === 200 && response.data.result === '00000000') {
            Bus.$emit('equipmentForm', response.data.data.medicalTechnology);
            Bus.$emit("saveDisabledEquipment", true);
            Bus.$emit("deleteDisabledEquipment", false);
            Bus.$emit("updateDisabledEquipment", false);
          }
        }).catch(function (error) {
          console.log(error);
        })
      }
    },
    getTree () {
      let that = this;
      that.loading = true;
      http.equipmentTree().then(function (response) {
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
    Bus.$on('addEquipmentTree', (e) => {
      this.data = e;
    });
    Bus.$on('deleteEquipmentTree', (e) => {
      this.data = e;
    });
    Bus.$on('updateEquipmentTree', (e) => {
      this.data = e;
    });
    Bus.$on("reloadEquipmentTree", (e) => {
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
