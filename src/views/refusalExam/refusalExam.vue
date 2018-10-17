<!--单位人员拒检登记-->
<template>
    <div class="container">
      <div class="left">
        <el-table
          :data="tableData"
          border
          height="95%"
          style="width:98%;margin:10px auto;">
          <el-table-column
            label="体检编号"
            prop="code"
            width="150"
            align="left">
          </el-table-column>
          <el-table-column
            label="体检次数"
            prop="examNumber"
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
            label="联系电话"
            prop="phone"
            width="150"
            align="left">
          </el-table-column>
        </el-table>
      </div>
      <div class="right">
        <el-row>
          <el-col>
            <p class="title">快速检索(登记流水号或体检编号)</p>
          </el-col>
        </el-row>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="登记流水号" prop="registrationNumber">
                <el-input v-model="ruleForm.registrationNumber" placeholder="请输入登记流水号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='10'>
              <el-button type="primary" size="small">查询</el-button>
              <el-button type="primary" size="small">保存</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-table
          :data="tableData2"
          border
          height="80%"
          style="width:98%;margin:0 auto;">
          <el-table-column
            type="selection"
            width="50">
          </el-table-column>
          <el-table-column
            label="体检项目"
            prop="exam"
            width="200"
            align="left">
          </el-table-column>
          <el-table-column
            label="修改人"
            prop="modifier"
            width="150"
            align="left">
          </el-table-column>
          <el-table-column
            label="修改日期"
            prop="updatedAt"
            align="left">
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
export default {
  name: "refusalExam",
  data () {
    return {
      ruleForm: {
        registrationNumber: ''
      },
      tableData: [],
      tableData2: []
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
  .container .left{
    width:40%;
    height:90%;
    float:left;
    overflow:hidden;
    background:#fff;
  }
  .container .right{
    width:58%;
    height:90%;
    float:right;
    overflow:hidden;
    background:#fff;
  }
  .title{
    font-size:12px;
    font-weight:bold;
    text-align:left;
    text-indent:20px;
  }
</style>
<style>
  @import '../../styles/common.css';
</style>
