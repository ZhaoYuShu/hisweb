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
              <el-form-item label="——" prop="endCard">
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
        </el-form>
      </div>
      <div class="buttons">
        <el-row type="flex" justify="space-around" style="align-items:center;width:100%;height:50%;">
          <el-button type="primary" size="small">查询</el-button>
          <el-button type="primary" size="small">打印指引单</el-button>
        </el-row>
        <el-row type="flex" justify="space-around" style="align-items:center;width:100%;height:50%;">
          <el-button type="primary" size="small">批量打印</el-button>
          <el-button type="primary" size="small">保存</el-button>
        </el-row>
      </div>
    </div>
    <div class="div2">
      <div class="adjust">
        <el-row>
          <el-col>
            <p class="title">需要调整的项目</p>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-around" style="width:100%;height:30%;align-items:center;">
          <el-col :span="16">
            <el-select v-model="adjustProject" placeholder="请选择需要调整的项目">
              <el-option
                v-for="item in projects"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" size="small">确定</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <p class="title">已选套餐</p>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="align-items: center;width:100%;height:30%;">
          <el-col :span="20">
            <el-input v-model="package2" disabled></el-input>
          </el-col>
        </el-row>
      </div>
      <div class="package">
        <el-row>
          <el-col>
            <p class="title">未选套餐</p>
          </el-col>
        </el-row>
        <el-table
          :data="tableData1"
          border
          height="80%"
          style="width:98%;margin:0 auto;">
          <el-table-column
            label="套餐"
            prop="package">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="div3">
      <el-row>
        <el-col>
          <p class="title">人员信息列表</p>
        </el-col>
      </el-row>
      <el-table
        :data="tableData2"
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
          width="150"
          align="left">
        </el-table-column>
        <el-table-column
          label="总检日期"
          prop="checkDate"
          width="150"
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
          width="150"
          align="left">
        </el-table-column>
        <el-table-column
          label="分组名称"
          prop="groupName"
          width="120"
          align="left">
        </el-table-column>
      </el-table>
    </div>
    <div class="div4">
      <div class="original">
        <el-row>
          <el-col>
            <p class="title">原始项目</p>
          </el-col>
        </el-row>
        <el-table
          :data="tableData3"
          border
          height="80%"
          style="width:98%;margin:0 auto;">
          <el-table-column
            label="原始项目"
            prop="project"
            align="left">
          </el-table-column>
        </el-table>
      </div>
      <div class="add">
        <el-row>
          <el-col>
            <p class="title">添加项目</p>
          </el-col>
        </el-row>
        <el-table
          :data="tableData4"
          border
          height="80%"
          style="width:98%;margin:0 auto;">
          <el-table-column
            label="添加项目"
            prop="project"
            align="left">
          </el-table-column>
        </el-table>
      </div>
      <div class="delete">
        <el-row>
          <el-col>
            <p class="title">删除项目</p>
          </el-col>
        </el-row>
        <el-table
          :data="tableData5"
          border
          height="80%"
          style="width:98%;margin:0 auto;">
          <el-table-column
            label="删除项目"
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
  name: "adjustProjectBatchForm",
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
        examCode2: ''
      },
      rules: {},
      sex: [
        {id: 1, value: '男'},
        {id: 2, value: '女'},
        {id: 0, value: '所有'}
      ],
      adjustProject: '',
      projects: [],
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      tableData5: []
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
    float:left;
    background:#fff;
  }
  .rightForm .div1 .query .demo-ruleForm{
    width:100%;
    height:80%;
    overflow-y:auto;
  }
  .rightForm .div1 .buttons{
    width:29%;
    height:100%;
    float:right;
    background:#fff;
  }
  .rightForm .div1 .buttons .el-button{
    width:90px;
  }
  .rightForm .div2{
    width:100%;
    height:40%;
    margin-bottom:1%;
  }
  .rightForm .div2 .adjust{
    width:70%;
    height:100%;
    background:#fff;
    float:left;
    margin-right:1%;
  }
  .rightForm .div2 .package{
    width:29%;
    height:100%;
    background:#fff;
    float:left;
  }
  .rightForm .div3{
    width:100%;
    height:50%;
    margin-bottom:1%;
    background:#fff;
  }
  .rightForm .div4{
    width:100%;
    height:50%;
  }
  .rightForm .div4 .original{
    width:33%;
    height:100%;
    float:left;
    margin-right:1%;
    background:#fff;
  }
  .rightForm .div4 .add{
    width:32%;
    height:100%;
    float:left;
    margin-right:1%;
    background:#fff;
  }
  .rightForm .div4 .delete{
    width:33%;
    height:100%;
    float:left;
    background:#fff;
  }
</style>
<style>
  @import '../../styles/common.css';
</style>
