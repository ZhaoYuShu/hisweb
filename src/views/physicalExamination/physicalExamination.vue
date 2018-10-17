<!--体检医生诊断-->
<template>
  <div class="container">
    <el-dialog title="常见结果" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-form">
        <el-form-item label="常见结果" prop="commonResults">
          <el-select v-model="form.commonResults">
            <el-option
              v-for="item in commonResults"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <div class="div1">
      <div class="info">
        <el-row>
          <el-col>
            <p class="title">人员信息</p>
          </el-col>
        </el-row>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" class="demo-ruleForm">
          <el-row :gutter="10">
            <el-col :span="4">
              <el-form-item label="体检编号" prop="examCode">
                <el-input v-model="ruleForm.examCode" placeholder="请输入体检编号" v-loading.fullscreen.lock="fullscreenLoading" @keyup.enter.native="getInfo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="体检次数" prop="examTimes">
                <el-input v-model="ruleForm.examTimes" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="流水号" prop="orderNo">
                <el-input v-model="ruleForm.orderNo" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="性别" prop="sex">
                <el-select v-model="ruleForm.sex" disabled>
                  <el-option
                    v-for="item in sex"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="年龄" prop="age">
                <el-input v-model="ruleForm.age" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="体检类别" prop="examType">
                <el-input v-model="ruleForm.examType" disabled></el-input>
              </el-form-item>
            </el-col>
            <!--<el-col :span="6">-->
            <!--<el-form-item label="人员类别" prop="personnelType">-->
            <!--<el-input v-model="ruleForm.personnelType" disabled></el-input>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <el-col :span="4">
              <el-form-item label="单位名称" prop="companyName">
                <el-input v-model="ruleForm.companyName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="检查医生" prop="doctor">
                <el-input v-model="ruleForm.doctor" placeholder="请输入检查医生"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="操作员" prop="operator">
                <el-input v-model="ruleForm.operator" placeholder="请输入操作员"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="检查日期" prop="date">
                <el-date-picker
                  v-model="ruleForm.date"
                  type="date"
                  disabled>
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item>
                <el-button type="primary" size="small" @click="save">保存</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!--<div class="buttons">-->
        <!--<el-row>-->
          <!--<el-button></el-button>-->
          <!--<el-button></el-button>-->
          <!--<el-button></el-button>-->
          <!--<el-button></el-button>-->
        <!--</el-row>-->
      <!--</div>-->
    </div>
    <div class="div2">
      <div class="groups">
        <el-row>
          <el-col>
            <p class="title">组合项目</p>
          </el-col>
        </el-row>
        <el-table
          :data="tableData"
          border
          height="80%"
          style="width:98%;margin:0 auto;"
          :highlight-current-row="true"
          @row-click="selectExamItem">
          <el-table-column
            label="组合项目"
            prop="name"
            align="left">
          </el-table-column>
        </el-table>
      </div>
      <div class="exam">
        <el-row>
          <el-col>
            <p class="title">体检项目及结果</p>
          </el-col>
        </el-row>
        <el-table
          :data="tableData2"
          border
          height="80%"
          style="width:98%;margin:0 auto;">
          <el-table-column
            label="体检明细项目"
            prop="name"
            width="300"
            align="left">
          </el-table-column>
          <el-table-column
            label="结果"
            width="500"
            align="left">
            <template slot-scope="scope">
              <el-input v-model="scope.row.defaultValue" @dblclick.native="bbb"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="单位"
            prop="unit"
            width="100"
            align="left">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="saveMessage(scope.row, scope.$index, scope)" type="text" size="small">保存</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="diagnosisList">
        <el-row>
          <el-col>
            <p class="title">诊断列表</p>
          </el-col>
        </el-row>
        <el-table
          :data="tableData3"
          border
          height="80%"
          style="width:98%;margin:0 auto;">
          <el-table-column
            label="诊断内容"
            prop="diagnosis"
            align="left">
          </el-table-column>
        </el-table>
      </div>
      <div style="clear:both;"></div>
    </div>
    <div class="div3">
      <div class="summary">
        <el-row>
          <el-col>
            <p class="title">体检小结</p>
          </el-col>
        </el-row>
        <el-input type="textarea" v-model="summary" class="examSummary" :rows="4" @blur="addSummary">
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/api/index.js'
export default {
  name: "physicalExamination",
  data () {
    return {
      ruleForm: {
        examCode: '', // 体检编号
        examTimes: '', // 体检次数
        orderNo: '', // 流水号
        name: '', // 姓名
        sex: '', // 性别
        age: '', // 年龄
        examType: '', // 体检类别
        // personnelType: '', // 人员类别
        companyName: '', // 单位名称
        examDate: '', // 检查日期
        doctor: '', // 检查医生
        operator: '' // 操作员
      },
      form: {
        commonResults: ""
      },
      rules: {
        examCode: [
          {required: true, message: '请输入体检编号', trigger: 'blur'}
        ]
      },
      tableData: [],
      tableData2: [],
      tableData3: [],
      summary: '',
      sex: [
        {id: 1, value: '男'},
        {id: 2, value: '女'},
        {id: 0, value: '所有'}
      ],
      dialogFormVisible: false,
      fullscreenLoading: false, // 全屏加载中
      obj: {}, // 传值的总结构
      currentCode: '', // 当前点击的组合项目
      currentName: '', // 当前点击的组合项目名称
      currentNode: '', // 当前点击的组合项目小结
      currentResultID: '' // 当前点击的组合项目resultid
    }
  },
  methods: {
    getInfo () {
      let that = this;
      that.fullscreenLoading = true;
      http.examRecordUser1(that.ruleForm.examCode).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          let res = response.data.data;
          that.ruleForm.examTimes = res.examTimes;
          that.ruleForm.orderNo = res.orderNo;
          that.ruleForm.name = res.name;
          that.ruleForm.sex = res.sex;
          that.ruleForm.age = res.age;
          that.ruleForm.examType = res.examTypeName;
          that.ruleForm.companyName = res.companyName;
          that.tableData = res.examGroupItemResultDtoList;
          that.fullscreenLoading = false;
          that.obj.examTimes = res.examTimes;
          that.obj.examCode = res.examCode;
          that.obj.examGroupItemResultZDDtos = res.examGroupItemResultDtoList;
          console.log(that.obj);
          let list = response.data.data.examGroupItemResultDtoList;
          for (let i = 0; i < list.length; i++) {
            http.examResult(list[i].resultId, list[i].code).then(response => {
              console.log(response);
              if (response.status === 200 && response.data.result === '00000000') {
                list[i].examItemResultDtoList = response.data.data;
                list[i].node = that.summary;
              }
            }).catch(error => {
              console.log(error);
            });
          }
          console.log(that.obj);
        }
      }).catch(error => {
        that.ruleForm = {};
        that.tableData = [];
        that.fullscreenLoading = false;
        console.log(error);
      });
    },
    // 选择组合项目获取详细项目
    selectExamItem (row, event, column) {
      let that = this;
      console.log(row, event, column);
      that.currentCode = row.code;
      that.currentName = row.name;
      that.currentNode = row.node;
      that.currentResultID = row.resultId;
      http.examResult(row.resultId, row.code).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.tableData2 = response.data.data;
          that.summary = row.node;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 保存体检结果
    saveMessage (row, index, scope) {
      let that = this;
      console.log("保存结果");
      console.log(row, index, scope);
      let obj = {};
      obj.code = that.currentCode;
      obj.name = that.currentName;
      obj.node = that.currentNode;
      obj.resultID = that.currentResultID;
      obj.examItemResultDtoList = [];
      row.code = row.itemCode;
      obj.examItemResultDtoList.push(row);
      console.log(obj);
      http.saveExamResultItem(obj).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.$message({
            message: '保存成功！',
            type: 'success'
          });
        } else {
          that.$message({
            message: response.data.msg,
            type: 'error'
          });
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 添加体检小结
    addSummary () {
      let that = this;
      let list = that.obj.examGroupItemResultZDDtos;
      for (let i = 0; i < list.length; i++) {
        if (list[i].code === that.currentCode) {
          console.log(list[i].code);
          list[i].node = that.summary;
        }
      }
      console.log(that.obj);
    },
    // 保存
    save () {
      let that = this;
      let date = new Date();
      that.obj.doctor = that.ruleForm.doctor;
      that.obj.examDate = date.getTime();
      console.log(that.obj);
      http.saveExamResult(that.obj).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.$message({
            message: '保存成功！',
            type: 'success'
          });
        } else {
          that.$message({
            message: response.data.msg,
            type: 'error'
          });
        }
      }).catch(error => {
        console.log(error);
      });
    },
    bbb () {
      this.dialogFormVisible = true;
      console.log(6666);
    }
  },
  mounted () {
    let date = new Date();
    this.ruleForm.date = date;
  }
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:hidden;
  }
  .container .title{
    font-size:12px;
    font-weight:bold;
    text-align:left;
    text-indent:20px;
  }
  .container .div1{
    width:100%;
    /*height:35%;*/
    margin-bottom:1%;
  }
  .container .div1 .info{
    width:100%;
    height:100%;
    background:#fff;
  }
  .container .div1 .info .demo-ruleForm{
    width:100%;
    height:85%;
    overflow:hidden;
    overflow-y:auto;
  }
  .container .div1 .buttons{
    width:29%;
    height:100%;
    background:#fff;
    float:right;
  }
  .container .div2{
    width:100%;
    height:60%;
    margin-bottom:1%;
  }
  .container .div2 .groups{
    width:15%;
    height:100%;
    background:#fff;
    float:left;
    margin-right:1%;
  }
  .container .div2 .exam{
    width:68%;
    height:100%;
    background:#fff;
    float:left;
    margin-right:1%;
  }
  .container .div2 .diagnosisList{
    width:15%;
    height:100%;
    background:#fff;
    float:left;
  }
  .container .div3{
    width:100%;
    height:40%;
  }
  .container .div3 .summary{
    width:100%;
    height:100%;
    background:#fff;
    margin-right:1%;
    float:left;
  }
  .container .div3 .summary .examSummary{
    width:100%;
    height:100%;
    margin: 0 auto;
  }
  .container .div3 .diagnosisList{
    width:29%;
    height:100%;
    margin-right:1%;
    background:#fff;
    float:left;
  }
  .container .div3 .doctor{
    width:29%;
    height:100%;
    background:#fff;
    float:left;
  }
  .el-table{
    font-size:12px;
  }
  .el-date-editor{
    width:100%;
  }
</style>
<style>
  @import '../../styles/common.css';
</style>
