<template>
    <div class="container">
      <div class="top">
        <div class="package">
          <el-row :gutter="20">
            <el-col :span="6">
              <p>已选套餐</p>
            </el-col>
            <el-col :span="17">
              <el-table
                :data="tableData"
                border>
              </el-table>
            </el-col>
            <el-col></el-col>
          </el-row>
        </div>
        <div class="exam"></div>
      </div>
      <div class="bottom">
        <div class="person"></div>
        <div class="cost"></div>
      </div>
    </div>
</template>

<script>
export default {
  name: "examInfo"
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:hidden;
  }
  .container .package{
    width:20%;
    height:45%;
  }
</style>
