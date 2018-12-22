<template>
  <div class="rightForm">
    <div class="left">
      <el-row>
        <el-col>
          <p class="title">人员列表<span style="color:red;"></span></p>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        border
        height="95%"
        style="width:98%;margin:0 auto;"
        :highlight-current-row="true"
        @row-click="selectExamItem">
        <el-table-column
          prop="companyName"
          label="单位"
          width="180"
          align="left">
        </el-table-column>
        <el-table-column
          prop="orderNo"
          label="登记流水号"
          width="150"
          align="left">
        </el-table-column>
        <el-table-column
          prop="examCode"
          label="体检号"
          width="150"
          align="left">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="100"
          align="left">
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          width="100"
          align="left">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          width="80"
          align="left">
        </el-table-column>
        <el-table-column
          prop="examTimes"
          label="体检次数"
          align="left">
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="phone"-->
          <!--label="手机"-->
          <!--width="160"-->
          <!--align="left">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="labelNum"-->
          <!--label="标签个数"-->
          <!--align="left">-->
        <!--</el-table-column>-->
      </el-table>
    </div>
    <div class="right">
      <el-row>
        <el-col>
          <p class="title">体检项目<span style="color:red;"></span></p>
        </el-col>
      </el-row>
      <el-table
        :data="tableData2"
        border
        height="70%"
        style="width:98%;margin:0 auto;"
        :row-style="rowStyle"
        @row-click="selectExamItem">
        <el-table-column
          prop="name"
          label="体检项目">
        </el-table-column>
        <el-table-column
          prop="statusName"
          label="状态"
          sortable>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import http from '@/api/index.js'
import Bus from '@/utils/bus.js'
export default {
  name: "medicalInfoForm",
  data () {
      return {
        tableData: [],
        tableData2: [],
        company: []
      }
  },
  methods: {
    // 获取所有单位
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
          that.company = arr;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 根据登记流水号查询出该客户的体检项目用于拒检操作
    selectExamItem (data) {
      console.log(data);
      http.personItems(data.orderNo).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          let res = response.data.data;
          for (let i = 0; i < res.length; i++) {
            switch (res[i].status) {
              case 0:
                res[i].statusName = '未检';
                break;
              case 1:
                res[i].statusName = '已检';
                break;
            }
          }
          this.tableData2 = res;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 标红未检人员颜色
    rowStyle (data) {
      console.log(data);
      if (data.row.status === 0) {
        return 'background:#f77b7b;color:#fff;';
      }else {
        return 'background:#9f9fef;color:#fff;'
      }
    }
  },
  mounted () {
    let that = this;
    that.getAllCompany();
    Bus.$on("tableData", (e) => {
      for (let i = 0; i < e.length; i++) {
        for (let j = 0; j < this.company.length; j++) {
          if (e[i].companyCode === this.company[j].code) {
            e[i].companyName = this.company[j].name;
          }
          if (e[i].sex === 1) {
            e[i].gender = "男"
          } else if (e[i].sex === 2) {
            e[i].gender = "女"
          } else if (e[i].sex === 0) {
            e[i].gender = "所有"
          }
        }
      }
      that.tableData = e;
    });
  }
}
</script>

<style scoped>
  .rightForm{
    float:right;
    width:82%;
    height:98%;
    background:#fff;
    margin-left:2%;
    padding-right:1%;
    /*padding-top:20px;*/
    overflow:auto;
  }
  .rightForm .title{
    font-size:12px;
    font-weight:bold;
    text-align:left;
    text-indent:20px;
  }
  .rightForm .left{
    width:65%;
    height:100%;
    float:left;
    margin-right:2%;
  }
  .rightForm .right{
    width:33%;
    height:100%;
    float:left;
  }
  .el-radio-group{
    width:100%;
  }
  .el-select{
    width:100%;
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


