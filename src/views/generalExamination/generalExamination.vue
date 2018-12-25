<!--总检医生诊台-->
<template>
  <div class="container">
    <!--人员名单-->
    <el-dialog title="人员名单" :visible.sync="dialogTableVisible" v-loading="loading">
      <el-form :model="form2" ref="form2" :rules="rules2" label-width="80px" class="demo-form2">
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="单位名称" prop="companyName">
              <el-select v-model="form2.companyName" filterable placeholder="请选择单位名称" @change="chooseCompany">
                <el-option
                  v-for="item in companyName"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!--<el-col :span="12">-->
            <!--<el-form-item label="单位分组" prop="companyGroup">-->
              <!--<el-select v-model="form2.companyGroup" filterable placeholder="请选择单位分组" @change="getAllStaff">-->
                <!--<el-option-->
                  <!--v-for="item in companyGroup"-->
                  <!--:key="item.id"-->
                  <!--:label="item.name"-->
                  <!--:value="item.code">-->
                <!--</el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<el-form-item label="姓名" prop="name">-->
              <!--<el-input ></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        </el-row>
      </el-form>
      <el-table
        :data="tableData2"
        border
        height="400"
        style="width:98%;margin:0 auto;"
        :highlight-current-row="true"
        @row-click="getExamCode"
        :row-style="rowStyle2">
        <!--<el-table-column property="company" label="单位" width="150"></el-table-column>-->
        <el-table-column prop="examCode" label="体检编号" width="150"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="sexName" label="性别" width="100"></el-table-column>
        <el-table-column prop="age" label="年龄" width="100"></el-table-column>
        <el-table-column prop="statusName" label="状态" sortable></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="comfirmExamCode" size="small">确 定</el-button>
      </div>
    </el-dialog>

    <!--诊断内容-->
    <el-dialog title="诊断建议" :visible.sync="dialogTableVisible2">
      <el-table
        :data="tableData3"
        border
        height="400"
        style="width:98%;margin:0 auto;"
        :highlight-current-row="true"
        @select="selectDiagnose"
        @select-all="selectAllDiagnose">
        <el-table-column type="selection"></el-table-column>
        <el-table-column property="diagnoseContent" label="诊断建议"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible2 = false" size="small">取 消</el-button>
        <el-button type="primary" @click="comfirmDiagnose" size="small">确 定</el-button>
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
                <el-input v-model="ruleForm.examCode" placeholder="请输入体检编号" @keyup.enter.native="getInfo" v-loading.fullscreen.lock="fullscreenLoading" @dblclick.native="getPersonList"></el-input>
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
          </el-row>
          <el-row :gutter="10">
            <el-col :span="4">
              <el-form-item label="体检类别" prop="examTypeName">
                <el-input v-model="ruleForm.examTypeName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="单位名称" prop="companyName">
                <el-input v-model="ruleForm.companyName" disabled></el-input>
              </el-form-item>
            </el-col>
            <!--<el-col :span="4">-->
              <!--<el-form-item label="总检医生" prop="doctor">-->
                <!--<el-input v-model="form.doctor" placeholder="请输入总检医生"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="4">-->
              <!--<el-form-item label="操作员" prop="operator">-->
                <!--<el-input v-model="form.operator" placeholder="请输入操作员"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <el-col :span="4">
              <el-form-item label="总检日期" prop="date">
                <el-date-picker
                  v-model="form.date"
                  type="date"
                  disabled>
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item>
                <el-button size="small" type="primary" @click="saveExamRecord">保存</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item>
                <el-button size="small" type="primary" @click="reviewReport">预览报告</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="div2">
      <div class="left">
        <el-row>
          <el-col>
            <p class="title">综述</p>
          </el-col>
        </el-row>
        <el-input type="textarea" v-model="review" :rows="18" style="width:98%;margin:0 auto;font-size:18px;"></el-input>
      </div>
      <div class="middle">
        <el-row>
          <el-col>
            <p class="title">建议</p>
          </el-col>
        </el-row>
        <el-input type="textarea" :rows="18" v-model="suggest" style="width:98%;margin:0 auto;margin-bottom:3%;font-size:18px;"></el-input>
      </div>
      <div class="right">
        <el-row>
          <el-col>
            <p class="title">诊断记录表</p>
          </el-col>
        </el-row>
        <el-table
          :data="tableData"
          border
          height="90%"
          style="width:98%;margin:0 auto;"
          :row-style="rowStyle"
          @row-dblclick="getDiagnoseContent">
          <el-table-column
            label="疾病诊断"
            prop="name"
            align="left">
          </el-table-column>
        </el-table>
      </div>
      <div class="right2">
        <el-row>
          <el-col>
            <p class="title">未检项目</p>
          </el-col>
        </el-row>
        <el-table
          :data="tableData4"
          border
          height="90%"
          style="width:98%;margin:0 auto;"
          :row-style="rowStyle">
          <el-table-column
            label="未检项目"
            prop="name"
            align="left">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/api/index.js'
