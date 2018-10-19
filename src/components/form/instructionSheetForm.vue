<template>
  <div class="rightForm">
    <!--<div class="top">-->
      <!--<div class="left">-->
        <!--<el-row>-->
          <!--<el-col>-->
            <!--<p class="title">查询条件</p>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">-->
          <!--<el-row :gutter="20">-->
            <!--<el-col :span="11">-->
              <!--<el-form-item label="姓名" prop="name">-->
                <!--<el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="11">-->
              <!--<el-form-item label="体检卡号" prop="cardCode">-->
                <!--<el-input v-model="ruleForm.cardCode" placeholder="请输入体检卡号"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          <!--</el-row>-->
          <!--<el-row :gutter="20">-->
            <!--<el-col :span="11">-->
              <!--<el-form-item label="登记日期" prop="startDate">-->
                <!--<el-date-picker-->
                  <!--v-model="ruleForm.startDate"-->
                  <!--type="date"-->
                  <!--placeholder="请选择登记日期">-->
                <!--</el-date-picker>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="11">-->
              <!--<el-form-item label="至" prop="endDate">-->
                <!--<el-date-picker-->
                  <!--v-model="ruleForm.endDate"-->
                  <!--type="date"-->
                  <!--placeholder="请选择登记日期">-->
                <!--</el-date-picker>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          <!--</el-row>-->
          <!--<el-row :gutter="20">-->
            <!--<el-col :span="11">-->
              <!--<el-form-item label="体检编号" prop="examCode1">-->
                <!--<el-input v-model="ruleForm.examCode1" placeholder="请输入体检编号"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="11">-->
              <!--<el-form-item label="——" prop="examCode2">-->
                <!--<el-input v-model="ruleForm.examCode2" placeholder="请输入体检编号"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          <!--</el-row>-->
          <!--<el-row :gutter="20">-->
            <!--<el-col :span="11">-->
              <!--<el-form-item label="分组/套餐" prop="group">-->
                <!--<el-input v-model="ruleForm.group" placeholder="请输入分组/套餐"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          <!--</el-row>-->
        <!--</el-form>-->
      <!--</div>-->
      <!--<div class="right">-->
        <!--<el-row type="flex" justify="space-around" style="align-items:center;height:100%;width:100%;">-->
          <!--<el-button type="primary" size="small">查询</el-button>-->
          <!--<el-button type="primary" size="small">打印</el-button>-->
        <!--</el-row>-->
      <!--</div>-->
    <!--</div>-->
    <div class="bottom">
      <el-row>
        <el-col>
          <p class="title">查询结果</p>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        border
        height="85%"
        style="width:98%;margin:0 auto;"
        @row-click="handleRowClick"
        :highlight-current-row="true">
        <!--<el-table-column-->
          <!--type="selection"-->
          <!--width="50">-->
        <!--</el-table-column>-->
        <el-table-column
          label="登记流水号"
          prop="registrationNo"
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
          width="120"
          align="left">
        </el-table-column>
        <el-table-column
          label="身份证号"
          prop="personnelCode"
          width="200"
          align="left">
        </el-table-column>
        <el-table-column
          label="性别"
          prop="sexName"
          width="120"
          align="left">
        </el-table-column>
        <el-table-column
          label="年龄"
          prop="age"
          width="120"
          align="left">
        </el-table-column>
        <!--<el-table-column-->
          <!--label="单位"-->
          <!--prop="companyName"-->
          <!--width="300"-->
          <!--align="left">-->
        <!--</el-table-column>-->
        <el-table-column
          label="体检次数"
          prop="examTimes"
          width="150"
          align="left">
        </el-table-column>
        <el-table-column
          label="创建日期"
          prop="createdAt"
          width="200"
          align="left">
        </el-table-column>
        <el-table-column
          label="体检日期"
          prop="examDate"
          width="200"
          align="left">
        </el-table-column>
      </el-table>
    </div>
    <el-row type="flex" justify="center">
      <el-button type="primary" size="small" @click="printInstructionSheet()">打印</el-button>
      <el-button size="small" @click="reloadTree">刷新</el-button>
    </el-row>
  </div>
</template>

<script>
import Bus from '@/utils/bus.js'
import http from '@/api/index.js'
import formatDate from '@/utils/formatDate.js'
export default {
  name: "instructionSheetForm",
  data () {
    return {
      // ruleForm: {
      //   name: '',
      //   cardCode: '',
      //   startDate: '',
      //   endDate: '',
      //   examCode: '',
      //   group: ''
      // },
      tableData: [],
      examCode: '',
      examTimes: '',
      format: 'pdf'
    }
  },
  methods: {
    // 点击表格中每行获取examCode,examTimes
    handleRowClick (row, event, column) {
      console.log(row, event, column);
      this.examCode = row.examCode;
      this.examTimes = row.examTimes;
    },
    // 打印
    printInstructionSheet () {
      // http.printInstructionSheet(this.examCode, this.examTimes).then(response => {
      //   console.log(response);
      // }).catch(error => {
      //   console.log(error);
      // });
      // location.href = 'http://192.168.0.101:8081/api/reports/zy_report_A4?format=pdf&examCode=100001&examTimes=1';
      let web = 'http://192.168.0.107:8080'
      window.open(web + '/api/reports/zy_report_A4?format=pdf&examCode=' + this.examCode + '&examTimes=' + this.examTimes);
    },
    // 刷新树结构
    reloadTree () {
      let that = this;
      Bus.$emit("loading1", true);
      http.companyGroupTree().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          Bus.$emit("reloadSheetTree", response.data.data);
          Bus.$emit("loading2", false);
        }
      }).catch(error => {
        console.log(error);
      });
    }
  },
  mounted () {
    Bus.$on("staffs", (e) => {
      this.tableData = e;
      for (let i = 0; i < e.length; i++) {
        if (e[i].sex === 0) {
          e[i].sexName = '所有';
        } else if (e[i].sex === 1) {
          e[i].sexName = '男';
        } else if (e[i].sex === 2) {
          e[i].sexName = '女';
        }
        e[i].createdAt = formatDate(e[i].createdAt);
        e[i].examDate = formatDate(e[i].examDate);
      }
    });
  }
}
</script>

<style scoped>
  .rightForm{
    width:83%;
    height:92%;
    overflow:hidden;
    float:right;
  }
  .rightForm .top{
    width:100%;
    height:30%;
    margin-bottom:1%;
  }
  .rightForm .top .left{
    width:70%;
    height:100%;
    background:#fff;
    float:left;
    margin-right:1%;
  }
  .rightForm .top .left .demo-ruleForm{
    width:100%;
    height:80%;
    overflow:hidden;
    overflow-y:auto;
  }
  .rightForm .top .right{
    width:29%;
    height:100%;
    background:#fff;
    float:left;
  }
  .rightForm .top .left .title{
    font-size:12px;
    font-weight:bold;
    text-align:left;
    text-indent:20px;
  }
  .rightForm .bottom{
    width:100%;
    height:90%;
    background:#fff;
  }
  .rightForm .bottom .title{
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

