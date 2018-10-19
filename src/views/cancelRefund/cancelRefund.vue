<!--撤销退费-->
<template>
    <div class="container">
      <div class="top">
        <div class="query">
          <el-row>
            <el-col :span="24">
              <p class="title">查询条件(查询当天退费信息)</p>
            </el-col>
          </el-row>
          <el-form :model="form" ref="form" :rules="rules" label-width="100px" class="demo-form">
            <el-row :gutter="20">
              <el-col :span="11">
                <el-form-item label="收据号" prop="receiptNumber">
                  <el-input v-model="form.receiptNumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="登记流水号" prop="serialNumber">
                  <el-input v-model="form.serialNumber"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="11">
                <el-form-item label="退费时间" prop="startDate">
                  <el-date-picker
                    v-model="form.startDate"
                    type="date"
                    placeholder="请选择退费时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="至" prop="endDate">
                  <el-date-picker
                    v-model="form.endDate"
                    type="date"
                    placeholder="请选择退费时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="11">
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="buttons">
          <el-row type="flex" justify="space-around" style="height:100%;align-items:center;">
            <el-col :span="6">
              <el-button type="primary" size="small">查询</el-button>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" size="small">重置条件</el-button>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" size="small">撤销退费</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="bottom">
        <el-row>
          <el-col>
            <p> </p>
          </el-col>
        </el-row>
        <el-table
          :data="tableData"
          border
          height="90%"
          style="width:98%;margin:0 auto;">
          <el-table-column
            type="selection"
            width="80">
          </el-table-column>
          <el-table-column
            label="发票号码"
            prop="invoiceNo"
            width="240"
            align="left">
          </el-table-column>
          <el-table-column
            label="收据号"
            prop="receiptNumber"
            width="240"
            align="left">
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="name"
            width="160"
            align="left">
          </el-table-column>
          <el-table-column
            label="实收金额"
            prop="paidAmount"
            width="160"
            align="left">
          </el-table-column>
          <el-table-column
            label="折让金额"
            prop="discountAmount"
            width="160"
            align="left">
          </el-table-column>
          <el-table-column
            label="原收据号"
            prop="originalReceiptNo"
            width="240"
            align="left">
          </el-table-column>
          <el-table-column
            label="经手人"
            prop="handlers"
            width="160"
            align="left">
          </el-table-column>
          <el-table-column
            label="经手日期"
            prop="handleDate"
            width="240"
            align="left">
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
export default {
  name: "cancelRefund",
  data () {
    return {
      form: {
        receiptNumber: '', // 收据号
        serialNumber: '', // 登记流水号
        startDate: '', // 退费开始时间
        endDate: '', // 退费结束时间
        name: '' // 姓名
      },
      rules: {},
      tableData: []
    }
  }
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:hidden;
  }
  .container .top{
    width:100%;
    height:30%;
    margin-bottom:1%;
  }
  .container .top .query{
    width:70%;
    height:100%;
    background:#fff;
    float:left;
  }
  .container .top .query .demo-form{
    width:100%;
    height:85%;
    overflow-y:auto;
  }
  .container .top .buttons{
    width:29%;
    height:100%;
    background:#fff;
    float:right;
  }
  .container .bottom{
    width:100%;
    height:60%;
    background:#fff;
  }
  .container .title{
    font-size:12px;
    font-weight:bold;
    text-align:left;
    text-indent:20px;
  }
  .el-date-editor{
    width:100%;
  }
  .el-table{
    font-size:12px;
  }
  .el-select{
    width:100%;
  }
</style>
<style>
 @import '../../styles/common2.css';
</style>