export default {
  name: "generalExamination",
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
        examTypeName: '', // 体检类别名称
        personnelType: '', // 人员类别
        companyName: '' // 单位名称
      },
      fullscreenLoading: false, // 全屏加载中
      form: {
        doctor: '',
        date: '',
        operator: ''
      },
      form2: {
        companyName: '',
        companyGroup: ''
      },
      rules: {},
      rules2: {},
      suggest: '',
      review: '',
      tableData: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      sex: [
        {id: 1, value: '男'},
        {id: 2, value: '女'},
        {id: 0, value: '所有'}
      ],
      loading: false,
      companyName: [],
      companyGroup: [],
      examCode: '',
      diagnoseName: '',
      diagnoseContent: [],
      dialogTableVisible: false,
      dialogTableVisible2: false,
      web: 'http://172.17.8.3:8081'
      // web: 'http://192.168.0.102:8081'
    }
  },
  methods: {
    getInfo () {
      let that = this;
      that.fullscreenLoading = true;
      http.checkoutInfo(that.ruleForm.examCode).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          let res = response.data.data;
          that.ruleForm.examTimes = res.examTimes;
          that.ruleForm.orderNo = res.orderNo;
          that.ruleForm.name = res.name;
          that.ruleForm.sex = res.sex;
          that.ruleForm.age = res.age;
          that.ruleForm.examTypeName = res.examTypeName;
          that.ruleForm.companyName = res.companyName;
          that.review = res.review;
          that.suggest = res.suggest;
          that.fullscreenLoading = false;
          that.tableData = res.diagnoseInfoResultShortDtos;
          // 查询未检项目
          for (let i = 0; i < res.noCheckoutItemName.length; i++) {
            let obj = {};
            obj.name = res.noCheckoutItemName[i];
            that.tableData4.push(obj);
          }
        }
      }).catch(error => {
        that.fullscreenLoading = false;
        console.log(error);
      });
    },
    // 获取人员列表
    getPersonList () {
      this.form2.companyName = '';
      this.form2.companyGroup = '';
      this.tableData2 = [];
      this.dialogTableVisible = true;
    },
    // 改变诊断列表的字体颜色
    rowStyle (row, rowIndex) {
      return 'color:red';
    },
    // 预览体检报告
    reviewReport () {
      let arr = [];
      arr.push(this.ruleForm.orderNo);
      window.open(this.web + '/api/reports/book?orderNo=' + arr);
    },
    // 保存总检
    saveExamRecord () {
      let obj = {};
      let that = this;
      obj.examCode = this.ruleForm.examCode;
      obj.examTimes = this.ruleForm.examTimes;
      obj.orderNo = this.ruleForm.orderNo;
      obj.review = this.review;
      obj.suggest = this.suggest;
      http.saveExamRecord(obj).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.$message({
            message: '保存成功',
            type: 'success'
          });
          that.getInfo();
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 获取所有单位
    getAllCompany () {
      let that = this;
      http.getAllCompany().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          let arr = [];
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].pid !== 0) {
              arr.push(response.data.data[i]);
            }
          }
          that.companyName = arr;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 选择单位获取对应的人员信息
    chooseCompany (data) {
      console.log(data);
      let that = this;
      that.loading = true;
      http.getCompanyStaff(data).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          for (let i = 0; i < response.data.data.length; i++) {
            // 转换性别
            if (response.data.data[i].sex === 1) {
              response.data.data[i].sexName = '男';
            } else if (response.data.data[i].sex === 2) {
              response.data.data[i].sexName = '女';
            } else if (response.data.data[i].sex === 0) {
              response.data.data[i].sexName = '所有';
            }

            //转换状态
            if (response.data.data[i].status === 0) {
              response.data.data[i].statusName = '未检';
            } else if (response.data.data[i].status === 1) {
              response.data.data[i].statusName = '部分已检';
            } else if (response.data.data[i].status === 2) {
              response.data.data[i].statusName = '待总检';
            } else if (response.data.data[i].status === 3) {
              response.data.data[i].statusName = '已总检';
            }
          }
          that.tableData2 = response.data.data;
          that.loading = false;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 选择单位分组获取所有人员
    // getAllStaff (data) {
    //   let that = this;
    //   http.getAllStaff(data).then(response => {
    //     console.log(response);
    //     if (response.status === 200 && response.data.result === '00000000') {
    //       for (let i = 0; i < response.data.data.length; i++) {
    //         // 转换性别
    //         if (response.data.data[i].sex === 1) {
    //           response.data.data[i].sexName = '男';
    //         } else if (response.data.data[i].sex === 2) {
    //           response.data.data[i].sexName = '女';
    //         } else if (response.data.data[i].sex === 0) {
    //           response.data.data[i].sexName = '所有';
    //         }
    //
    //         //转换状态
    //         if (response.data.data[i].status === 0) {
    //           response.data.data[i].statusName = '未检';
    //         } else if (response.data.data[i].status === 1) {
    //           response.data.data[i].statusName = '部分已检';
    //         } else if (response.data.data[i].status === 2) {
    //           response.data.data[i].statusName = '待总检';
    //         } else if (response.data.data[i].status === 3) {
    //           response.data.data[i].statusName = '已总检';
    //         }
    //       }
    //       that.tableData2 = response.data.data;
    //     }
    //   }).catch(error => {
    //     console.log(error);
    //   });
    // },

    // 点击表格的一行获取体检编号
    getExamCode (row) {
      let that = this;
      console.log(row);
      that.examCode = row.examCode;
    },
    comfirmExamCode () {
      let that = this;
      that.dialogTableVisible = false;
      that.ruleForm.examCode = this.examCode;
      that.fullscreenLoading = true;
      http.checkoutInfo(that.ruleForm.examCode).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          let res = response.data.data;
          that.ruleForm.examTimes = res.examTimes;
          that.ruleForm.orderNo = res.orderNo;
          that.ruleForm.name = res.name;
          that.ruleForm.sex = res.sex;
          that.ruleForm.age = res.age;
          that.ruleForm.examTypeName = res.examTypeName;
          that.ruleForm.companyName = res.companyName;
          that.review = res.review;
          that.suggest = res.suggest;
          that.fullscreenLoading = false;
          that.tableData = res.diagnoseInfoResultShortDtos;
        }
      }).catch(error => {
        that.fullscreenLoading = false;
        console.log(error);
      });
    },
    // 根据诊断信息编号获取诊断内容
    getDiagnoseContent (row) {
      let that = this;
      that.dialogTableVisible2 = true;
      that.diagnoseName = row.name;
      http.getDiagnoseContent(row.code).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.tableData3 = response.data.data;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 选择诊断建议
    selectDiagnose (data) {
      console.log(data);
      this.diagnoseContent = data;
    },
    // 全选诊断建议
    selectAllDiagnose (data) {
      console.log(data);
      this.diagnoseContent = data;
    },
    // 确定添加诊断建议
    comfirmDiagnose () {
      let that = this;
      that.dialogTableVisible2 = false;
      console.log(that.diagnoseContent);
      that.suggest += "*" + that.diagnoseName + ":" + "\n";
      let arr = [];
      for (let i = 0; i < that.diagnoseContent.length; i++) {
        arr.push(that.diagnoseContent[i].diagnoseContent);
      }
      let str = '';
      str = arr.join('\n');
      that.suggest += str + '\n';
    },
    // 标红未检人员颜色
    rowStyle2 (data) {
      console.log(data);
      if (data.row.status === 0) {
        return 'background:#f77b7b;color:#fff;';
      }else {
        return 'background:#9f9fef;color:#fff;'
      }
    }
  },
  mounted () {
    let date = new Date();
    this.form.date = date;
    this.getAllCompany();
  }
}
</script>

