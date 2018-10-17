<template>
  <div class="container">
    <div class="top">
      <div class="left">
        <el-tree
          :data="data"
          :props="defaultProps"
          accordion
          :highlight-current="true"
          node-key="id"
          @node-click="handleNodeClick"
          default-expand-all>
        </el-tree>
      </div>
      <div class="right">
        <el-row type="flex" justify="center" style="padding:10px 0;border-bottom:1px solid #ccc;">
          <el-col :span="4">
            <el-button type="primary" size="small">从Excel中读取</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" size="small">导入</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" size="small">生成子单位</el-button>
          </el-col>
        </el-row>
        <div class="forms">
          <el-row>
            <el-col :span="24">
              <p class="title">导入信息</p>
            </el-col>
          </el-row>
          <el-row style="margin-bottom:5px;">
            <el-col :span="10">
              <el-checkbox>导入单位名称</el-checkbox>
            </el-col>
            <el-col :span="10">
              <el-input disabled v-model="companyName"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-checkbox>导入标签个数</el-checkbox>
            </el-col>
            <el-col :span="10">
              <el-input-number controls-position="right" :min="1" :max="100" v-model="tagNumber"></el-input-number>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <p class="title">调整分组</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              原分组：
              <el-select v-model="originalGroup">
                <el-option
                  v-for="item in originalGroups"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="10">
              调入：
              <el-select v-model="group">
                <el-option
                  v-for="item in group"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" size="small">确定</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="bottom">
      <el-row>
        <el-col :span="24">
          <p class="title">人员信息</p>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        border
        height="80%"
        style="width:98%;margin:0 auto;">
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "batchFromExcel",
  data () {
    return {
      data: [],
      tableData: [],
      companyName: '',
      tagNumber: '',
      originalGroup: '',
      originalGroups: ''
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
  .container .top{
    width:100%;
    height:38%;
    margin-bottom:2%;
  }
  .container .top .left{
    width:20%;
    height:100%;
    background:#fff;
    float:left;
  }
  .container .top .right{
    width:78%;
    height:100%;
    background:#fff;
    float:right;
  }
  .container .top .right .forms{
    width:100%;
    height:70%;
    overflow-y:auto;
  }
  .container .bottom{
    width:100%;
    height:50%;
    background:#fff;
  }
  .container .title{
    font-size:12px;
    font-weight:bold;
    text-align:left;
    text-indent:20px;
  }
  .el-input-number{
    width:100%;
  }
</style>
<style>
  @import '../../styles/common.css';
</style>
