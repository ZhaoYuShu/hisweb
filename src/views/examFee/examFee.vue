<!--个人体检收费-->
<template>
  <div class="container">
    <div class="base">
      <el-form ref="form" :rules="rules" :model="form" label-width="100px" class="demo-form">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="登记流水号" prop="registrationNo" style="margin-bottom:0;">
              <el-input v-model="form.registrationNo" placeholder="请输入登记流水号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name" style="margin-bottom:0;">
              <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="buttons">
      <el-row type="flex" justify="space-around" style="height:100%;align-items:center;">
        <el-col :span="6">
          <el-button type="primary" size="small" @click="query">查询</el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="success" size="small" @click="charge" :disabled="disabled">收费</el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="danger" size="small" :disabled="disabled2">退费</el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="warning" size="small" :disabled="disabled3">补打/重打</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="clear"></div>
    <div class="info">
      <el-row>
        <el-col :span="24">
          <p class="title">体检人员信息</p>
        </el-col>
      </el-row>
      <el-row style="margin-bottom:10px;padding-left:20px;">
        <el-col :span="24">
          <el-radio-group v-model="option">
            <el-radio
              v-for="item in options"
              :key="item.id"
              :label="item.id">
              {{item.value}}
            </el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        border
        height="80%"
        style="width:98%;margin:0 auto;"
        @row-click="handleRowClick">
        <el-table-column
          label="登记流水号"
          prop="orderNo"
          width="200"
          align="left">
        </el-table-column>
        <!--<el-table-column-->
          <!--label="体检日期"-->
          <!--prop="date"-->
          <!--width="150"-->
          <!--align="left">-->
        <!--</el-table-column>-->
        <el-table-column
          label="姓名"
          prop="name"
          width="120"
          align="left">
        </el-table-column>
        <el-table-column
          label="性别"
          prop="sexName"
          width="100"
          align="left">
        </el-table-column>
        <!--0是未检，1是部分已检，2是待总检，3是完成-->
        <el-table-column
          label="体检状态"
          prop="checkStatus"
          width="120"
          align="left">
        </el-table-column>
        <el-table-column
          label="体检编号"
          prop="examCode"
          width="150"
          align="left">
        </el-table-column>
        <el-table-column
          label="体检次数"
          prop="examTimes"
          width="100"
          align="left">
        </el-table-column>
        <!--1是个人交费，2是单位交费-->
        <el-table-column
          label="交费方式"
          prop="balanceType"
          align="left">
        </el-table-column>
      </el-table>
    </div>
    <div class="project">
      <el-row>
        <el-col :span="24">
          <p class="title">体检项目及价格</p>
        </el-col>
      </el-row>
      <el-table
        :data="tableData2"
        border
        height="85%"
        style="width:98%;margin:0 auto;">
        <el-table-column
          label="体检项目"
          prop="examItemName"
          width="300"
          align="left">
        </el-table-column>
        <el-table-column
          label="价格"
          prop="realIncome"
          align="left">
        </el-table-column>
      </el-table>
    </div>
    <div class="clear"></div>
    <!--<div class="price">-->
      <!--<el-row>-->
        <!--<el-col :span="24">-->
          <!--<p class="title">相关收费项目及价格</p>-->
        <!--</el-col>-->
      <!--</el-row>-->
      <!--<el-table-->
        <!--:data="tableData3"-->
        <!--border-->
        <!--height="85%"-->
        <!--style="width:98%;margin:0 auto;"-->
        <!--@select="handleSelect"-->
        <!--@select-all="handleSelectAll">-->
        <!--<el-table-column-->
          <!--type="selection"-->
          <!--width="60"-->
          <!--align="left">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--label="相关收费项目"-->
          <!--prop="name"-->
          <!--width="300"-->
          <!--align="left">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--label="价格"-->
          <!--prop="price"-->
          <!--align="left">-->
        <!--</el-table-column>-->
      <!--</el-table>-->
    <!--</div>-->
    <div class="refund">
      <el-row>
        <el-col :span="24">
          <p class="title">收费信息</p>
        </el-col>
      </el-row>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm">
        <el-row :gutter="10">
          <el-col :span="4">
            <el-form-item label="收费种类" prop="chargeType">
              <el-select v-model="ruleForm.chargeType" filterable placeholder="请选择收费种类">
                <el-option
                  v-for="item in chargeType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="体检编号" prop="code">
              <el-input v-model="ruleForm.code" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="打折" prop="discount1">
              <el-input v-model="ruleForm.discount1" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="总计金额" prop="totalAmount">
              <el-input v-model="ruleForm.totalAmount" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="应收金额" prop="receivableMoney">
              <el-input v-model="ruleForm.receivableMoney" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="4">
            <el-form-item label="实收金额" prop="paidMoney">
              <el-input v-model="ruleForm.paidMoney" @keyup.enter.native="getMoney"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="找零金额" prop="changeAmount">
              <el-input v-model="ruleForm.changeAmount" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import http from '@/api/index.js'
