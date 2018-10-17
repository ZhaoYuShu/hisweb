<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>包含疾病</span>
    </div>
    <div v-for="item in examGroupItems" :key="item.code" class="text item">
      {{item.name}}
    </div>
  </el-card>
</template>

<script>
import Bus from '@/utils/bus.js'
export default {
  name: "diseasesCard",
  data () {
    return {
      examGroupItems: []
    }
  },
  created () {
    Bus.$on('packageItems', (e) => {
      this.examGroupItems = e;
    });
    Bus.$on('examItems', (e) => {
      this.examGroupItems = e;
    });
  }
}
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
    display:inline-block;
    margin-right:40px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 25%;
    margin-left:4%;
    height:400px;
    overflow:auto;
    float:left;
  }
</style>
