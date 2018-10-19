<!--总检医生诊台-->
<template>
  <div class="container">
    <div class="div1">
      <div class="info">
        <el-row>
          <el-col>
            <p class="title">人员信息</p>
          </el-col>
        </el-row>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" class="demo-ruleForm">
          <el-row :gutter="10">
            <el-col :span="4">
              <el-form-item label="体检编号" prop="examCode">
                <el-input v-model="ruleForm.examCode" placeholder="请输入体检编号" @keyup.enter.native="getInfo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="体检次数" prop="examTimes">
                <el-input v-model="ruleForm.examTimes" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="流水号" prop="orderNo">
                <el-input v-model="ruleForm.orderNo" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="性别" prop="sex">
                <el-select v-model="ruleForm.sex" disabled>
                  <el-option
                    v-for="item in sex"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="年龄" prop="age">
                <el-input v-model="ruleForm.age" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="4">
              <el-form-item label="体检类别" prop="examTypeName">
                <el-input v-model="ruleForm.examTypeName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="单位名称" prop="companyName">
                <el-input v-model="ruleForm.companyName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="总检医生" prop="doctor">
                <el-input v-model="form.doctor"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="操作员" prop="operator">
                <el-input v-model="form.operator"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="总检日期" prop="date">
                <el-date-picker
                  v-model="form.date"
                  type="date"
                  disabled>
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item>
                <el-button size="small" type="primary">保存</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="div2">
      <div class="left">
          <el-row>
            <el-col>
              <p class="title">综述</p>
            </el-col>
          </el-row>
          <el-input type="textarea" v-model="review" :rows="5" style="width:98%;margin:0 auto;"></el-input>
      </div>
      <div class="right">
        <el-row>
          <el-col>
            <p class="title">建议</p>
          </el-col>
        </el-row>
        <el-input type="textarea" :rows="5" v-model="suggest" style="width:98%;margin:0 auto;margin-bottom:3%;"></el-input>
      </div>
    </div>
    <div class="div3">
      <div class="left">
        <el-row>
          <el-col>
            <p class="title">诊断记录表</p>
          </el-col>
        </el-row>
        <el-table
          :data="tableData"
          border
          height="80%"
          style="width:98%;margin:0 auto;">
          <el-table-column
            label="序号"
            width="100"
            type="index"
            align="left">
          </el-table-column>
          <el-table-column
            label="科室"
            prop="office"
            width="200"
            align="left">
          </el-table-column>
          <el-table-column
            label="疾病诊断"
            prop="diagnosis"
            width="500"
            align="left">
          </el-table-column>
          <el-table-column
            label="检查医生"
            prop="doctor"
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
  name: "generalExamination",
  data () {
    return {
      ruleForm: {
        examCode: '', // 体检编号
        examTimes: '', // 体检次数
        orderNo: '', // 流水号
        name: '', // 姓名
        sex: '', // 性别
        age: '', // 年龄
        examType: '', // 体检类别
        examTypeName: '', // 体检类别名称
        personnelType: '', // 人员类别
        companyName: '' // 单位名称
      },
      form: {
        doctor: '',
        date: '',
        operator: ''
      },
      rules: {
        examCode: [
          {required: true, message: '请输入体检编号', trigger: 'blur'}
        ]
      },
      suggest: '',
      review: '',
      tableData: [],
      sex: [
        {id: 1, value: '男'},
        {id: 2, value: '女'},
        {id: 0, value: '所有'}
      ]
    }
  },
  methods: {
    getInfo () {
      let that = this;
      http.checkoutInfo(that.ruleForm.examCode).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          let res = response.data.data;
          that.ruleForm.examTimes = res.examTimes;
          that.ruleForm.orderNo = res.orderNo;
          that.ruleForm.name = res.name;
          that.ruleForm.sex = res.sex;
          that.ruleForm.age = res.age;
          that.ruleForm.examTypeName = res.examTypeName;
          that.ruleForm.companyName = res.companyName;
          that.review = res.review;
          that.suggest = res.suggest;
          that.tableData = res.examResultTypeList;
        }
      }).catch(error => {
        console.log(error);
      });
    }
  },
  mounted () {
    let date = new Date();
    this.form.date = date;
  }
}
</script>

<style scoped>
  .container{
    width:100%;
    height:92%;
    overflow:auto;
  }
  .container .title{
    font-size:12px;
    font-weight:bold;
    text-indent:20px;
    text-align:left;
  }
  .container .div1{
    width:100%;
    height:25%;
    margin-bottom:1%;
  }
  .container .div1 .info{
    width:100%;
    height:100%;
    background:#fff;
    float:left;
  }
  .container .div1 .info .demo-ruleForm{
    width: 100%;
    height:80%;
    overflow:hidden;
    overflow-y:auto;
  }
  .container .div1 .buttons{
    width:29%;
    height:100%;
    float:right;
    background:#fff;
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content: space-around;
  }
  .container .div1 .buttons .el-button{
    width:100px;
  }
  .el-table{
    font-size:12px;
  }
  .container .div2{
    width:100%;
    height:30%;
    margin-bottom:1%;
  }
  .container .div2 .left{
    width:50%;
    height:100%;
    background:#fff;
    float:left;
    margin-right:1%;
  }
  .container .div2 .right{
    width:49%;
    height:100%;
    float:left;
  }
  .container .div3{
    width:100%;
    height:40%;
  }
  .container .div3 .left{
    width:100%;
    height:100%;
    float:left;
  }
  .container .div3 .right{
    width:49%;
    float:right;
    height:100%;
    padding-top:2%;
  }
  .el-date-editor{
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
