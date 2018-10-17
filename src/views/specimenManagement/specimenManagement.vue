<!--标本登记-->
<template>
    <div class="container">
      <div class="left">
        <el-row>
          <el-col :span="24">
            <p class="title">条码号搜索</p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <p class="label">登记流水号</p>
          </el-col>
          <el-col :span="16">
            <el-input v-model="serialNumber"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <p class="title">需留标本人员</p>
          </el-col>
        </el-row>
        <el-table
          :data="tableData"
          border
          height="75%"
          style="width:98%;margin:0 auto;">
          <el-table-column
            type="selection"
            width="60"
            align="left">
          </el-table-column>
          <el-table-column
            label="登记编号"
            prop="registrationNumber"
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
            width="80"
            align="left">
          </el-table-column>
          <el-table-column
            label="出生日期"
            prop="birthday"
            width="100"
            align="left">
          </el-table-column>
          <el-table-column
            label="身份证号"
            prop="IDcard"
            width="200"
            align="left">
          </el-table-column>
        </el-table>
      </div>
      <div class="right">
        <div class="buttons">
          <el-row type="flex" justify="space-around" style="height:100%;align-items:center;">
            <el-col :span="6">
              <el-button type="primary" size="small">查询</el-button>
            </el-col>
            <el-col :span="6">
              <el-button type="danger" size="small">删除登记</el-button>
            </el-col>
            <el-col :span="6">
              <el-button type="success" size="small">确定</el-button>
            </el-col>
            <el-col :span="6">
              <el-button type="warning" size="small">打印名单</el-button>
            </el-col>
          </el-row>
        </div>
        <el-row>
          <el-col :span="24">
            <p class="title">体检项目及标本类型</p>
          </el-col>
        </el-row>
        <el-table
          :data="tableData2"
          border
          height="80%"
          style="width:98%;margin:0 auto;">
          <el-table-column
            label="抽血序号"
            prop="bloodNumber"
            width="100"
            align="left">
          </el-table-column>
          <el-table-column
            label="体检项目名称"
            prop="examName"
            width="300"
            align="left">
          </el-table-column>
          <el-table-column
            label="标本类型"
            prop="sampleType"
            width="100"
            align="left">
          </el-table-column>
          <el-table-column
            label="分类名称"
            prop="categoryName"
            width="200"
            align="left">
          </el-table-column>
          <el-table-column
            label="留标本"
            prop="sample"
            width="100">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.sample"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            label="样本编号"
            prop="sampleNumber"
            width="200"
            align="left">
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
export default {
  name: "specimenManagement",
  data () {
    return {
      serialNumber: ''
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
    height:92%;
    float:left;
    background:#fff;
  }
  .container .title{
    font-size:12px;
    font-weight:bold;
    text-align:left;
    text-indent:20px;
  }
  .container .left .label{
    font-size:14px;
    text-indent:10px;
  }
  .container .right{
    width:58%;
    height:92%;
    float:right;
    background:#fff;
  }
  .container .right .buttons{
    width:100%;
    height:10%;
    border-bottom:1px solid #ccc;
  }
</style>
<style>
  @import '../../styles/common.css';
</style>
