<template>
    <div class="rightForm">
      <div class="top">
        <el-row>
          <el-col :span="24">
            <p class="title">查询条件</p>
          </el-col>
        </el-row>
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          class="demo-ruleForm"
          label-width="100px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="登记日期" prop="registrationDate">
                <el-date-picker
                  v-model="ruleForm.startDate"
                  placeholder="请选择开始日期"
                  type="date"></el-date-picker>
                ——
                <el-date-picker
                  v-model="ruleForm.endDate"
                  placeholder="请选择结束日期"
                  type="date"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
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
            <el-col :span="16">
              <el-form-item label="体检编号/登记流水号" prop="codeNumber">
                <el-input v-model="ruleForm.code" class="code" placeholder="请输入体检编号"></el-input>
                ——
                <el-input v-model="ruleForm.number" class="number" placeholder="请输入登记流水号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="分组名称" prop="group">
                <el-input v-model="ruleForm.group" placeholder="请输入分组名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="索引卡号" prop="indexNumber">
                <el-input v-model="indexNumberStart" placeholder="请输入索引卡号" class="indexNumberStart"></el-input>
                ——
                <el-input v-model="indexNumberEnd" placeholder="请输入索引卡号" class="indexNumberEnd"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="options">
          <el-row>
            <el-col :span="24">
              <el-button type="primary" size="medium">查询</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-button type="primary" size="medium">检后服务</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-button type="primary" size="medium">健康评估</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-button type="primary" size="medium">照相</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-button type="primary" size="medium">打印指引单</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="bottom">
        <el-row>
          <el-col :span="24">
            <p class="title">查询结果</p>
          </el-col>
        </el-row>
        <el-table
          ref="multipleTable"
          :data="tableData"
          border
          height="80%"
          style="width:98%;margin:0 auto;"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55"
            align="left">
          </el-table-column>
          <el-table-column
            prop="examDate"
            label="体检日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="checkDate"
            label="总检日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="100">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            width="100">
          </el-table-column>
          <el-table-column
            prop="age"
            label="年龄"
            width="100">
          </el-table-column>
          <el-table-column
            prop="code"
            label="体检编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="group"
            label="分组名称"
            width="180">
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
export default {
  name: "serviceRegistrationForm",
  data () {
    return {
      ruleForm: {
        name: '',
        startDate: '',
        endDate: '',
        sex: '',
        code: '',
        number: '',
        group: '',
        indexNumberStart: '',
        indexNumberEnd: ''
      },
      sex: [
        {id: 1, value: '男'},
        {id: 2, value: '女'},
        {id: 0, value: '所有'}
      ]
    }
  }
}
</script>

<style scoped>
  .rightForm{
    width:80%;
    height:90%;
    padding-top:20px;
    background:#fff;
    float:right;
    padding-right:2%;
  }
  .rightForm .top{
    width:100%;
    height:40%;
    margin-bottom:2%;
    overflow:auto;
  }
  .rightForm .bottom{
    width:100%;
    height:58%;
  }
  .rightForm .title{
    text-align:left;
    text-indent:20px;
    font-size:12px;
    font-weight:bold;
  }
  .rightForm .el-form{
    width:80%;
    height:100%;
    border-right:1px solid #ccc;
    float:left;
  }
  .rightForm .options{
    width:18%;
    height:100%;
    float:right;
  }
  .rightForm .code{
    width:40%;
  }
  .rightForm .number{
    width:40%;
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
  .rightForm .options .el-button{
    width:100px;
    margin-bottom:10px;
  }
</style>