<style scoped>
  .container{
    width:100%;
    height:98%;
    overflow:auto;
  }
  .container .title{
    font-size:14px;
    font-weight:bold;
    text-indent:20px;
    text-align:left;
  }
  .container .div1{
    width:100%;
    height:25%;
    margin-bottom:1%;
  }
  .container .div1 .info{
    width:100%;
    height:100%;
    background:#fff;
    float:left;
  }
  .container .div1 .info .demo-ruleForm{
    width: 100%;
    height:80%;
    overflow:hidden;
    overflow-y:auto;
  }
  .container .div1 .buttons{
    width:29%;
    height:100%;
    float:right;
    background:#fff;
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content: space-around;
  }
  .container .div1 .buttons .el-button{
    width:100px;
  }
  .el-table{
    font-size:12px;
  }
  .container .div2{
    width:100%;
    height:70%;
    margin-bottom:1%;
  }
  .container .div2 .left{
    width:29%;
    height:100%;
    background:#fff;
    float:left;
    margin-right:1%;
  }
  .container .div2 .middle{
    width:29%;
    height:100%;
    float:left;
    margin-right:1%;
  }
  .container .div2 .right{
    width:19%;
    height:100%;
    float:left;
    margin-right:1%;
  }
  .container .div2 .right2{
    width:20%;
    height:100%;
    float:left;
  }
  .el-date-editor{
    width:100%;
  }
</style>
<style scoped>
  >>>.el-form-item__label{
    font-size:14px;
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
    font-size:14px;
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
