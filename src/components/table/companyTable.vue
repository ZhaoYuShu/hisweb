<template>
  <div class="tables">
    <!--对话框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定删除体检单位？</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="confirmDelete" size="small">确 定</el-button>
        </span>
    </el-dialog>
    <!--新增弹出框-->
    <el-dialog title="新增单位体检记录" :visible.sync="dialogFormVisible1">
      <el-form :model="form1" ref="form1" :rules="rules" class="demo-form1" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="单位编号" prop="companyCode">
              <el-input v-model="form1.companyCode" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位体检次数" prop="companyExamTimes">
              <el-input v-model="form1.companyExamTimes" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="单位名称" prop="companyName">
              <el-input v-model="form1.companyName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开始日期" prop="beginDate">
              <el-date-picker
                v-model="form1.beginDate"
                type="date"
                placeholder="请选择开始日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="结束日期" prop="endDate">
              <el-date-picker
                v-model="form1.endDate"
                type="date"
                placeholder="请选择结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="折扣方式" prop="discountType">
              <el-select v-model="form1.discountType" filterable placeholder="请选择折扣方式" @change="handleSelect">
                <el-option
                  v-for="item in discountType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="折扣" prop="discount">
              <el-input v-model="form1.discount" placeholder="请输入折扣"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结算方式" prop="balanceType">
              <el-select v-model="form1.balanceType" filterable placeholder="请选择结算方式">
                <el-option
                  v-for="item in balanceType"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmAdd('form1')" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改弹出框-->
    <el-dialog title="修改单位体检记录" :visible.sync="dialogFormVisible2">
      <el-form :model="form2" ref="form2" :rules="rules" label-width="100px" class="demo-form2">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="单位编号" prop="companyCode">
              <el-input v-model="form2.companyCode" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位体检次数" prop="companyExamTimes">
              <el-input v-model="form2.companyExamTimes" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="单位名称" prop="companyName">
              <el-input v-model="form2.companyName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开始日期" prop="beginDate">
              <el-date-picker
                v-model="form2.beginDate"
                type="date"
                placeholder="请选择开始日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="结束日期" prop="endDate">
              <el-date-picker
                v-model="form2.endDate"
                type="date"
                placeholder="请选择结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="折扣方式" prop="discountType">
              <el-select v-model="form2.discountType" filterable placeholder="请选择折扣方式">
                <el-option
                  v-for="item in discountType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="折扣" prop="discount">
              <el-input v-model="form2.discount" placeholder="请输入折扣"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结算方式" prop="balanceType">
              <el-select v-model="form2.balanceType" filterable placeholder="请选择结算方式">
                <el-option
                  v-for="item in balanceType"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmUpdate('form2')" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <el-table
      :data="tableData"
      border
      height="90%"
      style="width:100%;">
      <el-table-column
        label="单位编号"
        prop="companyCode"
        width="120"
        align="left">
      </el-table-column>
      <el-table-column
        label="单位体检次数"
        prop="companyExamTimes"
        width="120"
        align="left">
      </el-table-column>
      <el-table-column
        label="开始日期"
        prop="beginDate"
        width="200"
        align="left">
      </el-table-column>
      <el-table-column
        label="结束日期"
        prop="endDate"
        width="200"
        align="left">
      </el-table-column>
      <el-table-column
        label="操作人"
        prop="operator"
        width="140"
        align="left">
      </el-table-column>
      <el-table-column
        label="创建日期"
        prop="createdAt"
        width="200"
        align="left">
      </el-table-column>
      <el-table-column
        label="折扣方式"
        prop="discountName"
        width="120"
        align="left">
      </el-table-column>
      <el-table-column
        label="折扣"
        prop="discount"
        width="120"
        align="left">
      </el-table-column>
      <el-table-column
        label="折扣金额"
        prop="discountPrice"
        width="120"
        align="left">
      </el-table-column>
      <el-table-column
        label="折扣人员"
        prop="disOperator"
        width="120"
        align="left">
      </el-table-column>
      <el-table-column
        label="折扣日期"
        prop="disDate"
        width="200"
        align="left">
      </el-table-column>
      <el-table-column
        label="结算方式"
        prop="balanceName"
        width="150"
        align="left">
      </el-table-column>
      <el-table-column
        label="收费流水号"
        prop="chargeNo"
        width="200"
        align="left">
      </el-table-column>
      <el-table-column
        label="应收账款"
        prop="receivable"
        width="120"
        align="left">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button @click="deleteCompanyExamRecord(scope.row)" type="danger" size="small">删除</el-button>
          <el-button type="warning" size="small" @click="updateForm(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" style="margin-top:20px;margin-bottom:200px;">
      <el-button type="primary" size="small" @click="dialogFormVisible1 = true">增加</el-button>
    </el-row>
  </div>
</template>

