<template>
  <div class="rightForm">
    <!--对话框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定删除体检套餐？</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="deletePackage" size="small">确 定</el-button>
        </span>
    </el-dialog>
    <!--表单-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="编号" prop="code" required>
            <el-input v-model="ruleForm.code" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="套餐名称" prop="name" required>
            <el-input v-model="ruleForm.name" placeholder="请输入套餐名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="简称" prop="abbreviation">
            <el-input v-model="ruleForm.abbreviation"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标准价格" prop="price" required>
            <el-input v-model.number="ruleForm.price" placeholder="请输入标准价格"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="打折" prop="discountPercentage" required>
            <el-select v-model="ruleForm.discountPercentage" filterable @change="selectDiscount">
              <el-option
                v-for="item in discountType"
                :key="item.id"
                :label="item.name"
                :value="item.disGroup">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="实际价格" prop="totalPrice" required>
            <el-input v-model.number="ruleForm.totalPrice" placeholder="请输入实际价格">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="显示顺序" prop="seq">
            <el-input v-model.number="ruleForm.seq" placeholder="请输入显示顺序"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="使用范围" prop="range">
            <el-input v-model="ruleForm.range" placeholder="请输入使用范围"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="性别" prop="sex" required>
            <el-select v-model="ruleForm.sex">
              <el-option
                v-for="item in sex"
                :key="item.id"
                :label="item.value"
                :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="ruleForm.remark" placeholder='请输入备注'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="操作员" prop="operator">
            <el-input type="text" v-model="operator" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="修改日期" prop="updatedAt">
            <el-input type="text" v-model="updatedAt" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <!--<el-col :span="24">-->
          <!--<el-form-item>-->
        <el-button type="primary" @click="resetForm('ruleForm')" size="small">增加</el-button>
        <el-button type="success" @click="submitForm('ruleForm')" size="small" :disabled="saveDisabled">保存</el-button>
        <el-button type="danger" @click="dialogVisible = true" size="small" :disabled="deleteDisabled">删除</el-button>
        <el-button type="warning" @click="updatePackage('ruleForm')" size="small" :disabled="updateDisabled">修改</el-button>
        <el-button size="small" @click="reloadTree">刷新</el-button>
          <!--</el-form-item>-->
        <!--</el-col>-->
      </el-row>
    </el-form>
  </div>
</template>

