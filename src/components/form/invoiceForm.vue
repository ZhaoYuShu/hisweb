<template>
  <div class="rightForm">
    <!--对话框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定删除发票项目？</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="deleteInvoice" size="small">确 定</el-button>
        </span>
    </el-dialog>
    <!--表单-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
      <el-row>
        <el-col :span="22">
          <el-form-item label="编号" prop="code" :span="12" required>
            <el-input v-model.number="ruleForm.code" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item label="显示顺序" prop="seq">
            <el-input v-model.number="ruleForm.seq"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item label="名称" required prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item label="启用标志" prop="actived">
            <el-radio-group v-model="ruleForm.actived">
              <el-radio
                v-for="item in start"
                :key="item.id"
                :label="item.id">
                {{item.value}}
              </el-radio>
            </el-radio-group>
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
        <!--<el-col :span="24">-->
          <!--<el-form-item>-->
        <el-button type="primary" @click="resetForm('ruleForm')" size="small">增加</el-button>
        <el-button type="success" @click="submitForm('ruleForm')" size="small" :disabled="saveDisabled">保存</el-button>
        <el-button type="danger" @click="dialogVisible = true" size="small" :disabled="deleteDisabled">删除</el-button>
        <el-button type="warning" @click="updateForm('ruleForm')" size="small" :disabled="updateDisabled">修改</el-button>
        <el-button size="small" @click="reloadTree">刷新</el-button>
          <!--</el-form-item>-->
        <!--</el-col>-->
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
  name: "invoiceForm",
  data () {
    return {
      ruleForm: {
        code: '',
        seq: '',
        name: '',
        pid: 0,
        actived: ''
      },
      operator: '',
      updatedAt: '',
      currentId: '',
      dialogVisible: false,
      rules: {
        seq: [
          { required: true, message: '请输入显示顺序', trigger: 'blur' },
          {type: 'number', message: '显示顺序必须为数字', trigger: 'blur'}
        ],
        name: [
          { required: true, message: '请输入科室名称', trigger: 'blur' }
        ]
      },
      start: [
        {id: 1, value: '是'},
        {id: 0, value: '否'}
      ],
      length: '',
      saveDisabled: false,
      deleteDisabled: true,
      updateDisabled: true,
      pid: ''
    };
  },
  methods: {
    // 增加发票项目
    submitForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          if (that.length >= 1) {
            that.ruleForm.pid = that.pid;
          }
          http.addInvoice(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '添加发票项目成功！',
                type: 'success'
              });
              that.resetForm('ruleForm');
              http.invoiceTree().then(function (response) {
                console.log(response);
                if (response.status === 200 && response.data.result === '00000000') {
                  Bus.$emit('addInvoiceTree', response.data.data);
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
      this.getCode();
      this.saveDisabled = false;
      this.deleteDisabled = true;
      this.updateDisabled = true;
      this.operator = '';
      this.updatedAt = '';
    },
    // 删除发票项目
    deleteInvoice () {
      let that = this;
      that.dialogVisible = false;
      http.deleteInvoice(that.currentId).then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.$message({
            message: '删除发票项目成功！',
            type: 'success'
          });
          that.resetForm('ruleForm');
          http.invoiceTree().then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              Bus.$emit("deleteInvoiceTree", response.data.data);
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
    // 修改发票项目
    updateForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          http.updateInvoice(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '修改发票项目成功！',
                type: 'success'
              });
              http.invoiceTree().then(function (response) {
                console.log(response);
                if (response.status === 200 && response.data.result === '00000000') {
                  Bus.$emit("updateInvoiceTree", response.data.data);
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
    // 获取编号
    getCode () {
      let that = this;
      http.invoiceCode().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.ruleForm.code = response.data.data;
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    // 获取顶级id
    getId () {
      let that = this;
      http.getAllInvoice().then(response => {
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
      http.invoiceTree().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.length = response.data.data.length;
          Bus.$emit("reloadInvoiceTree", response.data.data);
          Bus.$emit("loading2", false);
        }
      }).catch(error => {
        console.log(error);
      });
    }
  },
  mounted () {
    // 获取编号
    this.getCode();
    // 获取左边树结构的长度
    Bus.$on("length", (e) => {
      this.length = e;
    });
    // 获取当前点击的树节点ID
    Bus.$on("currentId", (e) => {
      this.currentId = e;
    });
    // 获取详细信息
    Bus.$on("invoiceDetail", (e) => {
      this.ruleForm = e;
      // let date = new Date(e.updatedAt);
      // let year = date.getFullYear();
      // let month = date.getMonth() + 1;
      // let day = date.getDate();
      this.updatedAt = formatDate(e.updatedAt);
      this.operator = e.operator;
    });
    Bus.$on("saveDisabledInvoice", (e) => {
      this.saveDisabled = e;
    });
    Bus.$on("deleteDisabledInvoice", (e) => {
      this.deleteDisabled = e;
    });
    Bus.$on("updateDisabledInvoice", (e) => {
      this.updateDisabled = e;
    });
    this.getId();
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
<style>
  .el-table td, .el-table th{
    padding:0.8vh 0;
  }
  .el-form-item__label{
    font-size:12px;
  }
  .el-input__inner{
    height:35px;
    line-height:35px;
  }
</style>
