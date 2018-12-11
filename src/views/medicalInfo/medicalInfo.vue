<template>
  <div class="rightForm">
    <div class="top">
      <el-row>
        <el-col>
          <p class="title">查询条件</p>
        </el-col>
      </el-row>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
        label-width="100px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="姓名" prop="userName">
              <el-input v-model="ruleForm.userName" placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="登记流水号" prop="orderNo">
              <el-input v-model="ruleForm.orderNo" class="code" placeholder="请输入登记流水号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button type="primary" size="small" @click="query">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="bottom">
      <el-row>
        <el-col>
          <p class="title">查询结果</p>
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
          prop="registrationNo"
          label="预约编号"
          width="200"
          align="left">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="100"
          align="left">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="100"
          align="left">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          width="100"
          align="left">
        </el-table-column>
        <el-table-column
          prop="examDate"
          label="体检日期"
          width="160"
          align="left">
        </el-table-column>
        <el-table-column
          prop="balanceType"
          label="结算方式"
          width="120"
          align="left">
        </el-table-column>
        <el-table-column
          prop="jobTitle"
          label="职称"
          width="160"
          align="left">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "medicalInfo",
  data () {
    return {
      ruleForm: {
        userName: '',
        // sex: '',
        companyCode: '',
        status: 0,
        orderNo: '',
        orderNo2: ''
      },
      rules: {},
      group: [],
      sex: [
        {id: 1, value: '男'},
        {id: 2, value: '女'},
        {id: 0, value: '所有'}
      ],
      tableData: [],
      ids: [],
      people: 0,
      loading1: false,
      loading2: false,
      codeArray: [],
      registrationNo: '',
      web: 'http://172.17.8.3:8081',
      url: ''
    }
  },
  methods: {
    // 选择每个人员
    handleSelectionChange (selection, row) {
      console.log(selection, row);
      let arr = [];
      let arr2 = [];
      for (let i = 0; i < selection.length; i++) {
        arr.push(selection[i].id);
        arr2.push(selection[i].registrationNo);
      }
      console.log(arr);
      this.ids = arr;
      this.codeArray = arr2;
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
      let arr2 = [];
      for (let i = 0; i < selection.length; i++) {
        arr.push(selection[i].id);
        arr2.push(selection[i].registrationNo);
      }
      console.log(arr);
      this.ids = arr;
      this.codeArray = arr2;
      if (this.ids.length > 0) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
    // 获取所有公司
    getAllGroup () {
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
          that.group = arr;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 查询人员信息
    query () {
      let that = this;
      that.loading1 = true;
      if (that.ruleForm.status === 0) {
        that.isShow = false;
      } else if (that.ruleForm.status === 1) {
        that.isShow = true;
      }
      http.getAllStaffs(that.ruleForm).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          for (let i = 0; i < response.data.data.length; i++) {
            // 转换性别
            if (response.data.data[i].sex === 0) {
              response.data.data[i].sex = '所有';
            } else if (response.data.data[i].sex === 1) {
              response.data.data[i].sex = '男';
            } else if (response.data.data[i].sex === 2) {
              response.data.data[i].sex = '女';
            }
            // 转换结算方式
            if (response.data.data[i].balanceType === 1) {
              response.data.data[i].balanceType = '个人结账';
            } else if (response.data.data[i].balanceType === 2) {
              response.data.data[i].balanceType = '单位结账';
            }
            // 转化体检日期
            // let date = new Date(response.data.data[i].examDate);
            // let year = date.getFullYear();
            // let month = date.getMonth() + 1;
            // let day = date.getDate();
            response.data.data[i].examDate = formatDate(response.data.data[i].examDate);
          }
          that.tableData = response.data.data;
          that.people = response.data.data.length;
          that.loading1 = false;
        }
      }).catch(error => {
        console.log(error);
      });
    }
  },
  mounted () {
    this.getAllGroup();
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
    height:20%;
    margin-bottom:1%;
    overflow:hidden;
  }
  .rightForm .bottom{
    width:100%;
    height:79%;
  }
  .rightForm .title{
    text-align:left;
    text-indent:20px;
    font-size:12px;
    font-weight:bold;
  }
  .rightForm .el-form{
    width:100%;
    height:100%;
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