export default {
  name: "examFee",
  data () {
    return {
      form: {
        registrationNo: '', // 登记流水号
        name: '' // 姓名
        // startDate: '', // 体检开始时间
        // endDate: '' // 体检结束时间
      },
      rules: {},
      options: [
        {id: 0, value: '未收费名单'},
        {id: 1, value: '已收费名单'}
      ],
      option: 0,
      ruleForm: {
        chargeType: '', // 收费类型
        code: '', // 体检编号
        name: '', // 姓名
        discount1: '', // 打折
        packageReceivable: '', // 套餐应收
        totalAmount: '', // 总计金额
        receivableMoney: '', // 应收金额
        paidMoney: '', // 实收金额
        changeAmount: '', // 找零金额
      },
      sumPrice: '',
      chargeType: [],
      dialogFormVisible: false,
      dialogTable: [],
      tableData: [],
      tableData2: [],
      tableData3: [],
      currentCode: '',
      disabled: true,
      disabled2: true,
      disabled3: true,
      web: 'http://192.168.0.100:8081'
      // web: 'http://172.17.8.3:8081'
    }
  },
  methods: {
    // 查询交费名单
    query () {
      let that = this;
      let obj = {};
      obj.orderNo = this.form.registrationNo;
      obj.name = this.form.name;
      obj.status = this.option;
      obj.clearingType = 1;
      that.tableData2 = [];
      that.ruleForm = {};
      http.receiptInfoList(obj).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.tableData = response.data.data.users;
          for (let i = 0; i < that.tableData.length; i++) {
            // 转换日期
            // let date = new Date(that.tableData[i].checkDate);
            // let year = date.getFullYear();
            // let month = date.getMonth();
            // let day = date.getDate();
            // that.tableData[i].date = year + '/' + month + '/' + day;
            // 转换性别
            // 1是男，2是女，0是所有
            if (that.tableData[i].sex === 1) {
              that.tableData[i].sexName = '男';
            } else if (that.tableData[i].sex === 2) {
              that.tableData[i].sexName = '女';
            } else if (that.tableData[i].sex === 0) {
              that.tableData[i].sexName = '所有';
            }
            // 转换总检状态
            // 0是未检，1是部分已检，2是待总检，3是完成
            if (that.tableData[i].status === 0) {
              that.tableData[i].checkStatus = '未检';
            } else if (that.tableData[i].status === 1) {
              that.tableData[i].checkStatus = '部分已检';
            } else if (that.tableData[i].status === 2) {
              that.tableData[i].checkStatus = '待总检';
            } else if (that.tableData[i].status === 3) {
              that.tableData[i].checkStatus = '完成';
            }
            // 转换交费方式
            // 1是个人交费，2是单位交费
            if (that.tableData[i].clearingType === 1) {
              that.tableData[i].balanceType = '个人结账';
            } else if (that.tableData[i].clearingType === 2) {
              that.tableData[i].balanceType = '单位结账';
            }
          }
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 点击每一行获取收费项目和交费的明细信息
    handleRowClick (row, event, column) {
      console.log(row, event, column);
      let that = this;
      that.disabled = false;
      that.disabled2 = false;
      that.disabled3 = false;
      that.currentCode = row.orderNo;
      http.receiptInfoDetail(row.orderNo).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          let result = response.data.data;
          that.tableData2 = result.chargeInfos;
          that.ruleForm.name = result.name;
          that.ruleForm.code = result.code;
          that.ruleForm.discount1 = result.discount;
          that.ruleForm.totalAmount = result.sumPrice.toFixed(2);
          that.sumPrice = result.sumPrice;
          that.ruleForm.receivableMoney = (result.discount * result.sumPrice / 100).toFixed(2);
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 获取所有相关收费项目及价格
    getAllOtherCharge () {
      let that = this;
      http.getAllOtherCharge().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          let arr = [];
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].id !== 1) {
              arr.push(response.data.data[i]);
            }
          }
          that.tableData3 = arr;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 获取所有收费类别
    getAllChargeType () {
      let that = this;
      http.getAllChargeType().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          let arr = [];
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].pid !== 0) {
              arr.push(response.data.data[i]);
            }
          }
          that.chargeType = arr;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 计算出找零金额
    getMoney () {
      this.ruleForm.changeAmount = (this.ruleForm.paidMoney - this.ruleForm.receivableMoney).toFixed(2);
    },
    // 收费
    charge () {
      let that = this;
      http.confirmCharge2(that.currentCode).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.$message({
            message: '交费成功',
            type: 'success'
          });
          window.open(that.web + '/api/receiptInfo/print2/' + that.currentCode);
        }
      }).catch(error => {
        console.log(error);
      });
    }
  },
  mounted () {
    this.getAllOtherCharge();
    this.getAllChargeType();
  }
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:auto;
  }
  .container .base{
    width:58%;
    height:16%;
    background:#fff;
    float:left;
    margin-bottom:1%;
    overflow:auto;
    overflow-x:hidden;
    padding-right:2%;
  }
  .container .base .demo-form{
    display:flex;
    flex-direction: column;
    justify-content: center;
    height:100%;
    width:100%;
  }
  .container .buttons{
    width:39%;
    height:16%;
    background:#fff;
    float:right;
    margin-bottom:1%;
  }
  .container .info{
    width:70%;
    height:55%;
    background:#fff;
    float:left;
    margin-bottom:1%;
  }
  .container .project{
    width:29%;
    height:55%;
    background:#fff;
    float:right;
    margin-bottom:1%;
  }
  /*.container .price{*/
    /*width:40%;*/
    /*height:60%;*/
    /*background:#fff;*/
    /*float:left;*/
    /*margin-bottom:5%;*/
  /*}*/
  .container .refund{
    width:100%;
    /*height:60%;*/
    background:#fff;
    /*float:right;*/
  }
  .el-date-editor{
    width:100%;
  }
  .el-select{
    width:100%;
  }
  .clear{
    clear:both;
  }
  .container .title{
    font-size:12px;
    font-weight:bold;
    text-align:left;
    text-indent:20px;
  }
  .demo-ruleForm{
    height:80%;
    overflow:auto;
    overflow-x: hidden;
  }
  .el-table{
    font-size:12px;
  }
</style>
<style scoped>
  >>>.el-form-item__label{
    font-size:12px;
  }
  >>>.el-input__inner{
    height:30px;
    line-height:30px;
  }
  >>>.el-input-number.is-controls-right .el-input-number__increase{
    height:15px;
    top:5px;
  }
  >>>.el-input-number.is-controls-right .el-input-number__decrease{
    height:15px;
    bottom:5px;
  }
  >>>.el-form-item{
    margin-bottom:15px;
  }
  >>>.el-date-editor.el-input, >>>.el-date-editor.el-input__inner{
    width:100%;
  }
  >>>.el-select{
    width:100%;
  }
  >>>.el-table{
    font-size:12px;
  }
  >>>.el-table td, >>>.el-table th{
    padding:0.8vh 0;
  }
  >>>.el-tree-node__label{
    font-size:12px;
  }
  >>>.el-radio__label{
    font-size:12px;
  }
  >>>.el-checkbox+.el-checkbox{
    display:block;
  }
  >>>.el-transfer-panel__item.el-checkbox{
    margin-left:30px;
  }

</style>
