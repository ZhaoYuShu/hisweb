<template>
  <div class="rightForm">
    <el-row>
      <el-col :span="24">
        <h5 class="title">函数主档</h5>
      </el-col>
    </el-row>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="名称" prop="name" required>
            <el-input v-model="ruleForm.name" placeholder="请输入名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="描述" prop="description" required>
            <el-input v-model="ruleForm.description" placeholder="请输入描述"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        style="width:96%;margin: 0 auto;"
        border
        height="200">
        <el-table-column
          prop="name"
          label="名称"
          width="200"
          align="left">
        </el-table-column>
        <el-table-column
          prop="referenceCode"
          label="对照码"
          width="200"
          align="left">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          align="left">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <hr style="width:96%;margin:0 auto;margin-top:20px;"/>
      <el-row>
        <el-col :span="24">
          <h5 class="title">函数从档</h5>
        </el-col>
      </el-row>
      <el-table
        :data="tableData2"
        border
        height="300"
        style="width:96%;margin:0 auto;margin-bottom:20px;">
        <el-table-column
          prop="name"
          label="名称"
          width="200"
          align="left">
        </el-table-column>
        <el-table-column
          prop="reference"
          label="参考值"
          width="200"
          align="left">
        </el-table-column>
        <el-table-column
          prop="diagnosis"
          label="对照诊断"
          width="400"
          align="left">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          align="left">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" size="small">增加</el-button>
            <el-button type="success" size="small">保存</el-button>
            <el-button type="danger" size="small">删除</el-button>
            <el-button type="warning" size="small">修改</el-button>
            <el-button type="info" size="small">插入</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "projectFunctionForm",
  data () {
    return {
      ruleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '请输入描述', trigger: 'blur'}
        ]
      },
      tableData: [
        {name: '组合项目', referenceCode: '23425', remark: '你设定为日光'},
        {name: '身高', referenceCode: '3524', remark: '是个人'},
        {name: '体重', referenceCode: '35235', remark: '的给我而过'}
      ],
      tableData2: [
        {name: '收缩压偏高', reference: '>139', diagnosis: '高血压', remark: '收缩压偏高'},
        {name: '体重偏低', reference: '<18.5', diagnosis: '体重偏低', remark: '体重偏低'},
        {name: '体重适中', reference: '18.525', diagnosis: '体重适中', remark: '体重适中'},
        {name: '超重', reference: '25.30', diagnosis: '超重', remark: '超重'},
        {name: '一级肥胖', reference: '30.35', diagnosis: '轻度肥胖', remark: '轻度肥胖'},
        {name: '二级肥胖', reference: '35.40', diagnosis: '中度肥胖', remark: '中度肥胖'},
        {name: '三级肥胖', reference: '>40', diagnosis: '重度肥胖', remark: '重度肥胖'}
      ]
    }
  }
}
</script>

<style scoped>
  .rightForm{
    float:right;
    width:80%;
    height:92%;
    background:#fff;
    margin-left:4%;
    padding-right:1%;
    overflow:auto;
  }
  .el-radio-group{
    width:100%;
  }
  .title{
    text-align:left;
    text-indent:20px;
  }
</style>
<style>
  @import '../../styles/common2.css';
</style>
