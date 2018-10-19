<template>
  <div class="rightForm">
    <!--对话框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定删除折扣种类？</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="deleteDiscount" size="small">确 定</el-button>
        </span>
    </el-dialog>
    <!--表单-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
      <el-row>
        <el-col :span="22">
          <el-form-item label="名称" prop="name" required>
            <el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item label="折扣模式" required prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择折扣模式" @change="chooseModel">
              <el-option
                v-for="item in discountModel"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item label="组合项目折扣" prop="disGroup" required>
            <el-input-number v-model="ruleForm.disGroup" controls-position="right" :max="100" :min="1" style="width:100%;" :disabled="groupDisabled"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item label="套餐折扣" prop="disPackage" required>
            <el-input-number v-model="ruleForm.disPackage" controls-position="right" :max="100" :min="1" style="width:100%;" :disabled="packageDisabled"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item label="总价折扣" prop="disPrice" required>
            <el-input-number v-model="ruleForm.disPrice" controls-position="right" :max="100" :min="1" style="width:100%;" :disabled="priceDisabled"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="操作员" prop="operator">
            <el-input type="text" v-model="operator" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="修改日期" prop="updatedAt">
            <el-input v-model="updatedAt" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <!--<el-form-item>-->
        <el-button type="primary" @click="resetForm('ruleForm')" size="small">增加</el-button>
        <el-button type="success" @click="submitForm('ruleForm')" size="small" :disabled="saveDisabled">保存</el-button>
        <el-button type="danger" @click="dialogVisible = true" size="small" :disabled="deleteDisabled">删除</el-button>
        <el-button type="warning" @click="updateForm('ruleForm')" size="small" :disabled="updateDisabled">修改</el-button>
        <el-button size="small" @click="reloadTree">刷新</el-button>
        <!--</el-form-item>-->
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item></el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item></el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import http from '@/api/index.js'
import Bus from '@/utils/bus.js'
import formatDate from '@/utils/formatDate.js'
export default {
  name: "discountForm",
  data () {
    return {
      ruleForm: {
        name: '',
        disGroup: '100',
        disPackage: '100',
        disPrice: '100',
        type: '',
        pid: 0
      },
      operator: '',
      updatedAt: '',
      currentId: '',
      dialogVisible: false,
      rules: {
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'}
        ],
        disGroup: [
          {required: true, message: '请输入组合项目折扣'}
        ],
        disPackage: [
          {required: true, message: '请输入套餐折扣'}
        ],
        disPrice: [
          {required: true, message: '请输入总价折扣'}
        ],
        type: [
          {required: true, message: '请选择折扣模式', trigger: 'blur'}
        ]
      },
      discountModel: [
        {id: 1, value: '组合项目折扣'},
        {id: 2, value: '套餐折扣'},
        {id: 3, value: '总价折扣'}
      ],
      groupDisabled: true,
      packageDisabled: true,
      priceDisabled: true,
      length: '',
      saveDisabled: false,
      deleteDisabled: true,
      updateDisabled: true,
      pid: ''
    };
  },
  methods: {
    // 增加折扣种类
    submitForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          if (that.length >= 1) {
            that.ruleForm.pid = that.pid;
          }
          http.addDiscount(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '添加折扣种类成功！',
                type: 'success'
              });
              that.resetForm('ruleForm');
              http.discountTree().then(function (response) {
                console.log(response);
                if (response.status === 200 && response.data.result === '00000000') {
                  Bus.$emit("addDiscountTree", response.data.data);
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
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields();
      this.saveDisabled = false;
      this.deleteDisabled = true;
      this.updateDisabled = true;
      this.operator = '';
      this.updatedAt = '';
    },
    // 删除折扣种类
    deleteDiscount () {
      let that = this;
      that.dialogVisible = false;
      http.deleteDiscount(this.currentId).then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.$message({
            message: '删除折扣种类成功！',
            type: 'success'
          });
          that.resetForm('ruleForm');
          http.discountTree().then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              Bus.$emit("deleteDiscountTree", response.data.data);
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
    // 修改折扣种类
    updateForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          http.updateDiscount(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '修改折扣种类成功！',
                type: 'success'
              });
              http.discountTree().then(function (response) {
                console.log(response);
                if (response.status === 200 && response.data.result === '00000000') {
                  Bus.$emit("updateDiscountTree", response.data.data);
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
    // 选择折扣模式
    chooseModel (data) {
      console.log(data);
      if (data === 1) {
        this.groupDisabled = false;
        this.packageDisabled = true;
        this.priceDisabled = true;
      } else if (data === 2) {
        this.groupDisabled = true;
        this.packageDisabled = false;
        this.priceDisabled = true;
      } else if (data === 3) {
        this.groupDisabled = true;
        this.packageDisabled = true;
        this.priceDisabled = false;
      }
    },
    // 获取顶层id
    getId () {
      let that = this;
      http.getAllDiscount().then(response => {
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
      http.discountTree().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.length = response.data.data.length;
          Bus.$emit("reloadDiscountTree", response.data.data);
          Bus.$emit("loading2", false);
        }
      }).catch(error => {
        console.log(error);
      });
    }
  },
  mounted () {
    this.getId();
    Bus.$on("length", (e) => {
      this.length = e;
    });
    Bus.$on("currentId", (e) => {
      this.currentId = e;
    });
    Bus.$on("discountDetail", (e) => {
      this.ruleForm = e;
      this.operator = e.operator;
      // let date = new Date(e.updatedAt);
      // let year = date.getFullYear();
      // let month = date.getMonth();
      // let day = date.getDate();
      this.updatedAt = formatDate(e.updatedAt);
      if (e.type === 1) {
        this.groupDisabled = false;
        this.packageDisabled = true;
        this.priceDisabled = true;
      } else if (e.type === 2) {
        this.groupDisabled = true;
        this.packageDisabled = false;
        this.priceDisabled = true;
      } else if (e.type === 3) {
        this.groupDisabled = true;
        this.packageDisabled = true;
        this.priceDisabled = false;
      }
    });
    Bus.$on("saveDisabledDiscount", (e) => {
      this.saveDisabled = e;
    });
    Bus.$on("deleteDisabledDiscount", (e) => {
      this.deleteDisabled = e;
    });
    Bus.$on("updateDisabledDiscount", (e) => {
      this.updateDisabled = e;
    });
  }
}
</script>

<style scoped>
  .rightForm{
    float:right;
    width:82%;
    height:90%;
    background:#fff;
    margin-left:2%;
    padding-right:1%;
    padding-top:20px;
    overflow:auto;
  }
  .el-radio-group{
    width:100%;
  }
  .el-select{
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

