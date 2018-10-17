<template>
  <div class="container">
    <div class="top">
      <div class="query">
        <el-row>
          <el-col>
            <p class="title">查询条件</p>
          </el-col>
        </el-row>
        <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="体检单位" prop="companyCode">
                <el-select v-model="ruleForm.companyCode" placeholder="请选择单位" @change="handleSelectCompany">
                  <el-option
                    v-for="item in companyCode"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="单位分组" prop="groupCode">
                <el-select v-model="ruleForm.groupCode" placeholder="请选择单位分组">
                  <el-option
                    v-for="item in companyGroup"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item>
                <el-button type="primary" size="small" @click="queryInfo('ruleForm')">查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="info">
      <el-row>
        <el-col>
          <p class="title">未结算体检单位人员信息</p>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        border
        height="95%"
        style="width:98%;margin:0 auto;"
        @select="handleSelect"
        @select-all="handleSelectAll">
        <el-table-column
          type="selection"
          width="60">
        </el-table-column>
        <el-table-column
          label="登记流水号"
          prop="regCode"
          width="200"
          align="left">
        </el-table-column>
        <el-table-column
          label="体检编号"
          prop="examCode"
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
          label="年龄"
          prop="age"
          width="100"
          align="left">
        </el-table-column>
        <el-table-column
          label="性别"
          prop="sexName"
          width="100"
          align="left">
        </el-table-column>
        <el-table-column
          label="登记日期"
          prop="regDateName"
          width="200"
          align="left">
        </el-table-column>
        <el-table-column
          label="体检状态"
          prop="statusName"
          width="100"
          align="left">
        </el-table-column>
        <el-table-column
          label="体检次数"
          prop="examTimes"
          width="100"
          align="left">
        </el-table-column>
        <el-table-column
          label="交费方式"
          prop="clearingTypeName"
          width="100"
          align="left">
        </el-table-column>
      </el-table>
    </div>
    <div class="exam">
      <div class="exams">
        <el-row>
          <el-col>
            <p class="title">体检项目及价格</p>
          </el-col>
        </el-row>
        <el-table
          :data="tableData2"
          border
          height="80%"
          style="width:98%;margin:0 auto;"
          show-summary>
          <el-table-column
            label="体检项目"
            prop="examItemName"
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
      <div class="refund">
        <el-row>
          <el-col>
            <p class="title">收退费信息</p>
          </el-col>
        </el-row>
        <el-form :model="form" ref="form" :rules="rule1" class="demo-form" label-width="80px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="单位编号" prop="companyCode">
                <el-input v-model="form.companyCode" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位名称" prop="companyName">
                <el-input v-model="form.companyName" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="结算人数" prop="number">
                <el-input v-model="form.number" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="应收金额" prop="price">
                <el-input v-model="form.price" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-button size="small" type="primary" @click="printSheet">收费并打印收费单</el-button>
            <!--<el-button size="small" type="success">收费</el-button>-->
            <!--<el-button size="small" type="danger">退费</el-button>-->
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/api/index.js'
export default {
  name: "companyFee",
  data () {
    return {
      ruleForm: {
        companyCode: '',
        groupCode: ''
      },
      rules: {
        companyCode: [
          {required: true, message: '请选择体检单位', trigger: 'change'}
        ],
        groupCode: [
          {required: true, message: '请选择单位分组', trigger: 'change'}
        ]
      },
      companyCode: [],
      companyGroup: [],
      tableData: [],
      tableData2: [],
      form: {
        companyCode: '',
        companyName: '',
        number: '',
        price: ''
      },
      rule1: {},
      currentCode: '',
      sumPrice: 0,
      regNo: []
    }
  },
  methods: {
    // 获取所有体检单位
    getAllCompany () {
      let that = this;
      http.getAllCompany().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          let obj = [];
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].pid !== 0) {
              obj.push(response.data.data[i]);
            }
          }
          that.companyCode = obj;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 选择体检单位
    handleSelectCompany (value) {
      console.log(value);
      this.currentCode = value;
      this.form.companyCode = value;
      for (let i = 0; i < this.companyCode.length; i++) {
        if (this.companyCode[i].code === value) {
          this.form.companyName = this.companyCode[i].name;
          break;
        }
      }
      this.getAllGroup();
    },
    // 根据选择的体检单位获取单位分组
    getAllGroup () {
      let that = this;
      http.getAllCompanyGroup(that.currentCode).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.companyGroup = response.data.data.companyGroups;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 根据体检单位code,体检单位分组获取单位收费单信息（未结算）
    queryInfo (formName) {
      let that = this;
      that.sumPrice = 0;
      that.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("submit!");
          http.receiptInfo(that.ruleForm.companyCode, that.ruleForm.groupCode).then(response => {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              let users = response.data.data.users;
              for (let i = 0; i < users.length; i++) {
                // 转换性别
                if (users[i].sex === 0) {
                  users[i].sexName = '所有';
                } else if (users[i].sex === 1) {
                  users[i].sexName = '男';
                } else if (users[i].sex === 2) {
                  users[i].sexName = '女';
                }
                // 转换体检状态
                if (users[i].status === 0) {
                  users[i].statusName = '未检';
                } else if (users[i].status === 1) {
                  users[i].statusName = '已检';
                }
                // 转换结算方式
                if (users[i].clearingType === 1) {
                  users[i].clearingTypeName = '个人结账';
                } else if (users[i].clearingType === 2) {
                  users[i].clearingTypeName = '单位结账';
                }
                // 转换登记日期
                let date = new Date(users[i].regDate);
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                users[i].regDateName = year + '/' + month + '/' + day;
              }
              that.tableData = users;
              let chargeInfos = response.data.data.chargeInfos;
              that.tableData2 = chargeInfos;
              for (let i = 0; i < chargeInfos.length; i++) {
                that.sumPrice += chargeInfos[i].price;
              }
            }
          }).catch(error => {
            console.log(error);
          });
        }
      });
    },
    // 选择收费人
    handleSelect (selection, row) {
      this.regNo = [];
      console.log(selection, row);
      this.form.number = selection.length;
      this.form.price = (selection.length * this.sumPrice).toFixed(2);
      for (let i = 0; i < selection.length; i++) {
        this.regNo.push(selection[i].orderNo);
      }
    },
    // 全选收费人
    handleSelectAll (selection) {
      this.regNo = [];
      console.log(selection);
      this.form.number = selection.length;
      this.form.price = (selection.length * this.sumPrice).toFixed(2);
      for (let i = 0; i < selection.length; i++) {
        this.regNo.push(selection[i].orderNo);
      }
    },
    // 打印收费单
    printSheet () {
      let that = this;
      let obj = {};
      obj.companyCode = that.ruleForm.companyCode;
      obj.groupCode = that.ruleForm.groupCode;
      obj.regNo = that.regNo;
      http.printSheet(that.ruleForm.companyCode, that.ruleForm.groupCode, that.regNo).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
        }
      }).catch(error => {
        console.log(error);
      });
    }
  },
  mounted () {
    this.getAllCompany();
  }
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:auto;
  }
  .container .title{
    font-size:12px;
    font-weight:bold;
    text-align:left;
    text-indent:20px;
  }
  .container .top{
    width:100%;
    height:15%;
    margin-bottom:1%;
  }
  .container .top .query{
    width:80%;
    height:100%;
    float:left;
    background:#fff;
  }
  .container .info{
    width:60%;
    height:75%;
    background:#fff;
    float:left;
  }
  .container .exam{
    width:39%;
    height:75%;
    float:right;
  }
  .container .exam .exams{
    width:100%;
    height:60%;
    background:#fff;
    margin-bottom:1%;
  }
  .container .exam .refund{
    width:100%;
    height:39%;
    background:#fff;
  }
  .container .exam .refund .demo-form{
    padding-right:2%;
  }
  .el-select{
    width:100%;
  }
  .el-table{
    font-size:12px;
  }
</style>
<style>
  @import '../../styles/common.css';
</style>
