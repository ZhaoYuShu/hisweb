<!--个人体检收费-->
<template>
    <div class="container">
      <div class="queryConditions">
        <el-form :rules="rules" :model="form" label-width="100px" ref="form" class="demo-form">
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="体检日期从" prop="startDate">
                <el-date-picker
                  type="date"
                  v-model="form.startDate"
                  placeholder="请选择体检日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="至" prop="endDate">
                <el-date-picker
                  type="date"
                  v-model="form.endDate"
                  placeholder="请选择体检日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="登记流水号" prop="registrationNumber">
                <el-input v-model="form.registrationNumber" placeholder="请输入登记流水号"></el-input>
              </el-form-item>
            </el-col>
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
            <el-button type="primary" size="medium">人员查询</el-button>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" size="medium">发票打印</el-button>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" size="medium">收费</el-button>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" size="medium">退费</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="personalInfo">
        <el-row>
          <el-col :span="24">
            <p class="title">体检人员信息</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-radio-group v-model="list">
              <el-radio
                v-for="item in lists"
                :key="item.id"
                :label="item.id">
                {{item.value}}
              </el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-table
          :data="tableData1"
          border
          height="70%"
          style="width:98%;margin:0 auto;">
          <el-table-column
            label="编号"
            prop="code"
            width="100"
            align="left">
          </el-table-column>
          <el-table-column
            label="登记日期"
            prop="registrationDate"
            width="150"
            align="left">
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="name"
            width="100"
            align="left">
          </el-table-column>
          <el-table-column
            label="性别"
            prop="sex"
            width="80"
            align="left">
          </el-table-column>
          <el-table-column
            label="总检"
            prop="check"
            width="100"
            align="left">
          </el-table-column>
          <el-table-column
            label="体检编号"
            prop="examNumber"
            width="150"
            align="left">
          </el-table-column>
          <el-table-column
            label="体检次数"
            prop="examNumber"
            width="100"
            align="left">
          </el-table-column>
          <el-table-column
            label="体检类别"
            prop="examType"
            width="100"
            align="left">
          </el-table-column>
          <el-table-column
            label="交费方式"
            prop="chargeType"
            width="100"
            align="left">
          </el-table-column>
        </el-table>
      </div>
      <div class="price1">
        <el-row>
          <el-col :span="24">
            <p class="title">相关收费项目及价格</p>
          </el-col>
        </el-row>
        <el-table
          :data="tableData2"
          border
          height="80%"
          style="width:98%;margin:0 auto;">
          <el-table-column
            type="selection"
            width="50">
          </el-table-column>
          <el-table-column
            label="收费项目"
            prop="exam"
            width="300"
            align="left">
          </el-table-column>
          <el-table-column
            label="价格"
            prop="price"
            align="left">
          </el-table-column>
        </el-table>
      </div>
      <div class="price2">
        <el-row>
          <el-col :span="24">
            <p class="title">未收体检项目及价格</p>
          </el-col>
        </el-row>
        <el-table
          :data="tableData3"
          border
          height="80%"
          style="width:98%;margin:0 auto;">
          <el-table-column
            label="类型"
            prop="type"
            width="100"
            align="left">
          </el-table-column>
          <el-table-column
            label="体检项目"
            prop="exam"
            width="200"
            align="left">
          </el-table-column>
          <el-table-column
            label="标准单价"
            prop="standardPrice"
            width="120"
            align="left">
          </el-table-column>
          <el-table-column
            label="实收单价"
            prop="paidPrice"
            width="120"
            align="left">
          </el-table-column>
          <el-table-column
            label="检完否"
            prop="checkout"
            width="100"
            align="left">
          </el-table-column>
          <el-table-column
            label="折扣"
            prop="discount"
            width="100"
            align="left">
          </el-table-column>
          <el-table-column
            label="发票项目"
            prop="invoice"
            width="120"
            align="left">
          </el-table-column>
        </el-table>
      </div>
      <div class="chargeRefund">
        <el-row>
          <el-col :span="24">
            <p class="title">收退费信息</p>
          </el-col>
        </el-row>
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          :rules="rules2"
          label-width="100px"
          class="demo-ruleForm">
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="收费种类" prop="chargeType">
                <el-select v-model="ruleForm.chargeType">
                  <el-option
                    v-for="item in chargeType"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="当前发票" prop="invoice">
                <el-input v-model="ruleForm.invoice"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="体检编号" prop="examCode">
                <el-input v-model="ruleForm.examCode" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="套餐金额" prop="packagePrice">
                <el-input v-model="ruleForm.packagePrice" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="打折" prop="discount1">
                <el-input v-model="ruleForm.discount1" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="套餐应收" prop="packageReceivable">
                <el-input v-model="ruleForm.packageReceivable" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="加做金额" prop="addedPrice">
                <el-input v-model="ruleForm.addedPrice" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="打折" prop="discount2">
                <el-input v-model="ruleForm.discount2" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="加做应收" prop="addedReceivable">
                <el-input v-model="ruleForm.addedReceivable" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="合计金额" prop="totalAmount">
                <el-input v-model="ruleForm.totalAmount" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="打折" prop="discount3">
                <el-input v-model="ruleForm.discount3" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="合计应收" prop="totalReceivable">
                <el-input v-model="ruleForm.totalReceivable" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <hr style="width:90%;margin:0 auto;"/>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="凑整差额" prop="difference">
                <el-input v-model="ruleForm.difference" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="本次应收" prop="accountsReceivable">
                <el-input v-model="ruleForm.accountsReceivable" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="price3">
        <el-row>
          <el-col :span="24">
            <p class="title">已收体检项目及价格</p>
          </el-col>
        </el-row>
        <el-table
          :data="tableData4"
          border
          height="80%"
          style="width:98%;margin:0 auto;">
          <el-table-column
            prop="receiptNumber"
            label="收据号"
            width="160"
            align="left">
          </el-table-column>
          <el-table-column
            prop="examName"
            label="项目名称"
            width="160"
            align="left">
          </el-table-column>
          <el-table-column
            prop="standardPrice"
            label="标准价格"
            width="100"
            align="left">
          </el-table-column>
          <el-table-column
            prop="receivablePrice"
            label="应收单价"
            width="100"
            align="left">
          </el-table-column>
          <el-table-column
            prop="packageCode"
            label="套餐编号"
            width="160"
            align="left">
          </el-table-column>
          <el-table-column
            prop="refund"
            label="是否退费"
            width="100"
            align="left">
          </el-table-column>
        </el-table>
      </div>
      <div class="balance">
        <el-row>
          <el-col :span="24">
            <p class="title">收费结算</p>
          </el-col>
        </el-row>
        <el-form :model="feeForm" :rules="rules3" ref="feeForm" label-width="100px" class="demo-feeForm">
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="收据号" prop="receiptNumber">
                <el-input v-model="feeForm.receiptNumber" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="收费时间" prop="feeTime">
                <el-input v-model="feeForm.feeTime" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="应收金额" prop="receivableAmount">
                <el-input v-model="feeForm.receivableAmount" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="实收金额" prop="paidAmount">
                <el-input v-model="feeForm.paidAmount" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="实际差额" prop="difference">
                <el-input v-model="feeForm.difference" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <hr style="width:90%;margin:10px auto;"/>
          <el-row type="flex" justify="space-around">
            <el-col :span="6">
              <el-button type="primary" size="small">收费</el-button>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" size="small">多方式付款</el-button>
            </el-col>
            <el-col :span="6">
              <el-checkbox v-model="feeForm.invoice">收费后打印发票</el-checkbox>
            </el-col>
          </el-row>
          <hr style="width:90%;margin:10px auto;"/>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="收现金额" prop="acceptCash">
                <el-input v-model="feeForm.acceptCash"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="找零金额" prop="changeAmount">
                <el-input v-model="feeForm.changeAmount"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
