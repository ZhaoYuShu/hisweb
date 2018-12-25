<!--个人体检登记-->
<template>
  <div class="container">
    <div class="package">
      <!--<el-row :gutter="20" style="display:flex;align-items:center;">-->
        <!--<el-col :span="6">-->
          <!--<h5 class="title">已选套餐</h5>-->
        <!--</el-col>-->
        <!--<el-col :span="17">-->
          <!--<el-input v-model="selectedPackage" placeholder="请选择套餐"></el-input>-->
        <!--</el-col>-->
      <!--</el-row>-->
      <el-table
        height="90%"
        :data="tableData"
        style="width:96%;margin:0 auto;margin-top:20px;"
        border>
        <el-table-column
          width="60">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio" @change.native="getCurrentRow(scope.$index, scope.row)">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="可选套餐"
          align="left">
        </el-table-column>
      </el-table>
    </div>
    <div class="exam">
      <el-row>
        <el-col>
          <p></p>
        </el-col>
      </el-row>
      <el-transfer
        filterable
        :filter-method="filterMethod"
        :titles="['未选项目', '已选项目']"
        filter-placeholder="请输入项目拼音"
        v-model="value2"
        :data="data2"
        @change="changeProjects">
      </el-transfer>
    </div>
    <div class="price">
      <p class="title">费用信息</p>
      <el-table
        :data="tableData2"
        border
        height="85%"
        style="width:96%;margin:10px auto;"
        show-summary>
        <el-table-column
          label="体检项目"
          prop="name"
          width="200"
          align="left">
        </el-table-column>
        <el-table-column
          label="价格"
          prop="realPrice"
          align="left">
        </el-table-column>
      </el-table>
    </div>
    <div class="message">
      <el-row style="display:flex;align-items:center;margin-bottom:10px;">
        <el-col :span="24">
          <p class="title">人员信息</p>
        </el-col>
      </el-row>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="身份证号" prop="idCard">
              <el-input v-model="ruleForm.idCard" placeholder="请输入身份证号" @keyup.enter.native="getMessages"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="体检编号" prop="code">
              <el-input v-model="ruleForm.code" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="体检次数" prop="examTimes">
              <el-input v-model="ruleForm.examTimes" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="体检日期" prop="preExamDay">
              <el-date-picker
                v-model="ruleForm.preExamDay"
                type="date"
                placeholder="请选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
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
            <el-form-item label="出生日期" prop="birthday">
              <el-date-picker
                v-model="ruleForm.birthday"
                type="date"
                placeholder="请选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="ruleForm.age" placeholder="请输入年龄"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <!--<el-col :span="6">-->
            <!--<el-form-item label="单位" prop="companyCode">-->
              <!--<el-input v-model="companyName" disabled></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="6">-->
            <!--<el-form-item label="单位分组" prop="groupCode">-->
              <!--<el-input v-model="groupName" disabled></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="6">
            <el-form-item label="是否为VIP" prop="isVip">
              <el-radio-group v-model="ruleForm.isVip">
                <el-radio
                  v-for="item in isVip"
                  :key="item.id"
                  :label="item.id"
                  @change="handleChange">
                  {{item.value}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="ruleForm.phone" placeholder="请输入联系电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="标签个数" prop="labelNum">
              <el-input v-model="ruleForm.labelNum" placeholder="请输入标签个数"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="婚姻状况" prop="isMarried">
              <el-select v-model="ruleForm.isMarried" placeholder="请选择婚姻状况">
                <el-option
                  v-for="item in maritalStatus"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <!--<el-col :span="6">-->
            <!--<el-form-item label="联系地址" prop="address">-->
              <!--<el-input v-model="ruleForm.address" placeholder="请输入联系地址"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="6">
            <el-form-item label="人员类别" prop="personnelType">
              <el-select v-model="ruleForm.personnelType" filterable placeholder="请选择人员类别">
                <el-option
                  v-for="item in personalCategory"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="体检类别" prop="examType">
              <el-select v-model="ruleForm.examType" filterable placeholder="请选择体检类别">
                <el-option
                  v-for="item in medicalCategory"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="打折比例" prop="discount">
              <el-input v-model="ruleForm.discount" :disabled="isDisabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="实收金额" prop="realPrice">
              <el-input v-model="ruleForm.realPrice" placeholder="请输入实收金额"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-form-item>
              <el-button type="primary" size="small" @click="submitRegistration('ruleForm')">保存</el-button>
            </el-form-item>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import http from '@/api/index.js'
export default {
  name: "registration",
  data () {
    return {
      selectedPackage: '',
      packageId: '',
      data2: [],
      value2: [],
      filterMethod (query, item) {
        return item.alphabeticBrevityCode.indexOf(query) > -1;
      },
      ruleForm: {
        code: '', // 体检编号
        preExamDay: '', // 体检日期
        examTimes: '', // 体检次数
        sex: '', // 性别
        birthday: '', // 生日
        age: '', // 年龄
        isVip: 0, // 是否为vip
        isMarried: '', // 婚姻状况
        idCard: '', // 身份证号
        phone: '', // 手机号
        address: '', // 联系地址
        referrer: '', // 联系人
        email: '', // 邮箱
        examType: '', // 体检类别
        personnelType: '', // 人员类别
        medicalInsurance: '',
        discount: 100, // 折扣
        realPrice: '', // 实收金额
        labelNum: '', // 标签个数
        examGroupItemResultDtoList: [], // 组合项目
        sumPrice: 0, // 合计金额
        companyCode: '', // 单位
        groupCode: '' // 单位分组
      },
      // companyName: '个人单位', // 单位名称
      // groupName: '个人体检', // 单位分组名称
      examGroupItems: [],
      tableData: [],
      tableData2: [],
      rules: {
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        code: [
          {required: true}
        ],
        examTimes: [
          {required: true}
        ],
        preExamDay: [
          {required: true, message: '请选择体检日期', trigger: 'change'}
        ],
        // idCard: [
        //   {required: true, message: '请输入身份证号', trigger: 'blur'}
        // ],
        personnelType: [
          {required: true, message: '请选择人员类别', trigger: 'change'}
        ],
        examType: [
          {required: true, message: "请选择体检类别", trigger: 'change'}
        ],
        discount: [
          {required: true, message: '请输入打折比例', trigger: 'blur'}
        ],
        realPrice: [
          {required: true, message: '请输入实收金额', trigger: 'blur'}
        ]
      },
      sex: [
        {id: 1, value: '男'},
        {id: 2, value: '女'},
        {id: 0, value: '所有'}
      ],
      maritalStatus: [
        {id: 0, value: '未婚'},
        {id: 1, value: '已婚'}
      ],
      medicalCategory: [],
      personalCategory: [],
      medicalInsurance: [
        {id: 0, value: '否'},
        {id: 1, value: '是'}
      ],
      isVip: [
        {id: 0, value: '否'},
        {id: 1, value: '是'}
      ],
      radio: '',
      isDisabled: true
    }
  },
  methods: {
    handleChange (value) {
      console.log(value);
      if (value === 0) {
        this.isDisabled = true;
      } else if (value === 1) {
        this.isDisabled = false;
      }
    },
    // 根据身份证号获取人员信息
    getMessages () {
      let that = this;
      http.getInfo(this.ruleForm.idCard).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          let date = new Date(response.data.data.birthday);
          console.log(date);
          that.ruleForm.age = response.data.data.age;
          that.ruleForm.birthday = date;
          that.ruleForm.code = response.data.data.code;
          that.ruleForm.examTimes = response.data.data.examTimes;
          that.ruleForm.sex = response.data.data.sex;
        } else {
          that.$message({
            message: response.data.data,
            type: 'error'
          });
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 获取体检类别
    getExamType () {
      http.getAllExamType().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          let arr = [];
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].pid !== 0) {
              arr.push(response.data.data[i]);
            }
          }
          this.medicalCategory = arr;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 获取人员类别
    getPersonnelType () {
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
          that.personalCategory = arr;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 获取所有套餐
    getAllPackage () {
      let that = this;
      http.getAllPackage().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          let arr = [];
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].pid !== 0) {
              arr.push(response.data.data[i]);
            }
          }
          that.tableData = arr;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 获取所有组合项目
    getAllGroup () {
      let that = this;
      http.allGroup().then(response => {
        console.log(response);
        that.data2 = [];
        if (response.status === 200 && response.data.result === '00000000') {
          for (let i = 0; i < response.data.data.length; i++) {
            let obj = {};
            obj.label = response.data.data[i].name;
            obj.key = response.data.data[i].code;
            obj.price = response.data.data[i].price;
            obj.discount = response.data.data[i].discount;
            obj.realPrice = response.data.data[i].realPrice;
            obj.alphabeticBrevityCode = response.data.data[i].alphabeticBrevityCode;
            that.data2.push(obj);
          }
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 双击选择套餐并且获取相应的组合项目,根据套餐id获取标签个数
    // handleDbClick (row, event) {
    //   let that = this;
    //   console.log(row, event);
    //   that.selectedPackage = row.name;
    //   that.packageId = row.id;
    //   // 根据套餐id获取组合项目
    //   http.packageDetail(that.packageId).then(response => {
    //     console.log(response);
    //     that.value2 = [];
    //     that.ruleForm.sumPrice = 0;
    //     that.examGroupItems = response.data.data.examGroupItems;
    //     that.tableData2 = response.data.data.examGroupItems;
    //     that.ruleForm.examGroupItemResultDtoList = response.data.data.examGroupItems;
    //     for (let i = 0; i < that.examGroupItems.length; i++) {
    //       // let obj = {};
    //       // obj.label = that.examGroupItems[i].name;
    //       // obj.key = that.examGroupItems[i].code;
    //       // obj.price = that.examGroupItems[i].price;
    //       // obj.discount = that.examGroupItems[i].discount;
    //       // obj.realPrice = that.examGroupItems[i].realPrice;
    //       that.value2.push(that.examGroupItems[i].code);
    //     }
    //     for (let n = 0; n < that.tableData2.length; n++) {
    //       that.ruleForm.sumPrice += that.tableData2[n].realPrice;
    //     }
    //   }).catch(error => {
    //     console.log(error);
    //   });
    //   // 根据套餐id获取标签个数
    //   http.getLabelNum(that.packageId).then(response => {
    //     console.log(response);
    //     if (response.status === 200 && response.data.result === '00000000') {
    //       that.ruleForm.labelNum = response.data.data.length;
    //     }
    //   }).catch(error => {
    //     console.log(error);
    //   });
    // },
    // 选择组合项目
    changeProjects (value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
      let that = this;
      that.value2 = value;
      that.ruleForm.examGroupItemResultDtoList = [];
      that.ruleForm.sumPrice = 0;
      console.log(that.data2);
      for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < that.data2.length; j++) {
          let obj = {};
          if (value[i] === that.data2[j].key) {
            obj.name = that.data2[j].label;
            obj.code = that.data2[j].key;
            obj.discount = that.data2[j].discount;
            obj.price = that.data2[j].price;
            obj.realPrice = that.data2[j].realPrice;
            that.ruleForm.examGroupItemResultDtoList.push(obj);
          }
        }
      }
      console.log(that.ruleForm.examGroupItemResultDtoList);
      that.tableData2 = that.ruleForm.examGroupItemResultDtoList;
      for (let m = 0; m < that.tableData2.length; m++) {
        that.ruleForm.sumPrice += that.tableData2[m].realPrice;
      }
    },
    // 保存登记
    submitRegistration (formName) {
      let that = this;
      that.$refs[formName].validate((valid) => {
        if (valid) {
          if (that.selectedPackage === '') {
            that.$message({
              message: '请选择体检套餐',
              type: 'error'
            });
            return false;
          }
          if (that.tableData2.length === 0) {
            that.$message({
              message: '请选择体检项目',
              type: 'error'
            });
            return false;
          }
          console.log("submit!");
          http.addExamRecord(that.ruleForm).then(response => {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '登记成功',
                type: 'success'
              });
              that.resetForm('ruleForm');
              that.ruleForm.isVip = 0;
            } else {
              that.$message({
                message: response.data.msg,
                type: 'error'
              });
            }
          }).catch(error => {
            console.log(error);
          });
        } else {
          console.log("error submit!");
          return false;
        }
      })
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields();
      this.selectedPackage = '';
      this.tableData2 = [];
      this.getAllGroup();
      this.value2 = [];
      this.getAllCompany();
      this.ruleForm.sumPrice = 0;
      this.radio = '';
    },
    // 获取全部单位,获取全部单位分组
    getAllCompany () {
      let that = this;
      http.getAllCompany().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          let arr = response.data.data;
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].name === '个人单位') {
              that.ruleForm.companyCode = arr[i].code;
              break;
            }
          }
          http.getAllCompanyGroup(that.ruleForm.companyCode).then(response => {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.ruleForm.groupCode = response.data.data.companyGroups[0].code;
            }
          }).catch(error => {
            console.log(error);
          });
        }
        console.log(that.ruleForm.companyCode);
      }).catch(error => {
        console.log(error);
      });
    },
    getCurrentRow (index, row) {
      this.radio = index;
      let that = this;
      console.log(row);
      that.selectedPackage = row.name;
      that.packageId = row.id;
      // 根据套餐id获取组合项目
      http.packageDetail(that.packageId).then(response => {
        console.log(response);
        that.value2 = [];
        that.ruleForm.sumPrice = 0;
        that.examGroupItems = response.data.data.examGroupItems;
        that.tableData2 = response.data.data.examGroupItems;
        that.ruleForm.examGroupItemResultDtoList = response.data.data.examGroupItems;
        for (let i = 0; i < that.examGroupItems.length; i++) {
          // let obj = {};
          // obj.label = that.examGroupItems[i].name;
          // obj.key = that.examGroupItems[i].code;
          // obj.price = that.examGroupItems[i].price;
          // obj.discount = that.examGroupItems[i].discount;
          // obj.realPrice = that.examGroupItems[i].realPrice;
          that.value2.push(that.examGroupItems[i].code);
        }
        for (let n = 0; n < that.tableData2.length; n++) {
          that.ruleForm.sumPrice += that.tableData2[n].realPrice;
        }
      }).catch(error => {
        console.log(error);
      });
      // 根据套餐id获取标签个数
      http.getLabelNum(that.packageId).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.ruleForm.labelNum = response.data.data.length;
        }
      }).catch(error => {
        console.log(error);
      });
    }
  },
  mounted () {
    this.getExamType();
    this.getPersonnelType();
    this.getAllPackage();
    this.getAllGroup();
    this.getAllCompany();
  }
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:hidden;
  }
  .container .package{
    width:20%;
    height:60%;
    background:#fff;
    overflow:auto;
    overflow-x:hidden;
    float:left;
    margin-bottom:1%;
  }
  .container .package .title{
    text-align:left;
    text-indent:20px;
  }
  .container .price{
    width:20%;
    height:60%;
    background:#fff;
    overflow:auto;
    float:left;
  }
  .container .price .title{
    text-align:left;
    text-indent:20px;
    font-size:12px;
    font-weight:bold;
  }
  .container .exam{
    width:59%;
    height:60%;
    background:#fff;
    overflow:auto;
    float:left;
    margin-bottom:1%;
  }
  .container .message{
    width:100%;
    height:39%;
    background:#fff;
    overflow:hidden;
    float:right;
  }
  .container .message .title{
    font-size:12px;
    font-weight:bold;
    text-align:left;
    text-indent:20px;
  }
  .container .message .demo-ruleForm{
    width:100%;
    height:90%;
    overflow:hidden;
    overflow-y:auto;
  }
  .el-select{
    width:100%;
  }
  .el-table{
    font-size:12px;
  }
  .el-transfer{
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

<style scoped>
  >>>.el-date-editor{
    width:90%!important;
  }
</style>
<style scoped>
  >>>.el-transfer{
    width:100%;
    height:90%;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  >>>.el-transfer-panel{
    width:35%;
    height:100%;
    margin-top:0;
  }
  >>>.el-transfer-panel__body{
    height:90%;
  }
  >>>.el-transfer-panel__list.is-filterable{
    height:85%;
  }
  >>>.el-table td, >>>.el-table th{
    padding:0.8vh 0;
  }
  >>>.el-form-item__label{
    font-size:12px;
  }
  >>>.el-input__inner{
    height:35px;
    line-height:35px;
  }
  >>>.el-checkbox__label{
    font-size:12px;
  }
</style>
<style scoped>
  >>> .el-input{
    width:90%;
  }
</style>
