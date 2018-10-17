<template>
    <div class="rightForm">
      <!--对话框-->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
        <span>确定删除临床类型？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="deleteClinic" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <!--表单-->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="类型编号" prop="code" :span="12" required>
              <el-input v-model.number="ruleForm.code" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示顺序" prop="seq" :span="12">
              <el-input v-model.number="ruleForm.seq" placeholder="请输入显示顺序"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="类型名称" prop="name" required>
          <el-input v-model="ruleForm.name" placeholder="请输入类型名称"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="ruleForm.remark" placeholder="请输入备注" type="textarea"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="操作员" prop="operator">
              <el-input type="text" v-model="operator" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="修改日期" prop="updatedAt">
              <el-input v-model="updatedAt" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <!--<el-col :span="12">-->
            <!--<el-form-item>-->
          <el-button type="primary" @click="resetForm('ruleForm')" size="small">增加</el-button>
          <el-button type="success" @click="submitForm('ruleForm')" size="small" :disabled="saveDisabled">保存</el-button>
          <el-button type="danger" @click="dialogVisible = true" size="small" :disabled="deleteDisabled">删除</el-button>
          <el-button type="warning" @click="updateForm('ruleForm')" size="small" :disabled="updateDisabled">修改</el-button>
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
  name: "clinicForm",
  data () {
    return {
      ruleForm: {
        code: '',
        seq: '',
        name: '',
        pid: '0',
        remark: ''
      },
      currentId: '',
      operator: '',
      updatedAt: '',
      dialogVisible: false,
      rules: {
        name: [
          { required: true, message: '请输入临床类型名称', trigger: 'blur' }
        ]
      },
      length: '',
      pid: '',
      saveDisabled: false,
      deleteDisabled: true,
      updateDisabled: true
    };
  },
  methods: {
    // 增加临床类型
    submitForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          if (that.length >= 1) {
            that.ruleForm.pid = that.pid;
          }
          http.addClinic(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '添加临床类型成功！',
                type: 'success'
              });
              that.resetForm('ruleForm');
              http.clinicTree().then(function (response) {
                console.log(response);
                if (response.status === 200 && response.data.result === '00000000') {
                  Bus.$emit("addClinicTree", response.data.data);
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
      this.getId();
      this.saveDisabled = false;
      this.deleteDisabled = true;
      this.updateDisabled = true;
      this.operator = '';
      this.updatedAt = '';
      this.ruleForm.id = '';
    },
    // 删除临床类型
    deleteClinic () {
      let that = this;
      that.dialogVisible = false;
      console.log(that.currentId);
      http.deleteClinic(that.currentId).then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.$message({
            message: '删除临床类型成功！',
            type: 'success'
          });
          that.resetForm('ruleForm');
          http.clinicTree().then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              Bus.$emit("deleteClinicTree", response.data.data);
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
    // 修改临床类型
    updateForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          http.updateClinic(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '修改临床类型成功！',
                type: 'success'
              });
              http.clinicTree().then(function (response) {
                console.log(response);
                if (response.status === 200 && response.data.result === '00000000') {
                  Bus.$emit("updateClinicTree", response.data.data);
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
      http.clinicCode().then(function (response) {
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
      http.allClinic().then(response => {
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
      http.clinicTree().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.length = response.data.data.length;
          Bus.$emit("reloadClinicTree", response.data.data);
          Bus.$emit("loading2", false);
        }
      }).catch(function (error) {
        console.log(error);
      })
    }
  },
  mounted () {
    this.getCode();
    this.getId();
    Bus.$on("clinicDetail", (e) => {
      this.ruleForm = e;
      // let date = new Date(e.updatedAt);
      // let year = date.getFullYear();
      // let month = date.getMonth() + 1;
      // let day = date.getDate();
      this.operator = e.operator;
      this.updatedAt = formatDate(e.updatedAt);
    });
    Bus.$on("length", (e) => {
      this.length = e;
    });
    Bus.$on("currentId", (e) => {
      this.currentId = e;
    });
    Bus.$on("saveDisabledClinic", (e) => {
      this.saveDisabled = e;
    });
    Bus.$on("deleteDisabledClinic", (e) => {
      this.deleteDisabled = e;
    });
    Bus.$on("updateDisabledClinic", (e) => {
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
    padding-top:1%;
    overflow:auto;
  }
  .el-radio-group{
    width:100%;
  }
</style>
<style>
  @import '../../styles/common.css';
</style>

