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
            <el-col :span="9">
              <el-form-item label="登记流水号" prop="regNo">
                <el-input v-model="ruleForm.regNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="体检编号" prop="examCode">
                <el-input v-model="ruleForm.examCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item>
                <el-button type="primary" size="small" @click="queryExam()">查询</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item>
                <el-button type="primary" size="small" @click="printSheet()" :disabled="disabled">打印收费单</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item>
                <el-button type="primary" size="small" @click="confirm()" :disabled="disabled">确认</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="info">
      <el-transfer
        filterable
        :filter-method="filterMethod"
        :titles="['未选项目', '已选项目']"
        filter-placeholder="请输入项目拼音"
        v-model="value2"
        :data="data2"
        @change="changeProjects">
      </el-transfer>
    </div>
    <div class="exam">
      <div class="exams">
        <el-row>
          <el-col>
            <p class="title">加项项目及价格</p>
          </el-col>
        </el-row>
        <el-table
          :data="tableData2"
          border
          height="85%"
          style="width:98%;margin:0 auto;"
          show-summary>
          <el-table-column
            label="体检项目"
            prop="name"
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
    </div>
  </div>
</template>

<script>
import http from '@/api/index.js'
export default {
  name: "addExam",
  data () {
    return {
      ruleForm: {
        regNo: '',
        examCode: ''
      },
      data2: [],
      value2: [],
      filterMethod (query, item) {
        return item.alphabeticBrevityCode.indexOf(query) > -1;
      },
      companyCode: '',
      companyGroupCode: '',
      orderNo: '',
      rules: {},
      examGroupItemResultDtoList: [],
      tableData: [],
      tableData2: [],
      currentCode: '',
      sumPrice: 0,
      regNo: [],
      disabled: true,
      // web: 'http://192.168.0.102:8081'
      web: 'http://172.17.8.3:8081'
    }
  },
  methods: {
    // 获取所有组合项目
    getAllGroup () {
      let that = this;
      http.allGroup().then(response => {
        console.log(response);
        that.data2 = [];
        if (response.status === 200 && response.data.result === '00000000') {
          for (let i = 0; i < response.data.data.length; i++) {
            let obj = {};
            obj.label = response.data.data[i].name;
            obj.key = response.data.data[i].code;
            obj.price = response.data.data[i].price;
            obj.discount = response.data.data[i].discount;
            obj.realPrice = response.data.data[i].realPrice;
            obj.alphabeticBrevityCode = response.data.data[i].alphabeticBrevityCode;
            that.data2.push(obj);
          }
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 根据登记流水号或体检编号获取已选的体检项目
    queryExam () {
      let that = this;
      that.value2 = [];
      that.tableData2 = [];
      that.examGroupItemResultDtoList = [];
      that.disabled = true;
      http.queryExam(that.ruleForm).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.companyCode = response.data.data.companyCode;
          that.companyGroupCode = response.data.data.companyGroupCode;
          that.orderNo = response.data.data.orderNo;
          for (let i = 0; i < response.data.data.examGroupItemResultDtoList.length; i++) {
            that.value2.push(response.data.data.examGroupItemResultDtoList[i].code);
            for (let j = 0; j < that.data2.length; j++) {
              if (response.data.data.examGroupItemResultDtoList[i].code === that.data2[j].key) {
                that.data2[j].disabled = true;
              }
            }
          }
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 选择组合项目
    changeProjects (value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
      let that = this;
      that.value2 = value;
      console.log(that.data2);
      if (direction === 'right') {
        for (let i = 0; i < movedKeys.length; i++) {
          for (let j = 0; j < that.data2.length; j++) {
            let obj = {};
            if (movedKeys[i] === that.data2[j].key) {
              obj.name = that.data2[j].label;
              obj.code = that.data2[j].key;
              obj.discount = that.data2[j].discount;
              obj.price = that.data2[j].price;
              obj.realPrice = that.data2[j].realPrice;
              that.examGroupItemResultDtoList.push(obj);
            }
          }
        }
      } else if (direction === 'left') {
        for (let i = 0; i < movedKeys.length; i++) {
          for (let j = 0; j < that.examGroupItemResultDtoList.length; j++) {
            if (movedKeys[i] === that.examGroupItemResultDtoList[j].code) {
              that.examGroupItemResultDtoList.splice(j, 1);
            }
          }
        }
      }
      if (that.examGroupItemResultDtoList.length) {
        that.disabled = false;
      } else {
        that.disabled = true;
      }
      console.log(that.examGroupItemResultDtoList);
      that.tableData2 = that.examGroupItemResultDtoList;
    },
    // 确认
    confirm () {
      let that = this;
      let obj = {};
      obj.companyCode = that.companyCode;
      obj.companyGroupCode = that.companyGroupCode;
      obj.orderNo = that.orderNo;
      obj.examGroupItemResultDtoList = that.examGroupItemResultDtoList;
      http.confirmAddExam(obj).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.$message({
            message: '加项成功',
            type: 'success'
          });
        }
      }).catch(error => {
        console.log(error);
      });

    },
    // 打印收费单
    printSheet () {
      let that = this;
      // http.confirmCharge(that.ruleForm.companyCode, that.ruleForm.groupCode, that.regNo).then(response => {
      //   console.log(response);
      //   if (response.status === 200 && response.data.result === '00000000') {
      //     that.$message({
      //       message: '交费成功',
      //       type: 'success'
      //     });
      window.open(that.web + '/api/receiptInfo/print/' + that.companyCode + '/' + that.companyGroupCode + '?regNo=' + that.orderNo);
      //   }
      // }).catch(error => {
      //   console.log(error);
      // });

    }
  },
  mounted () {
    this.getAllGroup();
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
    width:70%;
    height:75%;
    background:#fff;
    float:left;
  }
  .container .exam{
    width:29%;
    height:75%;
    float:right;
  }
  .container .exam .exams{
    width:100%;
    height:100%;
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
  >>>.el-transfer{
    width:100%;
    height:90%;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  >>>.el-transfer-panel{
    width:35%;
    height:100%;
    margin-top:0;
  }
  >>>.el-transfer-panel__body{
    height:90%;
  }
  >>>.el-transfer-panel__list.is-filterable{
    height:90%;
  }
</style>

<style scoped>
  >>> .el-input{
    width:90%;
  }
</style>
