<template>
  <div class="rightForm">
    <el-form
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      ref="ruleForm"
      class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="诊台编号" prop="code">
            <el-input v-model="ruleForm.code" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="体检类型" prop="examType">
            <el-select v-model="ruleForm.examType" placeholder="请选择体检类型">
              <el-option
                v-for="item in examType"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="平均检查时间" prop="averageTime">
            <el-input v-model="ruleForm.averageTime" placeholder="请输入平均检查时间(分钟)"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="候诊上限时间" prop="maximumTime">
            <el-input v-model="ruleForm.maximumTime" placeholder="请输入候诊上限时间(分钟)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="显示区域队列" prop="queue">
            <el-checkbox v-model="ruleForm.queue"></el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="适用性别" prop="sex">
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
        <el-col :span="11">
          <el-form-item label="对应判断" prop="judgment">
            <el-input v-model="ruleForm.judgment" placeholder="请输入对应判断"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="22">
          <el-form-item label="是否启用" prop="start">
            <el-radio-group v-model="ruleForm.start">
              <el-radio
                v-for="item in start"
                :key="item.id"
                :label="item.id">
                {{item.value}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="操作员" prop="operator">
            <el-input v-model="ruleForm.operator" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="修改时间" prop="updatedAt">
            <el-input v-model="ruleForm.updatedAt" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-button type="primary" size="small">增加</el-button>
          <el-button type="success" size="small">保存</el-button>
          <el-button type="danger" size="small">删除</el-button>
          <el-button type="warning" size="small">修改</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-card>
      <div slot="header" class="clearfix">
        <span class="titles">诊台对应的体检项目</span>
      </div>
      <div v-for="item in examGroupItems" :key="item.code" class="text item">
        {{item.name}}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "medicalPlatformForm",
  data () {
    return {
      ruleForm: {
        code: '',
        name: '',
        examType: '',
        averageTime: '',
        maximumTime: '',
        queue: '',
        sex: '',
        judgment: '',
        start: '',
        operator: '',
        updatedAt: ''
      },
      rules: {},
      examType: [],
      sex: [
        {id: 1, value: '男'},
        {id: 2, value: '女'},
        {id: 0, value: '不限'}
      ],
      start: [
        {id: 0, value: '否'},
        {id: 1, value: '是'}
      ],
      examGroupItems: []
    }
  }
}
</script>

<style scoped>
  .rightForm{
    width:100%;
    height:100%;
  }
  .el-form{
    width:68%;
    height:100%;
    float:left;
  }
  .el-card{
    float:right;
    width:25%;
    height:400px;
    overflow:auto;
  }
  .el-select{
    width:100%;
  }
  .el-input-number{
    width:100%;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
    display:inline-block;
    margin-right:40px;
  }
  .titles{
    font-size:14px;
  }
  .title{
    font-size:12px;
    font-weight:bold;
    text-align:left;
    text-indent:20px;
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
