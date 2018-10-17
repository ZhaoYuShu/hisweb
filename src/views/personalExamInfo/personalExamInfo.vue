<!--&lt;!&ndash;个人体检信息&ndash;&gt;-->
<!--<template>-->
    <!--<div class="container">-->
      <!--<div class="package">-->
        <!--<el-row :gutter="20" style="display:flex;align-items:center;">-->
          <!--<el-col :span="">-->
            <!--<p class="title">已选套餐</p>-->
          <!--</el-col>-->
          <!--<el-col :span="14">-->
            <!--<el-input v-model="selectedPackage" placeholder="请选择套餐"></el-input>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-table-->
          <!--height="80%"-->
          <!--:data="tableData"-->
          <!--style="width:96%;margin:0 auto;"-->
          <!--border>-->
          <!--<el-table-column-->
            <!--prop="package"-->
            <!--label="未选套餐"-->
            <!--align="left">-->
          <!--</el-table-column>-->
        <!--</el-table>-->
      <!--</div>-->
      <!--<div class="exam">-->
        <!--<el-row type="flex" justify="space-around" style="height:100%;">-->
          <!--<el-col :span="6">-->
            <!--<el-table-->
              <!--:data="tableData2"-->
              <!--border-->
              <!--height="95%">-->
              <!--<el-table-column-->
                <!--label="未选项目"-->
                <!--prop="package">-->
              <!--</el-table-column>-->
            <!--</el-table>-->
          <!--</el-col>-->
          <!--<el-col :span="16">-->
            <!--<el-table-->
              <!--:data="tableData3"-->
              <!--border-->
              <!--height="95%">-->
              <!--<el-table-column-->
                <!--label="类型"-->
                <!--prop="type"-->
                <!--width="100"-->
                <!--align="left">-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--label="体检项目"-->
                <!--prop="exam"-->
                <!--width="200"-->
                <!--align="left">-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--label="标准单价"-->
                <!--prop="standardPrice"-->
                <!--width="100"-->
                <!--align="left">-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--label="实收单价"-->
                <!--prop="price"-->
                <!--width="100"-->
                <!--align="left">-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--label="检完否"-->
                <!--prop="finished"-->
                <!--align="left">-->
              <!--</el-table-column>-->
            <!--</el-table>-->
          <!--</el-col>-->
        <!--</el-row>-->
      <!--</div>-->
      <!--<div class="message">-->
        <!--<el-row>-->
          <!--<el-col :span="24">-->
            <!--<p class="title">人员信息</p>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<hr style="width:98%;margin:0 auto;"/>-->
        <!--<el-form-->
          <!--:model="ruleForm"-->
          <!--ref="ruleForm"-->
          <!--:rules="rules"-->
          <!--label-width="100px"-->
          <!--class="demo-ruleForm">-->
          <!--<el-row :gutter="20">-->
            <!--<el-col :span="11">-->
              <!--<el-form-item label="体检编号" prop="code">-->
                <!--<el-input v-model="ruleForm.code" disabled></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="11">-->
              <!--<el-form-item label="体检次数" prop="num">-->
                <!--<el-input v-model="ruleForm.num" disabled></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          <!--</el-row>-->
          <!--<el-row :gutter="20">-->
            <!--<el-col :span="11">-->
              <!--<el-form-item label="人员类别" prop="personCategory">-->
                <!--<el-select v-model="ruleForm.personCategory">-->
                  <!--<el-option-->
                    <!--v-for="item in personCategory"-->
                    <!--:key="item.id"-->
                    <!--:label="item.value"-->
                    <!--:value="item.id">-->
                  <!--</el-option>-->
                <!--</el-select>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="11">-->
              <!--<el-form-item label="体检类别" prop="examCategory">-->
                <!--<el-select v-model="ruleForm.examCategory">-->
                  <!--<el-option-->
                    <!--v-for="item in examCategory"-->
                    <!--:key="item.id"-->
                    <!--:label="item.value"-->
                    <!--:value="item.id">-->
                  <!--</el-option>-->
                <!--</el-select>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          <!--</el-row>-->
          <!--<el-row :gutter="20">-->
            <!--<el-col :span="11">-->
              <!--<el-form-item label="姓名" prop="name">-->
                <!--<el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="11">-->
              <!--<el-form-item label="性别" prop="sex">-->
                <!--<el-select v-model="ruleForm.sex">-->
                  <!--<el-option-->
                    <!--v-for="item in sex"-->
                    <!--:key="item.id"-->
                    <!--:label="item.value"-->
                    <!--:value="item.id">-->
                  <!--</el-option>-->
                <!--</el-select>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          <!--</el-row>-->
          <!--<el-row :gutter="20">-->
            <!--<el-col :span="11">-->
              <!--<el-form-item label="年龄" prop="age">-->
                <!--<el-input v-model="ruleForm.age" placeholder="请输入年龄"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="11">-->
              <!--<el-form-item label="出生日期" prop="birthday">-->
                <!--<el-date-picker-->
                  <!--v-model="ruleForm.birthday"-->
                  <!--type="date"-->
                  <!--placeholder="请选择出生日期">-->
                <!--</el-date-picker>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          <!--</el-row>-->
          <!--<el-row :gutter="20">-->
            <!--<el-col :span="11">-->
              <!--<el-form-item label="联系电话" prop="phone">-->
                <!--<el-input v-model="ruleForm.phone" placeholder="请输入联系电话"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="11">-->
              <!--<el-form-item label="介绍人" prop="references">-->
                <!--<el-input v-model="ruleForm.references" placeholder="请输入介绍人"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          <!--</el-row>-->
          <!--<el-row :gutter="20">-->
            <!--<el-col :span="11">-->
              <!--<el-form-item label="婚姻状况" prop="maritalStatus">-->
                <!--<el-select v-model="ruleForm.maritalStatus" placeholder="请选择婚姻状况">-->
                  <!--<el-option-->
                    <!--v-for="item in maritalStatus"-->
                    <!--:key="item.id"-->
                    <!--:label="item.value"-->
                    <!--:value="item.id">-->
                  <!--</el-option>-->
                <!--</el-select>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="11">-->
              <!--<el-form-item label="地址" prop="address">-->
                <!--<el-input v-model="ruleForm.address" placeholder="请输入地址"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          <!--</el-row>-->
          <!--<el-row :gutter="20">-->
            <!--<el-col :span="11">-->
              <!--<el-form-item label="身份证号" prop="IDcard">-->
                <!--<el-input v-model="ruleForm.IDcard" placeholder="请输入身份证号"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="11">-->
              <!--<el-form-item label="是否医保" prop="medicalInsurance">-->
                <!--<el-select v-model="ruleForm.medicalInsurance">-->
                  <!--<el-option-->
                    <!--v-for="item in medicalInsurance"-->
                    <!--:key="item.id"-->
                    <!--:label="item.value"-->
                    <!--:value="item.id">-->
                  <!--</el-option>-->
                <!--</el-select>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          <!--</el-row>-->
          <!--<el-row :gutter="20">-->
            <!--<el-col :span="11">-->
              <!--<el-form-item label="折扣率" prop="discount">-->
                <!--<el-input v-model="ruleForm.discount" placeholder="请输入折扣率"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="11">-->
              <!--<el-form-item label="实收金额" prop="money">-->
                <!--<el-input v-model="ruleForm.money" placeholder="请输入实收金额"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          <!--</el-row>-->
        <!--</el-form>-->
      <!--</div>-->
      <!--<div class="buttons">-->
        <!--<el-row type="flex" justify="space-around">-->
          <!--<el-col :span="8">-->
            <!--<el-button type="primary" size="small">查询</el-button>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<el-button type="primary" size="small">检后服务</el-button>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row type="flex" justify="space-around">-->
          <!--<el-col :span="8">-->
            <!--<el-button type="primary" size="small">删除项目</el-button>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<el-button type="primary" size="small">保存</el-button>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row type="flex" justify="space-around">-->
          <!--<el-col :span="8">-->
            <!--<el-button type="primary" size="small">健康评估</el-button>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<el-button type="primary" size="small">删除登记</el-button>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row type="flex" justify="space-around">-->
          <!--<el-col :span="8">-->
            <!--<el-button type="primary" size="small">收费申请单</el-button>-->
          <!--</el-col>-->
          <!--<el-col :span="8"></el-col>-->
        <!--</el-row>-->
      <!--</div>-->
    <!--</div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
  <!--name: "personalExamInfo",-->
  <!--data () {-->
    <!--return {-->
      <!--tableData: [-->
        <!--{package: '套餐1'},-->
        <!--{package: '套餐2'},-->
        <!--{package: '套餐3'},-->
        <!--{package: '套餐4'},-->
        <!--{package: '套餐5'},-->
        <!--{package: '套餐6'},-->
        <!--{package: '套餐7'},-->
        <!--{package: '套餐8'},-->
        <!--{package: '套餐9'},-->
        <!--{package: '套餐10'},-->
        <!--{package: '套餐11'},-->
        <!--{package: '套餐12'},-->
        <!--{package: '套餐13'}-->
      <!--],-->
      <!--tableData2: [],-->
      <!--tableData3: [],-->
      <!--ruleForm: {-->
        <!--code: '',-->
        <!--num: '',-->
        <!--personCategory: '',-->
        <!--examCategory: '',-->
        <!--name: '',-->
        <!--sex: '',-->
        <!--age: '',-->
        <!--birthday: '',-->
        <!--phone: '',-->
        <!--references: '',-->
        <!--maritalStatus: '',-->
        <!--medicalInsurance: ''-->
      <!--},-->
      <!--rules: {},-->
      <!--maritalStatus: [],-->
      <!--personCategory: [-->
        <!--{id: 1, value: '员工'},-->
        <!--{id: 2, value: '公司职员'},-->
        <!--{id: 3, value: '经理'}-->
      <!--],-->
      <!--examCategory: [-->
        <!--{id: 1, value: '招工'},-->
        <!--{id: 2, value: '入职'}-->
      <!--],-->
      <!--medicalInsurance: [-->
        <!--{id: 0, value: '否'},-->
        <!--{id: 1, value: '是'}-->
      <!--]-->
    <!--}-->
  <!--}-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
  <!--.container{-->
    <!--width:100%;-->
    <!--height:100%;-->
    <!--overflow:hidden;-->
  <!--}-->
  <!--.container .package{-->
    <!--width:20%;-->
    <!--height:45%;-->
    <!--background:#fff;-->
    <!--overflow:auto;-->
    <!--overflow-x:hidden;-->
    <!--float:left;-->
    <!--margin-bottom:2%;-->
  <!--}-->
  <!--.container .package .title{-->
    <!--text-align:left;-->
    <!--text-indent:10px;-->
    <!--font-size:12px;-->
  <!--}-->
  <!--.container .exam{-->
    <!--width:75%;-->
    <!--float:right;-->
    <!--height:45%;-->
    <!--background:#fff;-->
    <!--overflow:hidden;-->
    <!--margin-bottom:2%;-->
  <!--}-->
  <!--.container .message{-->
    <!--width:75%;-->
    <!--float:left;-->
    <!--height:43%;-->
    <!--background:#fff;-->
    <!--overflow:hidden;-->
  <!--}-->
  <!--.container .message .title{-->
    <!--font-size:12px;-->
    <!--text-align:left;-->
    <!--text-indent:20px;-->
    <!--font-weight:bold;-->
  <!--}-->
  <!--.container .message .el-form{-->
    <!--width:100%;-->
    <!--height:85%;-->
    <!--overflow:auto;-->
    <!--overflow-x:hidden;-->
    <!--padding-top:20px;-->
  <!--}-->
  <!--.container .buttons{-->
    <!--width:20%;-->
    <!--height:43%;-->
    <!--float:right;-->
    <!--background:#fff;-->
    <!--overflow:auto;-->
    <!--overflow-x:hidden;-->
  <!--}-->
  <!--.el-button{-->
    <!--width:100px;-->
    <!--margin-top:20px;-->
  <!--}-->
  <!--.el-select{-->
    <!--width:100%;-->
  <!--}-->
  <!--.el-date-editor{-->
    <!--width:100%;-->
  <!--}-->
<!--</style>-->
<!--<style>-->
  <!--@import '../../styles/common.css';-->
<!--</style>-->
