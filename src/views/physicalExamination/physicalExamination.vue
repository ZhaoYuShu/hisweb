<!--体检医生诊断-->
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
        :data="tableData4"
        border
        height="400"
        style="width:98%;margin:0 auto;"
        :highlight-current-row="true"
        @row-click="getExamCode"
        :row-style="rowStyle2">
        <!--<el-table-column property="company" label="单位" width="150"></el-table-column>-->
        <el-table-column property="examCode" label="体检编号" width="150"></el-table-column>
        <el-table-column property="name" label="姓名" width="100"></el-table-column>
        <el-table-column property="sexName" label="性别" width="100"></el-table-column>
        <el-table-column property="age" label="年龄" width="100"></el-table-column>
        <el-table-column property="statusName" label="状态" sortable></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="comfirmExamCode" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="常见结果" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-form">
        <el-form-item label="体检结果" prop="examResults">
          <el-input type="textarea" v-model="form.examResults" rows="10"></el-input>
        </el-form-item>
        <el-form-item label="常见结果" prop="commonResults">
          <el-select v-model="form.commonResults" @change="handleSelect" multiple>
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
        <el-button @click="cancelResults" size="small">取 消</el-button>
        <el-button type="primary" @click="confirm" size="small">确 定</el-button>
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
                <el-input v-model="ruleForm.examCode" placeholder="请输入体检编号" v-loading.fullscreen.lock="fullscreenLoading" @keyup.enter.native="getInfo" @dblclick.native="getPersonList"></el-input>
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
              <el-form-item label="检查日期" prop="examDate">
                <el-date-picker
                  v-model="ruleForm.examDate"
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
            width="250"
            align="left">
          </el-table-column>
          <el-table-column
            label="结果"
            width="500"
            align="left">
            <template slot-scope="scope">
              <el-input v-model="scope.row.defaultValue" @dblclick.native="commonResult(scope.row)"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="单位"
            prop="unit"
            width="100"
            align="left">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="saveMessage(scope.row, scope.$index, scope)" type="success" size="small">保存</el-button>
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
          style="width:98%;margin:0 auto;"
          :row-style="rowStyle">
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
        commonResults: [],
        examResults: ''
      },
      form2: {
        companyName: '',
        companyGroup: ''
      },
      rules: {},
      rules2: {},
      tableData: [],
      tableData2: [],
      tableData3: [], // 诊断列表
      tableData4: [],
      summary: '',
      commonResults: [],
      sex: [
        {id: 1, value: '男'},
        {id: 2, value: '女'},
        {id: 0, value: '所有'}
      ],
      dialogFormVisible: false,
      dialogTableVisible: false,
      fullscreenLoading: false, // 全屏加载中
      obj: {}, // 传值的总结构
      currentCode: '', // 当前点击的组合项目
      currentName: '', // 当前点击的组合项目名称
      currentNode: '', // 当前点击的组合项目小结
      currentResultID: '', // 当前点击的组合项目resultid
      result: '', // 结果
      row: {},
      checkedValue: [],
      examCode: '',
      companyName: [],
      companyGroup: [],
      loading: false
    }
  },
  methods: {
    getInfo () {
      let that = this;
      that.fullscreenLoading = true;
      that.summary = '';
      that.tableData2 = [];
      that.tableData3 = [];
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
          // that.obj.examGroupItemResultZDDtos = res.examGroupItemResultDtoList;
          console.log(that.obj);
          // let list = response.data.data.examGroupItemResultDtoList;
          // for (let i = 0; i < list.length; i++) {
          //   http.examResult(list[i].resultId, list[i].code).then(response => {
          //     console.log(response);
          //     if (response.status === 200 && response.data.result === '00000000') {
          //       list[i].examItemResultDtoList = response.data.data;
          //       list[i].node = that.summary;
          //     }
          //   }).catch(error => {
          //     console.log(error);
          //   });
          // }
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
      let objs = {};
      that.summary = '';
      that.tableData3 = [];
      console.log(row, event, column);
      that.currentCode = row.code;
      that.currentName = row.name;
      that.currentNode = row.node;
      that.currentResultID = row.resultId;

      http.examResult(row.resultId, row.code).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          for (let i = 0; i < response.data.data.examItemAndZDResultDtos.length; i++) {
            response.data.data.examItemAndZDResultDtos[i].defaultValue = response.data.data.examItemAndZDResultDtos[i].defaultValue.replace(/＼n/g, '\n');
          };
          that.tableData2 = response.data.data.examItemAndZDResultDtos;
          var node = response.data.data.node;
          var qNode = response.data.data.qNode;
          var arr = [];
          for (let value of Object.values(node)) {
            that.summary += " " + value;
          }
          that.summary = that.summary.replace(/＼n/g, '\n');
          that.summary = that.summary.replace(/null/g, '');
          console.log(that.summary);
          for (let value of Object.values(qNode)) {
            var obj = {};
            obj.diagnosis = value;
            arr.push(obj);
          }
          that.tableData3 = arr;
          that.obj.examGroupItemResultZDDtos = [];
          objs.code = row.code;
          objs.name = row.name;
          objs.node = that.summary;
          objs.resultID = row.resultId;
          objs.examItemResultDtoList = [];
          that.obj.examGroupItemResultZDDtos.push(objs);
          for (let i = 0; i < response.data.data.examItemAndZDResultDtos.length; i++) {
            let obj2 = {};
            obj2.code = response.data.data.examItemAndZDResultDtos[i].itemCode;
            obj2.defaultValue = response.data.data.examItemAndZDResultDtos[i].defaultValue;
            obj2.name = response.data.data.examItemAndZDResultDtos[i].name;
            obj2.referenceValue = response.data.data.examItemAndZDResultDtos[i].referenceValue;
            obj2.unit = response.data.data.examItemAndZDResultDtos[i].unit;
            objs.examItemResultDtoList.push(obj2);
          }
          console.log(that.obj);
        }
        // that.rowStyle();
      }).catch(error => {
        console.log(error);
      });
    },
    // 保存体检结果
    saveMessage (row, index, scope) {
      console.log(row, index, scope);
      let that = this;
      console.log("保存结果");
      console.log(row, index, scope);
      let obj = {};
      obj.code = that.currentCode;
      obj.name = that.currentName;
      obj.node = that.summary;
      obj.resultID = that.currentResultID;
      obj.examItemResultDtoList = [];
      row.code = row.itemCode;
      obj.examItemResultDtoList.push(row);
      console.log(obj);
      http.saveExamResultItem(obj).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.summary = response.data.data.node;
          that.obj.examGroupItemResultZDDtos[0].node = that.summary;
          var arr = [];
          for (let value of Object.values(response.data.data.qnode)) {
            var objs = {};
            objs.diagnosis = value;
            arr.push(objs);
          }
          that.tableData3 = arr;
          // that.rowStyle();
          that.$message({
            message: '保存成功！',
            type: 'success'
          });
          http.examResult(that.currentResultID, that.currentCode).then(response => {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              for (let i = 0; i < response.data.data.examItemAndZDResultDtos.length; i++) {
                response.data.data.examItemAndZDResultDtos[i].defaultValue = response.data.data.examItemAndZDResultDtos[i].defaultValue.replace(/＼n/g, '\n');
              };
              that.tableData2 = response.data.data.examItemAndZDResultDtos;
              var node = response.data.data.node;
              var qNode = response.data.data.qNode;
              var arr = [];
              for (let value of Object.values(node)) {
                that.summary += " " + value;
              }
              that.summary = that.summary.replace(/＼n/g, '\n');
              that.summary = that.summary.replace(/null/g, '');
              console.log(that.summary);
              for (let value of Object.values(qNode)) {
                var obj = {};
                obj.diagnosis = value;
                arr.push(obj);
              }
              that.tableData3 = arr;
            }
            // that.rowStyle();
          }).catch(error => {
            console.log(error);
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
    // 双击输入框弹出常见结果下拉框
    commonResult (row) {
      if (row.resultType === 1) {
        this.dialogFormVisible = true;
        console.log(row);
        this.commonResults = row.commonResults;
        this.form.examResults = row.defaultValue.replace(/＼n/g, '\n');
        this.row = row;
      }
    },
    // 选择常见结果
    handleSelect (value) {
      console.log(value);
      let that = this;
      this.row.commonResultId = value;
    },
    // 确定选择常见结果
    confirm () {
      let that = this;
      // for (let i = 0; i < that.checkedValue.length; i++) {
      //   for (let j = 0; j < that.commonResults.length; j++) {
      //     if (that.commonResults[j].id === that.checkedValue[i]) {
      //       that.result = that.result + that.commonResults[j].name + ';';
      //       break;
      //     }
      //   }
      // }
      console.log(that.result);
      // this.row.defaultValue = this.result;
      this.row.defaultValue = this.form.examResults;
      this.dialogFormVisible = false;
      this.form.commonResults = [];
    },
    // 取消选择常见结果
    cancelResults () {
      this.dialogFormVisible = false;
      this.form.commonResults = [];
    },
    // 改变诊断列表字体颜色
    rowStyle (row, rowIndex) {
      return 'color:red';
    },
    // 标红未检人员颜色
    rowStyle2 (data) {
      console.log(data);
      if (data.row.status === 0) {
        return 'background:#f77b7b;color:#fff;';
      }else {
        return 'background:#9f9fef;color:#fff;'
      }
    },
    // 获取人员列表
    getPersonList () {
      this.form2.companyName = '';
      this.form2.companyGroup = '';
      this.tableData4 = [];
      this.dialogTableVisible = true;
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
          that.tableData4 = response.data.data;
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
    //       that.tableData4 = response.data.data;
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
      that.ruleForm.examCode = that.examCode;
      that.fullscreenLoading = true;
      that.summary = '';
      that.tableData2 = [];
      that.tableData3 = [];
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
          // that.obj.examGroupItemResultZDDtos = res.examGroupItemResultDtoList;
          console.log(that.obj);
          // let list = response.data.data.examGroupItemResultDtoList;
          // for (let i = 0; i < list.length; i++) {
          //   http.examResult(list[i].resultId, list[i].code).then(response => {
          //     console.log(response);
          //     if (response.status === 200 && response.data.result === '00000000') {
          //       list[i].examItemResultDtoList = response.data.data;
          //       list[i].node = that.summary;
          //     }
          //   }).catch(error => {
          //     console.log(error);
          //   });
          // }
          console.log(that.obj);
        }
      }).catch(error => {
        that.ruleForm = {};
        that.tableData = [];
        that.fullscreenLoading = false;
        console.log(error);
      });
    }
  },
  mounted () {
    let date = new Date();
    this.ruleForm.examDate = date;
    this.getAllCompany();
    // this.rowStyle();
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
    font-size:16px;
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
    font-size:14px;
  }
  .el-date-editor{
    width:100%;
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
