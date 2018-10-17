<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>体检组合项目</span>
    </div>
    <div v-for="item in examGroupItems" :key="item.code" class="text item">
      {{item.name}}
    </div>
  </el-card>
</template>

<script>
import Bus from '@/utils/bus.js'
export default {
  name: "applicationCard",
  data () {
    return {
      examGroupItems: []
    }
  },
  created () {
    Bus.$on('examGroupItems2', (e) => {
      this.examGroupItems = e;
      console.log(e);
    });
    Bus.$on('packageItems2', (e) => {
      this.examGroupItems = e;
      console.log(e);
    });
    Bus.$on('examItems2', (e) => {
      this.examGroupItems = e;
      console.log(e);
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
    margin-right:15px;
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
