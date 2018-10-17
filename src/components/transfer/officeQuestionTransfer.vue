<template>
  <div class="rightForm">
    <el-transfer v-model="value1" :data="data" :titles="['未选问题', '已选问题']">
    </el-transfer>
  </div>
</template>

<script>
export default {
  name: "officeQuestionTransfer",
  data () {
    const generateData = _ => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`
        })
      }
      return data;
    };
    return {
      data: generateData(),
      value1: [1, 4]
    }
  }
}
</script>

<style scoped>
.rightForm{
  width:83%;
  float:right;
  background:#fff;
  height:90%;
  padding-top:20px;
}
</style>
<style>
  .el-transfer{
    width:100%;
    height:100%;
  }
  .el-transfer-panel{
    width:30%;
    height:80%;
  }
  .el-transfer-panel__body{
    width:100%;
    height:90%;
  }
  .el-transfer-panel__list{
    width:100%;
    height:100%;
  }
</style>
