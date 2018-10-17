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
            <el-col :span="8">
              <el-form-item label="体检编号" prop="examCode">
                <el-input v-model="ruleForm.examCode" placeholder="请输入体检编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="体检次数" prop="examTimes">
                <el-input v-model="ruleForm.examTimes" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="流水号" prop="serialNumber">
                <el-input v-model="ruleForm.serialNumber" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="性别" prop="sex">
                <el-input v-model="ruleForm.sex" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="年龄" prop="age">
                <el-input v-model="ruleForm.age" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="体检类别" prop="examType">
                <el-input v-model="ruleForm.examType" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="人员类别" prop="personnelType">
                <el-input v-model="ruleForm.personnelType" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单位名称" prop="companyName">
                <el-input v-model="ruleForm.companyName" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="buttons">
        <el-row>
          <el-button type="primary" size="small">保存总检</el-button>
          <el-button type="primary" size="small">取消总检</el-button>
        </el-row>
        <el-row>
          <el-button type="primary" size="small">修改</el-button>
          <el-button type="primary" size="small">重置</el-button>
        </el-row>
      </div>
    </div>
    <div class="div2">
      <div class="left">
          <el-row>
            <el-col>
              <p class="title">综述</p>
            </el-col>
          </el-row>
          <el-input type="textarea" v-model="summary" :rows="5" style="width:98%;margin:0 auto;"></el-input>
      </div>
      <div class="right">
        <el-row>
          <el-col>
            <p class="title">建议</p>
          </el-col>
        </el-row>
        <el-input type="textarea" :rows="5" v-model="advice" style="width:98%;margin:0 auto;margin-bottom:3%;"></el-input>
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
            width="60"
            type="index"
            align="left">
          </el-table-column>
          <el-table-column
            label="科室"
            prop="office"
            width="150"
            align="left">
          </el-table-column>
          <el-table-column
            label="疾病诊断"
            prop="diagnosis"
            width="300"
            align="left">
          </el-table-column>
          <el-table-column
            label="检查医生"
            prop="doctor"
            align="left">
          </el-table-column>
        </el-table>
      </div>
      <div class="right">
        <el-form ref="form" :model="form" label-width="80px" class="demo-form">
          <el-row :gutter="10" style="display:flex;align-items:center;padding-top:10px;">
            <el-col :span="12">
              <el-form-item label="总检医生" prop="doctor">
                <el-input v-model="form.doctor" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="总检日期" prop="date">
                <el-date-picker
                  v-model="form.date"
                  type="date"
                  disabled>
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>

          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="操作员" prop="operator">
                <el-input v-model="form.operator" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "generalExamination",
  data () {
    return {
      ruleForm: {
        examCode: '', // 体检编号
        examTimes: '', // 体检次数
        serialNumber: '', // 流水号
        name: '', // 姓名
        sex: '', // 性别
        age: '', // 年龄
        examType: '', // 体检类别
        personnelType: '', // 人员类别
        companyName: '' // 单位名称
      },
      form: {
        doctor: ''
      },
      rules: {
        examCode: [
          {required: true, message: '请输入体检编号', trigger: 'blur'}
        ]
      },
      advice: '',
      summary: ''
    }
  },
  methods: {},
  mounted () {
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
    width:70%;
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
    width:50%;
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
<style>
  .el-table td, .el-table th{
    padding:0.8vh 0;
  }
  .el-form-item__label{
    font-size:12px;
  }
  .el-input__inner{
    height:35px;
    line-height:35px;
  }
</style>
