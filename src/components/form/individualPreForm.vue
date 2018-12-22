<template>
    <div class="rightForm">
      <!--对话框-->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
        <span>确定删除预约登记信息？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="deleteRegistration" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <div class="top">
        <el-row>
          <el-col :span="24">
            <p class="title">人员信息</p>
          </el-col>
        </el-row>
        <el-form
          :rules="rules"
          :model="ruleForm"
          ref="ruleForm"
          label-width="150px"
          class="demo-ruleForm">
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="单位" prop="companyCode">
                <el-select v-model="ruleForm.companyCode" filterable placeholder="请选择单位" @change="handleChange" :disabled="isDisabled">
                  <el-option
                    v-for="item in company"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="预约编号" prop="registrationNo">
                <el-input v-model="ruleForm.registrationNo" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="联系电话" prop="phone">
                <el-input v-model="ruleForm.phone" placeholder="请输入联系电话"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="体检号" prop="examCode">
                <el-input v-model="ruleForm.examCode" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="身份证号" prop="personnelCode">
                <el-input v-model="ruleForm.personnelCode" placeholder="请输入身份证号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="性别" prop="sex">
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
            <el-col :span="6">
              <el-form-item label="体检次数" prop="examTimes">
                <el-input v-model="ruleForm.examTimes"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="年龄" prop="age">
                <el-input v-model="ruleForm.age" placeholder="请输入年龄"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="预计体检日期" prop="examDate">
                <el-date-picker
                  v-model="ruleForm.examDate"
                  type="date"
                  placeholder="选择预计体检日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="对应分组" prop="groupCode">
                <el-select v-model="ruleForm.groupCode" filterable placeholder="请选择对应分组" @change="selectGroup">
                  <el-option
                    v-for="item in group"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="体检类型" prop="examType">
                <el-select v-model="ruleForm.examType" filterable placeholder="请选择体检类型">
                  <el-option
                    v-for="item in examType"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!--<el-row :gutter="10">-->
            <!--<el-col :span="6">-->
              <!--<el-form-item label="结算方式" prop="balanceType">-->
                <!--<el-select v-model="ruleForm.balanceType" placeholder="请选择结算方式">-->
                  <!--<el-option-->
                    <!--v-for="item in balanceType"-->
                    <!--:key="item.id"-->
                    <!--:label="item.value"-->
                    <!--:value="item.id">-->
                  <!--</el-option>-->
                <!--</el-select>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="6">-->
              <!--<el-form-item label="标签个数" prop="labelNum">-->
                <!--<el-input v-model="ruleForm.labelNum" placeholder="请输入标签个数"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="6">-->
              <!--<el-form-item label="人员类别" prop="personnelType">-->
                <!--<el-select v-model="ruleForm.personnelType" filterable placeholder="请选择人员类别">-->
                  <!--<el-option-->
                    <!--v-for="item in personalCategory"-->
                    <!--:key="item.id"-->
                    <!--:label="item.name"-->
                    <!--:value="item.code">-->
                  <!--</el-option>-->
                <!--</el-select>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          <!--</el-row>-->
          <!--<el-row :gutter="10">-->
            <!--<el-col :span="6">-->
              <!--<el-form-item label="Email" prop="email">-->
                <!--<el-input v-model="ruleForm.email" placeholder="请输入Email"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="6">-->
              <!--<el-form-item label="职务" prop="duty">-->
                <!--<el-input v-model="ruleForm.duty" placeholder="请输入职务"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="6">-->
              <!--<el-form-item label="职称" prop="title">-->
                <!--<el-input v-model="ruleForm.title" placeholder="请输入职称"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          <!--</el-row>-->
        </el-form>
        <el-row type="flex" justify="center">
          <el-button type="primary" size="small" @click="resetForm('ruleForm')">增加</el-button>
          <el-button type="success" size="small" @click="submitForm('ruleForm')" :disabled="saveDisabled">保存</el-button>
          <el-button type="danger" size="small" @click="dialogVisible = true" :disabled="deleteDisabled">删除</el-button>
          <el-button type="warning" size="small" @click="updateForm('ruleForm')" :disabled="updateDisabled">修改</el-button>
          <el-button size="small" @click="reloadTree">刷新</el-button>
        </el-row>
      </div>
      <div class="bottom">
        <el-row :gutter="20">
          <el-col :span="24">
            <p class="title">人员查询结果<span style="color:red;">(共{{people}}人)</span></p>
          </el-col>
        </el-row>
        <el-table
          ref="tables"
          :data="tableData"
          border
          height="90%"
          style="width:98%;margin:0 auto;"
          @row-click="handleRowClick"
          :highlight-current-row="true">
          <!--<el-table-column-->
            <!--width="60">-->
            <!--<template slot-scope="scope">-->
              <!--<el-radio class="radio" v-model="radio" :label="scope.$index"></el-radio>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column
            prop="companyName"
            label="单位"
            width="300"
            align="left">
          </el-table-column>
          <el-table-column
            prop="registrationNo"
            label="预约编号"
            width="200"
            align="left">
          </el-table-column>
          <el-table-column
            prop="examCode"
            label="体检号"
            width="200"
            align="left">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="100"
            align="left">
          </el-table-column>
          <el-table-column
            prop="gender"
            label="性别"
            width="100"
            align="left">
          </el-table-column>
          <el-table-column
            prop="age"
            label="年龄"
            width="100"
            align="left">
          </el-table-column>
          <el-table-column
            prop="examTimes"
            label="体检次数"
            width="100"
            align="left">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机"
            width="160"
            align="left">
          </el-table-column>
          <el-table-column
            prop="labelNum"
            label="标签个数"
            align="left">
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
import http from '@/api/index.js'
import Bus from '@/utils/bus.js'
export default {
  name: "individualPreForm",
  data () {
    let card = val => {
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      return reg.test(val);
    };
    let checkCard = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("身份证号不能为空"));
      } else if (card(value)) {
        return callback();
      } else {
        return callback(new Error("请输入正确的身份证号"));
      }
    };
    return {
      ruleForm: {
        companyCode: '', // 单位
        registrationNo: '', // 预约编号
        examCode: '', // 体检号
        name: '', // 姓名
        sex: '', // 性别
        examTimes: '', // 体检次数
        birthday: '', // 出生日期
        age: '', // 年龄
        examDate: '', // 预计体检日期
        personnelCode: '', // 身份证号
        groupCode: '', // 对应分组
        mobile: '', // 手机
        labelNum: '', // 标签个数
        personnelType: '', // 人员类别
        phone: '', // 联系电话
        email: '', // 邮箱
        examType: '', // 体检类别
        duty: '', // 职务
        jobTitle: '', // 职称
        balanceType: 2, // 结算方式
        companyExamTimes: '' // 单位体检次数id
      },
      rules: {
        companyCode: [
          {required: true, message: '请选择单位', trigger: 'change'}
        ],
        registrationNo: [
          {required: true, message: '预约编号不能为空', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        examCode: [
          {required: true, message: '请输入体检号', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ],
        examTimes: [
          {required: true, message: '体检次数不能为空', trigger: 'blur'}
        ],
        // personnelCode: [
        //   {required: true, validator: checkCard, trigger: 'blur'}
        // ],
        examDate: [
          {required: true, message: '请选择体检日期', trigger: 'change'}
        ],
        // phone: [
        //   {required: true, message: '请输入联系电话', trigger: 'blur'}
        // ],
        groupCode: [
          {required: true, message: '请选择对应分组', trigger: 'change'}
        ],
        balanceType: [
          {required: true, message: '请选择结算方式', trigger: 'change'}
        ],
        examType: [
          {required: true, message: '请选择体检类型', trigger: 'change'}
        ]
      },
      sex: [
        {id: 1, value: '男'},
        {id: 2, value: '女'},
        {id: 0, value: '所有'}
      ],
      personalCategory: [],
      examType: [],
      tableData: [],
      group: [],
      company: [],
      balanceType: [
        {id: 1, value: '个人结账'},
        {id: 2, value: '单位结账'}
      ],
      registrationNo: '',
      dialogVisible: false,
      currentId: '',
      isDisabled: false,
      saveDisabled: false,
      deleteDisabled: true,
      updateDisabled: true,
      people: 0
    }
  },
  methods: {
    // 获取预约编号
    getRegistrationCode () {
      let that = this;
      http.registrationCode().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.ruleForm.registrationNo = response.data.data;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 获取体检号
    getExamCode () {
      let that = this;
      http.getExamCode().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.ruleForm.examCode = response.data.data;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 获取人员类别
    getPersonalType () {
      let that = this;
      http.getAllCustomerType().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          let arr = [];
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].pid !== 0) {
              arr.push(response.data.data[i]);
            }
          }
          that.personalCategory = that.changeNumber(arr);
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
          that.company = arr;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 获取体检类型
    getExamType () {
      let that = this;
      http.getAllExamType().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          let arr = [];
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].pid !== 0) {
              arr.push(response.data.data[i]);
            }
          }
          that.examType = arr;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 选择单位
    handleChange (data) {
      this.getAllGroup(data);
      this.getTimes(data);
    },
    // 根据公司code获取公司下所有的分组信息
    getAllGroup (companyCode) {
      let that = this;
      http.getAllCompanyGroup(companyCode).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.group = that.changeNumber(response.data.data.companyGroups);
          // that.changeNumber(that.group);
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 根据单位Code获取单位体检次数
    getTimes (companyCode) {
      let that = this;
      http.companyExamRecordTimes(companyCode).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.ruleForm.companyExamTimes = response.data.data.times;
          console.log(that.ruleForm.companyExamTimes);
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 选择单位分组，根据code获取标签个数
    selectGroup (data) {
      let that = this;
      console.log(data);
      http.getLabelNumber(data).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.ruleForm.labelNum = response.data.data;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 将数据中的code转成number类型
    changeNumber (arr) {
      let array = [];
      for (let i = 0; i < arr.length; i++) {
        arr[i].code = parseInt(arr[i].code);
        array.push(arr[i]);
      }
      return array;
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields();
      this.getRegistrationCode();
      this.getExamCode();
      this.isDisabled = false;
      this.saveDisabled = false;
      this.deleteDisabled = true;
      this.updateDisabled = true;
      this.ruleForm.id = '';
    },
    // 添加预约登记
    submitForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          http.addRegistration(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '添加预约登记成功！',
                type: 'success'
              });
              http.getAllStaff(that.ruleForm.groupCode).then(response => {
                console.log(response);
                if (response.status === 200 && response.data.result === '00000000') {
                  for (let i = 0; i < response.data.data.length; i++) {
                    for (let j = 0; j < that.company.length; j++) {
                      if (response.data.data[i].companyCode === that.company[j].code) {
                        response.data.data[i].companyName = that.company[j].name;
                      }
                      if (response.data.data[i].sex === 1) {
                        response.data.data[i].gender = "男"
                      } else if (response.data.data[i].sex === 2) {
                        response.data.data[i].gender = "女"
                      } else if (response.data.data[i].sex === 0) {
                        response.data.data[i].gender = "所有"
                      }
                    }
                  }
                  that.tableData = response.data.data;
                }
              }).catch(error => {
                console.log(error);
              });
              that.resetForm('ruleForm');
            } else {
              that.$message({
                message: response.data.msg,
                type: 'error'
              });
            }
          }).catch(function (error) {
            console.log(error);
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 删除预约登记
    deleteRegistration () {
      let that = this;
      that.dialogVisible = false;
      http.deleteRegistration(that.registrationNo).then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.$message({
            message: '删除预约登记成功！',
            type: 'success'
          });
          that.resetForm('ruleForm');
          http.getAllStaff(that.currentId).then(response => {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              for (let i = 0; i < response.data.data.length; i++) {
                for (let j = 0; j < that.company.length; j++) {
                  if (response.data.data[i].companyCode === that.company[j].code) {
                    response.data.data[i].companyName = that.company[j].name;
                  }
                  if (response.data.data[i].sex === 1) {
                    response.data.data[i].gender = "男"
                  } else if (response.data.data[i].sex === 2) {
                    response.data.data[i].gender = "女"
                  } else if (response.data.data[i].sex === 0) {
                    response.data.data[i].gender = "所有"
                  }
                }
              }
              that.tableData = response.data.data;
            }
          }).catch(error => {
            console.log(error);
          });
        } else {
          that.$message({
            message: response.data.msg,
            type: 'error'
          });
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    // 修改预约登记
    updateForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          http.updateRegistration(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '修改预约登记成功！',
                type: 'success'
              });
              http.getAllStaff(that.ruleForm.groupCode).then(response => {
                console.log(response);
                if (response.status === 200 && response.data.result === '00000000') {
                  for (let i = 0; i < response.data.data.length; i++) {
                    for (let j = 0; j < that.company.length; j++) {
                      if (response.data.data[i].companyCode === that.company[j].code) {
                        response.data.data[i].companyName = that.company[j].name;
                      }
                      if (response.data.data[i].sex === 1) {
                        response.data.data[i].gender = "男"
                      } else if (response.data.data[i].sex === 2) {
                        response.data.data[i].gender = "女"
                      } else if (response.data.data[i].sex === 0) {
                        response.data.data[i].gender = "所有"
                      }
                    }
                  }
                  that.tableData = response.data.data;
                }
              }).catch(error => {
                console.log(error);
              });
            } else {
              that.$message({
                message: response.data.msg,
                type: 'error'
              });
            }
          }).catch(function (error) {
            console.log(error);
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 根据身份证号(手机号)获取人员信息
    // getPersonInfo () {
    //   let that = this;
    //   http.getPersonInfo(that.ruleForm.companyCode, that.ruleForm.phone).then(response => {
    //     console.log(response);
    //     if (response.status === 200 && response.data.result === '00000000') {
    //       if (response.data.data.examTimes === 1) {
    //         that.ruleForm.examTimes = 1;
    //         console.log(this.ruleForm);
    //       } else if (response.data.data.examTimes > 1) {
    //         that.ruleForm = response.data.data;
    //         that.ruleForm.groupCode = parseInt(response.data.data.groupCode);
    //         that.ruleForm.personnelType = parseInt(response.data.data.personnelType);
    //         console.log(this.ruleForm);
    //       }
    //     }
    //   }).catch(error => {
    //     console.log(error);
    //   });
    // },
    // 点击表格中人员行获取详细信息
    handleRowClick (row, event, column) {
      console.log(row, event, column);
      let that = this;
      that.isDisabled = true;
      that.registrationNo = row.registrationNo;
      that.$refs.tables.setCurrentRow(row);
      http.registrationDetail(row.registrationNo).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.ruleForm = response.data.data;
          that.ruleForm.groupCode = parseInt(response.data.data.groupCode);
          console.log(that.ruleForm);
          that.getAllGroup(response.data.data.companyCode);
          that.saveDisabled = true;
          that.deleteDisabled = false;
          that.updateDisabled = false;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 刷新树结构
    reloadTree () {
      let that = this;
      Bus.$emit("loading1", true);
      http.companyGroupTree().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          Bus.$emit("reloadIndividualTree", response.data.data);
          Bus.$emit("loading2", false);
        }
      }).catch(error => {
        console.log(error);
      });
    }
  },
  mounted () {
    this.getRegistrationCode();
    this.getAllCompany();
    this.getExamCode();
    this.getExamType();
    this.getPersonalType();
    Bus.$on('tableData', (e) => {
      console.log(e, this.company);
      for (let i = 0; i < e.length; i++) {
        for (let j = 0; j < this.company.length; j++) {
          if (e[i].companyCode === this.company[j].code) {
            e[i].companyName = this.company[j].name;
          }
          if (e[i].sex === 1) {
            e[i].gender = "男"
          } else if (e[i].sex === 2) {
            e[i].gender = "女"
          } else if (e[i].sex === 0) {
            e[i].gender = "所有"
          }
        }
      }
      this.tableData = e;
    });
    Bus.$on("currentId", (e) => {
      this.currentId = e;
    });
    Bus.$on("saveDisabledIndividual", (e) => {
      this.saveDisabled = e;
    });
    Bus.$on("deleteDisabledIndividual", (e) => {
      this.deleteDisabled = e;
    });
    Bus.$on("updateDisabledIndividual", (e) => {
      this.updateDisabled = e;
    });
    Bus.$on("people", (e) => {
      this.people = e;
    });
    Bus.$on('companyExamTimeId', (e) => {
      this.ruleForm.companyExamTimes = e;
    });
  }
}
</script>

<style scoped>
  .rightForm{
    width: 83%;
    height: 98%;
    float: right;
    background: #fff;
    /*padding-top: 1%;*/
  }
  .rightForm .top{
    width: 100%;
    height: 35%;
    margin-bottom: 2%;
    overflow: hidden;
  }
  .rightForm .top .el-button{
    float:right;
    margin-left:10px;
    margin-bottom:5px;
  }
  .rightForm .top .el-form{
    height:60%;
    width:100%;
    overflow-y:auto;
    overflow-x:hidden;
    /*margin-bottom:2%;*/
    padding-right:1%;
  }
  .rightForm .top .title{
    text-align: left;
    text-indent: 20px;
    font-size: 12px;
    font-weight: bold;
  }
  .rightForm .bottom{
    width: 100%;
    height: 63%;
  }
  .rightForm .bottom .title{
    text-align:left;
    text-indent:20px;
    font-size:12px;
    font-weight:bold;
  }
  .el-select{
    width:100%;
  }
  .el-date-editor{
    width:100%;
  }
  .el-input-number{
    width:100%;
  }
  .el-table{
    font-size:12px;
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
