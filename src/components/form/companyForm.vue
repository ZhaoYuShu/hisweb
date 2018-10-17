<template>
  <div class="rightForm">
  <!--对话框-->
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%">
    <span>确定删除体检单位？</span>
    <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="deleteCompany" size="small">确 定</el-button>
        </span>
  </el-dialog>
  <!--表单-->
  <el-form
    ref="ruleForm"
    :rules="rules"
    :model="ruleForm"
    label-width="100px"
    class="demo-ruleForm">
    <el-row :gutter="20">
      <el-col :span="11">
        <el-form-item label="编号" prop="code">
          <el-input v-model="ruleForm.code" disabled></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="简称" prop="abbreviation">
          <el-input v-model="ruleForm.abbreviation" placeholder="请输入简称"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="22">
        <el-form-item label="单位名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入单位名称"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="11">
        <el-form-item label="拼音简码" prop="alphabetic">
          <el-input v-model="ruleForm.alphabetic" placeholder="请输入拼音简码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="五笔简码" prop="wubi">
          <el-input v-model="ruleForm.wubi" placeholder="请输入五笔简码"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="11">
        <el-form-item label="联系人" prop="contact">
          <el-input v-model="ruleForm.contact" placeholder="请输入联系人"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="请输入联系电话"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="11">
        <el-form-item label="传真" prop="fax">
          <el-input v-model="ruleForm.fax" placeholder="请输入传真"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="邮政编码" prop="postcode">
          <el-input v-model="ruleForm.postcode" placeholder="请输入邮政编码"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="22">
        <el-form-item label="联系地址" prop="address">
          <el-input v-model="ruleForm.address" placeholder="请输入联系地址"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="11">
        <el-form-item label="业务银行" prop="bank">
          <el-input v-model="ruleForm.bank" placeholder="请输入业务银行"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="银行账号" prop="bankAccount">
          <el-input v-model="ruleForm.bankAccount" placeholder="请输入银行账号"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="11">
        <el-form-item label="企业性质" prop="enterpriseProperty">
          <el-input v-model="ruleForm.enterpriseProperty" placeholder="请输入企业性质"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="编制人数" prop="num">
          <el-input v-model="ruleForm.num" placeholder="请输入编制人数"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="22">
        <el-form-item label="备注" prop="mark">
          <el-input v-model="ruleForm.mark" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <!--<el-col :span="12">-->
      <el-button type="primary" size="small" @click="resetForm('ruleForm')">增加</el-button>
      <el-button type="success" size="small" @click="submitForm('ruleForm')" :disabled="saveDisabled">保存</el-button>
      <el-button type="danger" size="small" @click="dialogVisible = true" :disabled="deleteDisabled">删除</el-button>
      <el-button type="warning" size="small" @click="updateForm('ruleForm')" :disabled="updateDisabled">修改</el-button>
      <el-button size="small" @click="reloadTree">刷新</el-button>
      <!--</el-col>-->
    </el-row>
  </el-form>
  </div>
</template>

<script>
import http from '@/api/index.js'
import Bus from '@/utils/bus.js'
export default {
  name: "companyForm",
  data () {
    return {
      ruleForm: {
        code: '', // 编号
        shortName: '', // 简称
        name: '', // 单位名称
        spell: '', // 拼音简码
        wubi: '', // 五笔简码
        linkman: '', // 联系人
        phone: '', // 联系电话
        fax: '', // 传真
        postcode: '', // 邮政编码
        address: '', // 联系地址
        bank: '', // 业务银行
        bankAccount: '', // 银行账号
        enterpriseProperty: '', // 企业性质
        num: '', // 编制人数
        mark: '', // 备注
        pid: 0,
        id: ''
      },
      rules: {
        code: [
          {required: true, message: '编号不能为空'}
        ],
        name: [
          {required: true, message: '单位名称不能为空', trigger: 'blur'}
        ]
      },
      dialogVisible: false,
      treeLength: '',
      currentId: '',
      saveDisabled: false,
      deleteDisabled: true,
      updateDisabled: true,
      pid: ''
    }
  },
  methods: {
    // 获取编号
    getCode () {
      let that = this;
      http.companyCode().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.ruleForm.code = response.data.data;
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    // 增加体检单位
    submitForm (formName) {
      let that = this;
      console.log(that.treeLength);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          if (that.treeLength >= 1) {
            that.ruleForm.pid = that.pid;
          }
          http.addCompany(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '添加体检单位成功！',
                type: 'success'
              });
              http.companyTree().then(function (response) {
                console.log(response);
                if (response.status === 200 && response.data.result === '00000000') {
                  Bus.$emit('addCompanyTree', response.data.data);
                  that.treeLength = response.data.data.length;
                }
              }).catch(function (error) {
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
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields();
      this.getCode();
      this.saveDisabled = false;
      this.deleteDisabled = true;
      this.updateDisabled = true;
    },
    // 删除体检单位
    deleteCompany () {
      let that = this;
      that.dialogVisible = false;
      http.deleteCompany(this.currentId).then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.$message({
            message: '删除体检单位成功！',
            type: 'success'
          });
          that.resetForm('ruleForm');
          http.companyTree().then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              Bus.$emit('deleteCompanyTree', response.data.data);
              that.treeLength = response.data.data.length;
            }
          }).catch(function (error) {
            console.log(error);
          });
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    // 修改体检单位
    updateForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          http.updateCompany(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '修改体检单位成功！',
                type: 'success'
              });
              http.companyTree().then(function (response) {
                console.log(response);
                if (response.status === 200 && response.data.result === '00000000') {
                  Bus.$emit('updateCompanyTree', response.data.data);
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
      http.getAllCompany().then(response => {
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
      http.companyTree().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.length = response.data.data.length;
          Bus.$emit('reloadCompanyTree', response.data.data);
          Bus.$emit("loading2", false);
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  },
  mounted () {
    this.getCode();
    this.getId();
    Bus.$on('treeLength', (e) => {
      this.treeLength = e;
    });
    Bus.$on('currentId', (e) => {
      this.currentId = e;
    });
    Bus.$on('companyDetail', (e) => {
      this.ruleForm = e;
    });
    Bus.$on("saveDisabledCompany", (e) => {
      this.saveDisabled = e;
    });
    Bus.$on("deleteDisabledCompany", (e) => {
      this.deleteDisabled = e;
    });
    Bus.$on("updateDisabledCompany", (e) => {
      this.updateDisabled = e;
    });
  }
}
</script>

<style scoped>
  .rightForm{
    width:100%;
    height:100%;
    overflow-y:auto;
  }
  .el-form{
    width:100%;
    height:95%;
    padding-top:20px;
    overflow:hidden;
    overflow-y:auto;
  }
</style>
<style>
  @import '../../styles/common.css';
</style>