<script>
import http from '@/api/index.js'
import Bus from '@/utils/bus.js'
export default {
  name: "companyTable",
  data () {
    return {
      tableData: [],
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogVisible: false,
      form1: {
        companyCode: '', // 单位编号
        companyExamTimes: '', // 单位体检次数
        companyName: '', // 单位名称
        beginDate: '', // 开始时间
        endDate: '', // 结束时间
        discountType: '', // 折扣方式
        discount: 100, // 折扣
        balanceType: '' // 结算方式
      },
      form2: {
        companyCode: '', // 单位编号
        companyExamTimes: '', // 单位体检次数
        companyName: '', // 单位名称
        beginDate: '', // 开始时间
        endDate: '', // 结束时间
        discountType: '', // 折扣方式
        discount: '', // 折扣
        balanceType: '' // 结算方式
      },
      rules: {
        companyCode: [
          {required: true, message: '单位不能为空'}
        ],
        beginDate: [
          {required: true, message: '开始日期不能为空', trigger: 'change'}
        ],
        endDate: [
          {required: true, message: '结束日期不能为空', trigger: 'change'}
        ],
        companyExamTimes: [
          {required: true, message: '单位体检次数不能为空'}
        ]
      },
      discountType: [],
      balanceType: [
        {id: 2, value: '单位结账'},
        {id: 1, value: '个人结账'}
      ],
      currentCode: '',
      recordId: ''
    }
  },
  methods: {
    // 确定新增单位体检记录
    confirmAdd (formName) {
      let that = this;
      that.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("submit!");
          http.addCompanyExamRecord(that.form1).then(response => {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '添加单位体检记录成功！',
                type: 'success'
              });
              that.resetForm('form1');
              console.log(that.form1.companyCode, that.currentCode);
              http.companyExamRecordList(that.currentCode).then(response => {
                console.log(response);
                if (response.status === 200 && response.data.result === '00000000') {
                  for (let i = 0; i < response.data.data.length; i++) {
                    response.data.data[i].beginDate = that.formattedDate(response.data.data[i].beginDate);
                    response.data.data[i].endDate = that.formattedDate(response.data.data[i].endDate);
                    response.data.data[i].createdAt = that.formattedDate(response.data.data[i].createdAt);
                    response.data.data[i].disDate = that.formattedDate(response.data.data[i].disDate);
                    if (response.data.data[i].balanceType === 2) {
                      response.data.data[i].balanceName = '单位结账';
                    } else if (response.data.data[i].balanceType === 1) {
                      response.data.data[i].balanceName = "个人结账";
                    }
                  }
                  for (let i = 0; i < response.data.data.length; i++) {
                    for (let j = 0; j < this.discountType.length; j++) {
                      if (response.data.data[i].discountType === 0) {
                        response.data.data[i].discountName = '无';
                      } else if (response.data.data[i].discountType === this.discountType[j].id) {
                        response.data.data[i].discountName = this.discountType[j].name;
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
          }).catch(error => {
            console.log(error);
          });
          this.dialogFormVisible1 = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 增加（重置）
    resetForm (formName) {
      let that = this;
      that.$refs[formName].resetFields();
      // 获取单位体检次数
      http.companyExamRecordTimes(that.form1.companyCode).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.form1.companyExamTimes = response.data.data.times;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 修改单位体检记录
    updateForm (row) {
      console.log(row);
      let that = this;
      this.dialogFormVisible2 = true;
      http.companyExamRecordDetail(row.id).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.form2.companyCode = response.data.data.companyCode;
          that.form2.companyExamTimes = response.data.data.companyExamTimes;
          that.form2.beginDate = response.data.data.beginDate;
          that.form2.endDate = response.data.data.endDate;
          that.form2.discountType = response.data.data.discountType;
          that.form2.discount = response.data.data.discount;
          that.form2.balanceType = response.data.data.balanceType;
          that.form2.id = row.id;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 确定修改单位体检记录
    confirmUpdate (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          http.updateCompanyExamRecord(that.form2).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '修改单位体检记录成功！',
                type: 'success'
              });
              that.dialogFormVisible2 = false;
              http.companyExamRecordList(that.currentCode).then(response => {
                console.log(response);
                if (response.status === 200 && response.data.result === '00000000') {
                  for (let i = 0; i < response.data.data.length; i++) {
                    response.data.data[i].beginDate = that.formattedDate(response.data.data[i].beginDate);
                    response.data.data[i].endDate = that.formattedDate(response.data.data[i].endDate);
                    response.data.data[i].createdAt = that.formattedDate(response.data.data[i].createdAt);
                    response.data.data[i].disDate = that.formattedDate(response.data.data[i].disDate);
                    if (response.data.data[i].balanceType === 2) {
                      response.data.data[i].balanceName = '单位结账';
                    } else if (response.data.data[i].balanceType === 1) {
                      response.data.data[i].balanceName = "个人结账";
                    }
                  }
                  for (let i = 0; i < response.data.data.length; i++) {
                    for (let j = 0; j < that.discountType.length; j++) {
                      if (response.data.data[i].discountType === 0) {
                        response.data.data[i].discountName = '无';
                      } else if (response.data.data[i].discountType === that.discountType[j].id) {
                        response.data.data[i].discountName = that.discountType[j].name;
                      }
                    }
                  }
                  that.tableData = response.data.data;
                  console.log(that.tableData);
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
    // 删除单位体检记录
    deleteCompanyExamRecord (row) {
      console.log(row);
      this.recordId = row.id;
      this.dialogVisible = true;
    },
    // 确定删除单位体检记录
    confirmDelete () {
      let that = this;
      http.deleteCompanyExamRecord(that.recordId).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.$message({
            message: '删除单位体检记录成功！',
            type: 'success'
          });
          // 重新获取该单位体检次数
          http.companyExamRecordTimes(that.currentCode).then(response => {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.form1.companyExamTimes = response.data.data.times;
            }
          }).catch(error => {
            console.log(error);
          });
          that.dialogVisible = false;
          http.companyExamRecordList(that.currentCode).then(response => {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              for (let i = 0; i < response.data.data.length; i++) {
                response.data.data[i].beginDate = that.formattedDate(response.data.data[i].beginDate);
                response.data.data[i].endDate = that.formattedDate(response.data.data[i].endDate);
                response.data.data[i].createdAt = that.formattedDate(response.data.data[i].createdAt);
                response.data.data[i].disDate = that.formattedDate(response.data.data[i].disDate);
                if (response.data.data[i].balanceType === 2) {
                  response.data.data[i].balanceName = '单位结账';
                } else if (response.data.data[i].balanceType === 1) {
                  response.data.data[i].balanceName = "个人结账";
                }
              }
              for (let i = 0; i < response.data.data.length; i++) {
                for (let j = 0; j < this.discountType.length; j++) {
                  if (response.data.data[i].discountType === 0) {
                    response.data.data[i].discountName = '无';
                  } else if (response.data.data[i].discountType === this.discountType[j].id) {
                    response.data.data[i].discountName = this.discountType[j].name;
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
      }).catch(error => {
        console.log(error);
      });
    },
    // 格式化日期
    formattedDate (timeStamp) {
      if (timeStamp) {
        let date = new Date(timeStamp);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let result = year + '/' + month + '/' + day;
        return result;
      } else {
        return '';
      }
    },
    // 获取所有折扣种类
    getAllDiscount () {
      let that = this;
      http.getAllDiscount().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          let obj = [];
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].pid !== 0) {
              obj.push(response.data.data[i]);
            }
          }
          obj.unshift({id: 0, name: '无'});
          that.discountType = obj;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 选择折扣方式，并且获取对应的折扣信息
    handleSelect (value) {
      let that = this;
      console.log(value);
      if (value === 0) {
        that.form1.discount = 100;
        return;
      }
      http.discountDetail(value).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          // 1是组合项目折扣，2是套餐折扣，3是总价折扣
          if (response.data.data.type === 1) {
            that.form1.discount = response.data.data.disGroup;
          } else if (response.data.data.type === 2) {
            that.form1.discount = response.data.data.disPackage;
          } else if (response.data.data.type === 3) {
            that.form1.discount = response.data.data.disPrice;
          }
        }
      }).catch(error => {
        console.log(error);
      });
    }
  },
  mounted () {
    this.getAllDiscount();
    // 获取单位体检次数
    Bus.$on("times", (e) => {
      this.form1.companyExamTimes = e;
    });
    // 获取体检单位编号
    Bus.$on("companyCode", (e) => {
      this.form1.companyCode = e;
      this.currentCode = e;
    });
    // 获取单位名称
    Bus.$on("companyName", (e) => {
      this.form1.companyName = e;
      this.form2.companyName = e;
    });
    // 获取体检单位记录
    Bus.$on("companyExamRecordList", (e) => {
      for (let i = 0; i < e.length; i++) {
        e[i].beginDate = this.formattedDate(e[i].beginDate);
        e[i].endDate = this.formattedDate(e[i].endDate);
        e[i].createdAt = this.formattedDate(e[i].createdAt);
        e[i].disDate = this.formattedDate(e[i].disDate);
        if (e[i].balanceType === 2) {
          e[i].balanceName = '单位结账';
        } else if (e[i].balanceType === 1) {
          e[i].balanceName = "个人结账";
        }
      }
      // 转换折扣方式
      for (let i = 0; i < e.length; i++) {
        for (let j = 0; j < this.discountType.length; j++) {
          if (e[i].discountType === 0) {
            e[i].discountName = '无';
          } else if (e[i].discountType === this.discountType[j].id) {
            e[i].discountName = this.discountType[j].name;
          }
        }
      }
      this.tableData = e;
    });
  }
}
</script>

<style scoped>
  .tables{
    width:100%;
    height:100%;
  }
  .el-select{
    width:100%;
  }
  .el-date-editor{
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