<script>
import http from '@/api/index.js'
import Bus from '@/utils/bus.js'
import formatDate from '@/utils/formatDate.js'
export default {
  name: "packageForm",
  data () {
    return {
      ruleForm: {
        code: '',
        name: '',
        abbreviation: '',
        price: '',
        discountPercentage: '',
        totalPrice: '',
        seq: '',
        range: '',
        sex: '',
        remark: '',
        pid: '0',
        examGroupItems: []
      },
      operator: '',
      updatedAt: '',
      rules: {
        name: [
          {required: true, message: '请输入套餐名称', trigger: 'blur'}
        ],
        price: [
          {required: true, message: '请输入标准价格', trigger: 'blur'},
          {type: 'number', message: '单价必须为数字', trigger: 'blur'}
        ],
        discountPercentage: [
          {required: true, message: '请输入折扣', trigger: 'blur'},
          {type: 'number', message: '折扣必须为数字', trigger: 'blur'}
        ],
        totalPrice: [
          {required: true, message: '请输入单价', trigger: 'blur'},
          {type: 'number', message: '单价必须为数字', trigger: 'blur'}
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ]
      },
      options: [],
      currentId: '',
      dialogVisible: false,
      sex: [
        {id: 1, value: '男'},
        {id: 2, value: '女'},
        {id: 0, value: '所有'}
      ],
      saveDisabled: false,
      deleteDisabled: true,
      updateDisabled: true,
      length: '',
      pid: '',
      discountType: []
    };
  },
  methods: {
    submitForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          if (that.length > 0) {
            that.ruleForm.pid = that.pid;
          }
          http.addPackage(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '添加体检套餐成功！',
                type: 'success'
              });
              that.resetForm('ruleForm');
              http.packageTree().then(function (response) {
                console.log(response);
                if (response.status === 200 && response.data.result === '00000000') {
                  Bus.$emit("addPackageTree", response.data.data);
                  that.length = response.data.data.length;
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
    resetForm (formName) {
      this.$refs[formName].resetFields();
      this.getCode();
      Bus.$emit('examItems', []);
      Bus.$emit("clear", []);
      this.operator = '';
      this.updatedAt = '';
      this.saveDisabled = false;
      this.deleteDisabled = true;
      this.updateDisabled = true;
    },
    handleChange (value) {
      console.log(value);
    },
    // 获取所有的组合项目的折扣模式
    getAllDiscount () {
      let that = this;
      http.discountType(1).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          let arr = [];
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].pid !== 0) {
              arr.push(response.data.data[i]);
            }
          }
          arr.unshift({id: 0, name: '无', disGroup: 100});
          that.discountType = arr;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 选择打折
    selectDiscount (data) {
      console.log(data);
      this.ruleForm.discountPercentage = data;
      this.ruleForm.totalPrice = this.ruleForm.price * this.ruleForm.discountPercentage / 100;
    },
    // 获取编号
    getCode () {
      let that = this;
      http.packageCode().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.ruleForm.code = response.data.data;
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    // 删除体检套餐
    deletePackage () {
      let that = this;
      that.dialogVisible = false;
      http.deletePackage(this.currentId).then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.$message({
            message: '删除体检套餐成功！',
            type: 'success'
          });
          that.resetForm('ruleForm');
          http.packageTree().then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              Bus.$emit('deletePackageTree', response.data.data);
              that.length = response.data.data.length;
            }
          }).catch(function (error) {
            console.log(error);
          });
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    // 修改体检套餐
    updatePackage (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          http.updatePackage(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '修改体检套餐成功！',
                type: 'success'
              });
              Bus.$emit('packageGroup', []);
              http.packageTree().then(function (response) {
                console.log(response);
                if (response.status === 200 && response.data.result === '00000000') {
                  Bus.$emit("updatePackageTree", response.data.data);
                  that.length = response.data.data.length;
                }
              }).catch(function (error) {
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
    // 获取顶级id
    getId () {
      let that = this;
      http.getAllPackage().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.pid = response.data.data[0].id;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 刷新树结构
    reloadTree () {
      let that = this;
      Bus.$emit("loading1", true);
      http.packageTree().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.length = response.data.data.length;
          Bus.$emit("reloadPackageTree", response.data.data);
          Bus.$emit("loading2", false);
        }
      }).catch(function (error) {
        console.log(error);
      })
    }
  },
  created () {
    this.getCode();
    this.getId();
    this.getAllDiscount();
    let that = this;
    Bus.$on('packageForm', (e) => {
      that.ruleForm = e;
      // let date = new Date(e.updatedAt);
      // let year = date.getFullYear();
      // let month = date.getMonth() + 1;
      // let day = date.getDate();
      this.operator = e.operator;
      this.updatedAt = formatDate(e.updatedAt);
      console.log(e);
    });
    Bus.$on('packageId', (e) => {
      that.currentId = e;
      console.log(e);
    });
    Bus.$on('examGroupItems', (e) => {
      that.ruleForm.examGroupItems = e;
    });
    Bus.$on("saveDisabledPackage", (e) => {
      this.saveDisabled = e;
    });
    Bus.$on("deleteDisabledPackage", (e) => {
      this.deleteDisabled = e;
    });
    Bus.$on("updateDisabledPackage", (e) => {
      this.updateDisabled = e;
    });
    Bus.$on("length", (e) => {
      this.length = e;
    });
  }
}
</script>

<style scoped>
  .rightForm{
    float:left;
    width:68%;
    height:100%;
    background:#fff;
    padding-right:1%;
    /*padding-top:20px;*/
    overflow:auto;
    overflow-x:hidden;
  }
  .el-radio-group{
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
