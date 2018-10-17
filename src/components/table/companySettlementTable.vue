<template>
  <div class="box">
    <el-row>
      <el-col>
        <p class="title">单位体检结算方式设置</p>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      border
      height="90%">
      <el-table-column
        label="次数"
        prop="num"
        width="100"
        align="left">
      </el-table-column>
      <el-table-column
        label="计费方式"
        prop="billingWay"
        width="200"
        align="left">
      </el-table-column>
      <el-table-column
        label="折扣率"
        prop="discount"
        width="120"
        ailgn="left">
      </el-table-column>
      <el-table-column
        label="固定金额(元/人)"
        prop="price"
        width="200"
        align="left">
      </el-table-column>
      <el-table-column
        label="付款方式"
        prop="payment"
        width="120"
        align="left">
      </el-table-column>
      <el-table-column
        label="结算条件"
        prop="settlementConditions"
        width="200"
        align="left">
      </el-table-column>
      <el-table-column
        label="结账标志"
        prop="checkMark"
        width="120"
        align="left">
      </el-table-column>
      <el-table-column
        label="经手人"
        prop="handlers"
        width="120"
        align="left">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button type="text" size="small">修改</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "companySettlementTable",
  data () {
    return {
      tableData: []
    }
  }
}
</script>

<style scoped>
  .box{
    width:83%;
    height:90%;
    padding-top:20px;
    float:right;
    background:#fff;
  }
  .box .title{
    font-size:12px;
    font-weight:bold;
    text-align:left;
    text-indent:20px;
  }
  .box .el-table{
    width:98%;
    margin:0 auto;
  }
</style>
<style>
  @import '../../styles/common.css';
</style>
