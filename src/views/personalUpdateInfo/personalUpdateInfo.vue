<!--单个人员信息修改-->
<template>
    <div class="container">
      <div class="status">
        <el-row>
          <el-col :span="24">
            <p class="title">体检状态</p>
          </el-col>
          <el-form :model="form" ref="form" :rules="rules" label-width="0px" class="demo-form">
            <el-row>
              <el-col :span="24">
                <el-form-item prop="form.status">
                  <el-radio-group v-model="form.status">
                    <el-radio
                      v-for="item in status"
                      :key="item.id"
                      :label="item.id">
                      {{item.value}}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-row>
      </div>
      <div class="buttons">
        <el-row type="flex" justify="space-around" style="height:100%;align-items: center;">
          <el-col span="6">
            <el-button type="primary" size="small">查询</el-button>
          </el-col>
          <el-col span="6">
            <el-button type="success" size="small">保存</el-button>
          </el-col>
          <el-col span="6">
            <el-button type="warning" size="small">修改</el-button>
          </el-col>
          <el-col span="6">
            <el-button type="danger" size="small">删除</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="list">
        <el-row>
          <el-col :span="24">
            <p class="title">人员名单</p>
          </el-col>
        </el-row>
        <el-table
          ref="multipleTable"
          :data="tableData"
          border
          height="90%"
          style="width:98%;margin:0 auto;">
          <el-table-column
            type="selection"
            width="60"
            align="left"
          >
          </el-table-column>
          <el-table-column
            label="登记流水号"
            prop="serialNumber"
            width="160"
            align="left"
          >
          </el-table-column>
          <el-table-column
            label="状态"
            prop="status"
            width="120"
            align="left">
          </el-table-column>
          <el-table-column
            label="体检号"
            prop="examNumber"
            width="120"
            align="left">
          </el-table-column>
          <el-table-column
            label="次数"
            prop="number"
            width="100"
            align="left">
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="name"
            width="100"
            align="left">
          </el-table-column>
          <el-table-column
            label="性别"
            prop="sex"
            width="100"
            align="left">
          </el-table-column>
          <el-table-column
            label="年龄"
            prop="age"
            width="100"
            align="left">
          </el-table-column>
        </el-table>
      </div>
      <div class="info">
        <el-row>
          <el-col>
            <p class="title">人员信息</p>
          </el-col>
        </el-row>
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          rules="rules"
          label-width="100px">
          <el-row>
            <el-col>
              <el-form-item label="单位" prop="company">
                <el-input v-model="ruleForm.company" placeholder="请输入单位"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别" prop="sex">
                <el-select v-model="ruleForm.sex">
                  <el-option
                    v-for="item in sex"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="年龄" prop="age">
                <el-input-number v-model="ruleForm.age" controls-position="right" :min="1" :max="120">
                </el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出生日期" prop="birthday">
                <el-date-picker
                  type="date"
                  v-model="ruleForm.birthday"
                  placeholder="请选择出生日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="身份证号" prop="IDcard">
                <el-input v-model="ruleForm.IDcard" placeholder="请输入身份证号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="婚姻状况" prop="maritalStatus">
                <el-select v-model="ruleForm.maritalStatus">
                  <el-option
                    v-for="item in maritalStatus"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="联系电话" prop="phone">
                <el-input v-model="ruleForm.phone" placeholder="请输入联系电话"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="业务类型" prop="businessType">
                <el-input v-model="ruleForm.businessType" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="手机号码" prop="mobile">
                <el-input v-model="ruleForm.mobile" placeholder="请输入手机号码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="体检类别" prop="examCategory">
                <el-select v-model="ruleForm.examCategory">
                  <el-option
                    v-for="item in examCategory"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="单位分组" prop="companyGroup">
                <el-input v-model="ruleForm.companyGroup" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="人员类别" prop="personCategory">
                <el-select v-model="ruleForm.personCategory">
                  <el-option
                    v-for="item in personCategory"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="民族" prop="national">
                <el-select v-model="ruleForm.national">
                  <el-option
                    v-for="item in national"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="是否VIP" prop="vip">
                <el-checkbox v-model="ruleForm.vip"></el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="介绍人" prop="references">
                <el-input v-model="ruleForm.references" placeholder="请输入介绍人"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="联系地址" prop="address">
                <el-input v-model="ruleForm.address" placeholder="请输入联系地址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
</template>

<script>
export default {
  name: "personalUpdateInfo",
  data () {
    return {
      form: {
        status: ''
      },
      ruleForm: {
        company: '',
        name: '',
        sex: '',
        age: '',
        birthday: '',
        IDcard: '',
        maritalStatus: '',
        phone: '',
        businessType: '',
        mobile: '',
        examCategory: '',
        companyGroup: '',
        personCategory: '',
        national: '',
        vip: ''
      },
      status: [
        {id: 0, value: '未检'},
        {id: 1, value: '部分已检'},
        {id: 2, value: '全部'},
        {id: 3, value: '总检'},
        {id: 4, value: '待总检'}
      ],
      maritalStatus: [
        {id: 0, value: '未婚'},
        {id: 1, value: '已婚'}
      ],
      examCategory: [
        {id: 0, value: '招工'},
        {id: 1, value: '入职'}
      ],
      national: [
        {id: 0, value: '汉族'},
        {id: 1, value: '满族'},
        {id: 2, value: '回族'},
        {id: 3, value: '壮族'}
      ]
    }
  }
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:hidden;
  }
  .container .status{
    width:40%;
    height:15%;
    background:#fff;
    float:left;
    margin-bottom:2%;
  }
  .container .buttons{
    width:58%;
    height:15%;
    background:#fff;
    float:right;
    margin-bottom:2%;
  }
  .container .list{
    width:40%;
    height:73%;
    background:#fff;
    float:left;
  }
  .container .info{
    width:58%;
    height:73%;
    background:#fff;
    float:right;
  }
  .container .title{
    font-weight:bold;
    font-size:12px;
    text-align:left;
    text-indent:20px;
  }
  .el-form{
    padding-right:5%;
    height:90%;
    overflow:auto;
    overflow-x:hidden;
  }
  .el-select{
    width:100%;
  }
  .el-date-editor{
    width:100%;
  }
  .el-input-number{
    width:100%;
  }
</style>
<style>
  @import '../../styles/common.css';
</style>
