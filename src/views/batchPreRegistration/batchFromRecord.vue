<template>
  <div class="container">
    <el-tree
      :data="data"
      :props="defaultProps"
      accordion
      :highlight-current="true"
      node-key="id"
      @node-click="handleNodeClick"
      default-expand-all >
    </el-tree>
    <div class="rightForm">
      <el-form :model="form" ref="form" :rules="rules" label-width="100px" class="demo-form">
        <el-row>
          <el-col :span="24">
            <p class="title">过滤条件</p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别" prop="sex">
              <el-select v-model="form.sex">
                <el-option
                  v-for="item in sex"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="总检" prop="check">
              <el-select v-model="form.check">
                <el-option
                  v-for="item in check"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col  :span="12">
            <el-form-item label="体检日期" prop="startDate">
              <el-date-picker
                type="date"
                v-model="form.startDate"
                placeholder="请选择体检日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="至" prop="endDate">
              <el-date-picker
                type="date"
                v-model="form.endDate"
                placeholder="请选择体检日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="体检编号" prop="startCode">
              <el-input v-model="form.startCode" placeholder="请输入体检编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="至" prop="endCode">
              <el-input v-model="form.endCode" placeholder="请输入体检编号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <p class="title">导入条件</p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="单位名称" prop="company">
              <el-select v-model="form.company">
                <el-option
                  v-for="item in company"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="分组名称" prop="group">
              <el-select v-model="form.group">
                <el-option
                  v-for="item in group"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="标签个数" prop="tagNumber">
              <el-input-number v-model="form.tagNumber" controls-position="right" :min="1" :max="100"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" size="small">查询</el-button>
          <el-button type="primary" size="small">导入</el-button>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="24">
          <p class="title">人员信息</p>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        border
        height="45%"
        style="width:98%;margin:0 auto;">
        <el-table-column
          type="selection"
          width="60">
        </el-table-column>
        <el-table-column
          label="工卡号"
          prop="workCard"
          width="100"
          align="left">
        </el-table-column>
        <el-table-column
          label="单位"
          prop="company"
          width="200"
          align="left">
        </el-table-column>
        <el-table-column
          label="姓名"
          prop="name"
          width="80"
          align="left">
        </el-table-column>
        <el-table-column
          label="性别"
          prop="sex"
          width="80"
          align="left">
        </el-table-column>
        <el-table-column
          label="年龄"
          prop="age"
          width="80"
          align="left">
        </el-table-column>
        <el-table-column
          label="出生日期"
          prop="birthday"
          width="200"
          align="left">
        </el-table-column>
        <el-table-column
          label="分组"
          prop="group"
          width="150"
          align="left">
        </el-table-column>
        <el-table-column
          label="联系电话"
          prop="phone"
          width="120"
          align="left">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "batchFromRecord",
  data () {
    return {
      form: {
        name: '',
        sex: '',
        check: '',
        startDate: '',
        endDate: '',
        startCode: '',
        endCode: '',
        company: '',
        group: '',
        tagNumber: ''
      },
      tableData: [],
      sex: [
        {id: 1, value: '男'},
        {id: 2, value: '女'},
        {id: 0, value: '所有'}
      ],
      check: [],
      company: [],
      group: []
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
  .container .el-tree{
    width:15%;
    height:90%;
    padding-top:20px;
    float:left;
    overflow:auto;
  }
  .container .rightForm{
    width:80%;
    height:90%;
    background:#fff;
    float:right;
    padding-right:2%;
    padding-top:20px;
    overflow:hidden;
  }
  .container .rightForm .title{
    font-size:12px;
    font-weight:bold;
    text-align:left;
    text-indent:20px;
  }
  .container .rightForm .demo-form{
    width:100%;
    height:45%;
    overflow-y:auto;
    overflow-x: hidden;
  }
</style>
<style>
  @import '../../styles/common.css';
</style>
