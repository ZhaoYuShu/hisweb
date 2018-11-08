<template>
  <div class="rightForm">
    <div class="top">
      <el-row>
        <el-col>
          <p class="title">查询条件</p>
        </el-col>
      </el-row>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm" label-width="100px">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="登记流水号" prop="orderNo">
              <el-input v-model="ruleForm.orderNo" placeholder="请输入登记流水号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单位名称" prop="companyCode">
              <el-select v-model="ruleForm.companyCode" @change="selectCompany">
                <el-option
                  v-for="item in companyCode"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="体检编号" prop="examCode">
              <el-input v-model="ruleForm.examCode" placeholder="请输入体检编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="体检次数" prop="examTimes">
              <el-input v-model="ruleForm.examTimes" placeholder="请输入体检编号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="单位分组" prop="groupCode">
              <el-select v-model="ruleForm.groupCode">
                <el-option
                  v-for="item in group"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态" prop="status">
              <el-select v-model="ruleForm.status">
                <el-option
                  v-for="item in status"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="options">
        <el-row>
          <el-col :span="24" style="display:flex;justify-content: center;">
            <el-button type="primary" size="small" @click="query">查询</el-button>
            <el-button type="primary" size="small" @click="printSheetBatch" :disabled="isDisabled">打印体检报告</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="bottom">
      <el-row>
        <el-col>
          <p class="title">查询结果<span style="color:red;">(共{{people}}人，已选{{selectedPeople}}人)</span></p>
        </el-col>
      </el-row>
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        height="90%"
        style="width:98%;margin:0 auto;"
        @select="handleSelectionChange"
        @select-all="handleSelectionAll"
        v-loading="loading1">
        <el-table-column
          type="selection"
          width="55"
          align="left">
        </el-table-column>
        <el-table-column
          prop="companyName"
          label="单位名称"
          width="200"
          align="left">
        </el-table-column>
        <el-table-column
          prop="orderNo"
          label="登记流水号"
          width="200"
          align="left">
        </el-table-column>
        <el-table-column
          prop="examCode"
          label="体检编号"
          width="200"
          align="left">
        </el-table-column>
        <el-table-column
          prop="examTimes"
          label="体检次数"
          width="100"
          align="left">
        </el-table-column>
        <el-table-column
          prop="companyGroupName"
          label="单位分组"
          width="200"
          align="left">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120"
          align="left">
        </el-table-column>
        <el-table-column
          prop="sexName"
          label="性别"
          width="120"
          align="left">
        </el-table-column>
        <el-table-column
          prop="examDate"
          label="体检日期"
          width="150"
          align="left">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系电话"
          width="150"
          align="left">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          align="left">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import http from '@/api/index.js'
  import formatDate from '@/utils/formatDate'
  export default {
    name: "medicalReport",
    data() {
      return {
        ruleForm: {
          orderNo: '', // 登记流水号
          companyCode: '', // 单位名称
          examCode: '', // 体检编号
          examTimes: '', // 体检次数
          groupCode: '', // 单位分组
          name: '', // 姓名
          status: 0 // 状态（0是未检，1是部分已检，2是待总检，3是已总检）
        },
        rules: {},
        tableData: [],
        loading1: false,
        people: 0,
        selectedPeople: 0,
        companyCode: [],
        group: [],
        status: [
          {id: 0, value: '未检'},
          {id: 1, value: '部分已检'},
          {id: 2, value: '待总检'},
          {id: 3, value: '已总检'}
        ],
        ids: [],
        isDisabled: true,
        web: 'http://192.168.0.114:8081'
      }
    },
    methods: {
      // 获取所有公司
      getAllCompany () {
        let that = this;
        http.getAllCompany().then(response => {
          console.log(response);
          if (response.status === 200 && response.data.result === '00000000') {
            let arr = [];
            for (let i = 0; i < response.data.data.length; i++) {
              if (response.data.data[i].pid !== 0) {
                arr.push(response.data.data[i]);
              }
            }
            that.companyCode = arr;
          }
        }).catch(error => {
          console.log(error);
        });
      },
      // 获取所有单位分组
      getAllGroup (companyCode) {
        let that = this;
        http.getAllCompanyGroup(companyCode).then(response => {
          console.log(response);
          if (response.status === 200 && response.data.result === '00000000') {
            that.group = response.data.data.companyGroups;
          }
        }).catch(error => {
          console.log(error);
        });
      },
      // 选择体检单位获取对应的单位分组
      selectCompany (data) {
        console.log(data);
        this.getAllGroup(data);
      },
      // 查询
      query () {
        let that = this;
        http.getExamRecord(that.ruleForm).then(response => {
          console.log(response);
          if (response.status === 200 && response.data.result === '00000000') {
            let res = response.data.data;
            that.people = res.length;
            for (let i = 0; i < res.length; i++) {
              // 格式化日期
              res[i].examDate = formatDate(res[i].examDate);
              // 转换性别
              if (res[i].sex === 1) {
                res[i].sexName = '男';
              } else if (res[i].sex === 2) {
                res[i].sexName = '女';
              } else if (res[i].sex === 0) {
                res[i].sexName = '所有';
              }
              // 转换状态
              if (res[i].status === 0) {
                res[i].status = '未检';
              } else if (res[i].status === 1) {
                res[i].status = '部分已检';
              } else if (res[i].status === 2) {
                res[i].status = '待总检';
              } else if (res[i].status === 3) {
                res[i].status = '已总检';
              }
            }
            that.tableData = res;
          }
        }).catch(error => {
          console.log(error);
        });
      },
      // 选择每个人员
      handleSelectionChange (selection, row) {
        console.log(selection, row);
        let arr = [];
        for (let i = 0; i < selection.length; i++) {
          arr.push(selection[i].orderNo);
        }
        console.log(arr);
        this.ids = arr;
        this.selectedPeople = this.ids.length;
        if (this.ids.length > 0) {
          this.isDisabled = false;
        } else {
          this.isDisabled = true;
        }
      },
      // 全选
      handleSelectionAll (selection) {
        console.log(selection);
        let arr = [];
        for (let i = 0; i < selection.length; i++) {
          arr.push(selection[i].orderNo);
        }
        console.log(arr);
        this.ids = arr;
        this.selectedPeople = this.ids.length;
        if (this.ids.length > 0) {
          this.isDisabled = false;
        } else {
          this.isDisabled = true;
        }
      },
      // 打印体检报告
      printSheetBatch () {
        window.open(this.web + '/api/reports/book?orderNo=' + this.ids);
      }
    },
    mounted () {
      this.getAllCompany();
    }
  }
</script>

<style scoped>
  .rightForm{
    width:100%;
    height:90%;
    padding-top:1%;
    padding-right:2%;
    background:#fff;
  }
  .rightForm .top{
    width:100%;
    height:25%;
    margin-bottom:1%;
    overflow:hidden;
  }
  .rightForm .bottom{
    width:100%;
    height:74%;
  }
  .rightForm .title{
    text-align:left;
    text-indent:20px;
    font-size:12px;
    font-weight:bold;
  }
  .rightForm .el-form{
    width:84%;
    height:100%;
    border-right:1px solid #ccc;
    padding-right:1%;
    float:left;
  }
  .rightForm .options{
    width:13%;
    height:100%;
    float:right;
  }
  .rightForm .el-date-editor{
    width:40%;
  }
  .rightForm .indexNumberStart{
    width:40%;
  }
  .rightForm .indexNumberEnd{
    width:40%;
  }
  .rightForm .options .el-radio{
    margin-left:0;
    margin-top:10px;
  }
  .rightForm .options .el-checkbox{
    margin-top:10px;
  }
  .rightForm .options .el-col-24{
    display:flex;
    justify-content: flex-start;
    align-items: center;
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
  >>>.current-row{
    background:#000;
  }
</style>


