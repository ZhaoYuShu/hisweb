<template>
    <div class="rightForm">
      <div class="top">
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
                  <el-select v-model="ruleForm.sex" placeholder="请输入性别">
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
                <el-form-item label="登记流水号" prop="startCard">
                  <el-input v-model="ruleForm.startCard" placeholder="请输入登记流水号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="——" prop="endCard">
                  <el-input v-model="ruleForm.endCard" placeholder="请输入登记流水号"></el-input>
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
                <el-form-item label="标签个数" prop="labelNum">
                  <el-input v-model="ruleForm.labelNum" placeholder="请输入标签个数"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="套餐" prop="package">
                  <el-select v-model="ruleForm.package" placeholder="请选择套餐">
                    <el-option
                      v-for="item in packages"
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
          <el-row type="flex" justify="space-around" style="height:100%;width:100%;align-items:center;">
            <el-button type="primary" size="small">查询</el-button>
            <el-button type="primary" size="small">打印</el-button>
          </el-row>
        </div>
      </div>
      <div class="bottom">
        <el-row>
          <el-col>
            <p class="title">条码标签</p>
          </el-col>
        </el-row>
        <el-card>
        </el-card>
      </div>
    </div>
</template>

<script>
export default {
  name: "barcodeForm",
  data () {
    return {
      ruleForm: {
        name: '',
        sex: '',
        startCard: '',
        endCard: '',
        startDate: '',
        endDate: '',
        labelNum: '',
        package: ''
      },
      sex: [
        {id: 1, value: '男'},
        {id: 2, value: '女'},
        {id: 0, value: '所有'}
      ],
      packages: []
    }
  }
}
</script>

<style scoped>
  .rightForm{
    width:83%;
    height:92%;
    float:right;
    overflow:hidden;
  }
  .rightForm .top{
    width:100%;
    height:30%;
    margin-bottom:1%;
  }
  .rightForm .top .query{
    width:70%;
    height:100%;
    overflow:hidden;
    background:#fff;
    float:left;
  }
  .rightForm .top .query .demo-ruleForm{
    width:100%;
    height:85%;
    overflow:auto;
  }
  .rightForm .top .buttons{
    width:29%;
    height:100%;
    overflow:hidden;
    background:#fff;
    float:right;
  }
  .rightForm .bottom{
    width:100%;
    height:69%;
    background:#fff;
  }
  .rightForm .bottom .el-card{
    width: 98%;
    height: 85%;
    margin: 0 auto;
  }
  .rightForm .title{
    font-size:12px;
    font-weight:bold;
    text-align:left;
    text-indent:20px;
  }
  .el-select{
    width:100%;
  }
  .el-date-editor{
    width:100%;
  }
</style>
<style>
  @import '../../styles/common2.css';
</style>
