<template>
    <div class="rightForm">
      <div class="div1">
        <div class="query">
          <el-row>
            <el-col>
              <p class="title">查询条件</p>
            </el-col>
          </el-row>
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
            <el-row :gutter="20">
              <el-col :span="11">
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="性别" prop="sex">
                  <el-select v-model="ruleForm.sex" placeholder="请选择性别">
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
              <el-col :span="11">
                <el-form-item label="登记日期" prop="startDate">
                  <el-date-picker
                    v-model="ruleForm.startDate"
                    type="date"
                    placeholder="请选择登记日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="——" prop="endDate">
                  <el-date-picker
                    v-model="ruleForm.endDate"
                    type="date"
                    placeholder="请选择登记日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="11">
                <el-form-item label="索引卡号" prop="startCard">
                  <el-input v-model="ruleForm.startCard" placeholder="请输入索引卡号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="至" prop="endDate">
                  <el-input v-model="ruleForm.endCard" placeholder="请输入索引卡号"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="11">
                <el-form-item label="体检编号" prop="examCode1">
                  <el-input v-model="ruleForm.examCode1" placeholder="请输入体检编号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="——" prop="examCode2">
                  <el-input v-model="ruleForm.examCode2" placeholder="请输入体检编号"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="11">
                <el-form-item label="分组名称" prop="groupName">
                  <el-select v-model="ruleForm.groupName">
                    <el-option
                      v-for="item in groupName"
                      :key="item.id"
                      :label="item.value"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="buttons">
          <el-row type="flex" justify="space-around" style="width:100%;height:50%;align-items:center;">
            <el-button type="primary" size="small">查询</el-button>
            <el-button type="primary" size="small">批量打印</el-button>
          </el-row>
          <el-row type="flex" justify="space-around" style="width:100%;height:50%;align-items:center;">
            <el-button type="primary" size="small">打印指引单</el-button>
            <el-button type="primary" size="small">换分组</el-button>
          </el-row>
        </div>
      </div>
      <div class="div2">
        <el-row>
          <el-col>
            <p class="title">新分组名称</p>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="20">
            <el-select v-model="ruleForm.newGroup" placeholder="请选择新分组名称">
              <el-option
                v-for="item in groups"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div class="div3">
        <div class="info">
          <el-row>
            <el-col>
              <p class="title">人员信息列表</p>
            </el-col>
          </el-row>
          <el-table
            :data="tableData1"
            border
            height="80%"
            style="width:98%;margin:0 auto;">
            <el-table-column
              type="selection"
              width="60">
            </el-table-column>
            <el-table-column
              label="体检日期"
              prop="examDate"
              width="200"
              align="left">
            </el-table-column>
            <el-table-column
              label="总检日期"
              prop="checkDate"
              width="200"
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
            <el-table-column
              label="体检编号"
              prop="examCode"
              width="200"
              align="left">
            </el-table-column>
            <el-table-column
              label="分组名称"
              prop="groupName"
              width="200"
              align="left">
            </el-table-column>
            <el-table-column
              label="身份证号"
              prop="personnelCode"
              width="200"
              align="left">
            </el-table-column>
          </el-table>
        </div>
        <div class="project">
          <el-row>
            <el-col>
              <p class="title">项目列表</p>
            </el-col>
          </el-row>
          <el-table
            :data="tableData2"
            border
            height="80%"
            style="width:98%;margin:0 auto;">
            <el-table-column
              label="体检项目"
              prop="project"
              align="left">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "groupAdjustmentForm",
  data () {
    return {
      ruleForm: {
        name: '',
        sex: '',
        startDate: '',
        endDate: '',
        startCard: '',
        endCard: '',
        examCode1: '',
        examCode2: '',
        groupName: ''
      },
      rules: {},
      sex: [
        {id: 1, value: '男'},
        {id: 2, value: '女'},
        {id: 3, value: '所有'}
      ],
      newGroup: '',
      groups: [],
      tableData1: [],
      tableData2: []
    }
  }
}
</script>

<style scoped>
  .rightForm{
    width:83%;
    height:92%;
    float:right;
    overflow:auto;
  }
  .rightForm .title{
    font-size:12px;
    font-weight:bold;
    text-align:left;
    text-indent:20px;
  }
  .rightForm .div1{
    width:100%;
    height:30%;
    margin-bottom:1%;
  }
  .rightForm .div1 .query{
    width:70%;
    height:100%;
    background:#fff;
    float:left;
    margin-right:1%;
  }
  .rightForm .div1 .query .demo-ruleForm{
    width:100%;
    height:80%;
    overflow-y:auto;
  }
  .rightForm .div1 .buttons{
    width:29%;
    height:100%;
    background:#fff;
    float:left;
  }
  .rightForm .div1 .buttons .el-button{
    width:90px;
  }
  .rightForm .div2{
    width:100%;
    height:15%;
    background:#fff;
    margin-bottom:1%;
  }
  .rightForm .div3{
    width:100%;
    height:52%;
  }
  .rightForm .div3 .info{
    width:70%;
    height:100%;
    margin-right:1%;
    float:left;
    background:#fff;
  }
  .rightForm .div3 .project{
    width:29%;
    height:100%;
    float:left;
    background:#fff;
  }
  .el-select{
    width:100%;
  }
  .el-date-editor{
    width:100%;
  }
  .el-table{
    font-size:12px;
  }
</style>
<style>
 @import '../../styles/common2.css';
</style>