</template>

<script>
export default {
  name: "personalExamCharge",
  data () {
    return {
      form: {
        startDate: '',
        endDate: ''
      },
      list: '',
      lists: [
        {id: 0, value: '未收费名单'},
        {id: 1, value: '已收费名单'},
        {id: 2, value: '项目已调整名单'}
      ],
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      rules: {},
      rules2: {},
      ruleForm: {
        chargeType: '', // 收费类型
        invoice: '', // 当前发票
        examCode: '', // 体检编号
        name: '', // 姓名
        packagePrice: '', // 套餐金额
        discount1: '', // 打折
        packageReceivable: '', // 套餐应收
        addedPrice: '', // 加做金额
        discount2: '', // 打折
        addedReceivable: '', // 加做应收
        totalAmount: '', // 合计金额
        discount3: '', // 打折
        totalReceivable: '', // 合计应收
        difference: '', // 凑整差额
        accountsReceivable: '' // 本次应收
      },
      chargeType: [],
      feeForm: {
        receiptNumber: '', // 收据号
        feeTime: '', // 收费时间
        receivableAmount: '', // 应收金额
        paidAmount: '', // 实收金额
        difference: '', // 实际差额
        invoice: '', // 打印发票
        acceptCash: '', // 收现金额
        changeAmount: '' // 找零金额
      },
      rules3: {}
    }
  }
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:auto;
  }
  .container .queryConditions{
    width:50%;
    height:18%;
    float:left;
    background:#fff;
    margin-bottom:1%;
    padding-top:1%;
  }
  .container .buttons{
    width:49%;
    height:20%;
    float:right;
    background:#fff;
    margin-bottom:1%;
  }
  .container .personalInfo{
    width:50%;
    height:40%;
    float:left;
    background:#fff;
    margin-bottom:1%;
  }
  .container .personalInfo .el-table{
    overflow:auto;
  }
  .container .price1{
    width:49%;
    height:40%;
    float:right;
    background:#fff;
    margin-bottom:1%;
  }
  .container .price2{
    width:50%;
    height:40%;
    float:left;
    background:#fff;
    margin-bottom:1%;
  }
  .container .chargeRefund{
    width:49%;
    height:40%;
    float:right;
    background:#fff;
    margin-bottom:1%;
  }
  .container .chargeRefund .demo-ruleForm{
    width:100%;
    height:90%;
    overflow-y:auto;
  }
  .container .price3{
    width:50%;
    height:40%;
    float:left;
    background:#fff;
    margin-bottom:5%;
  }
  .container .balance{
    width:49%;
    height:40%;
    float:right;
    background:#fff;
    margin-bottom:5%;
  }
  .container .balance .demo-feeForm{
    width:100%;
    height:90%;
    overflow-y:auto;
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
  @import '../../styles/common.css';
</style>
