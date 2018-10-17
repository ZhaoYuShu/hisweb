<template>
  <div class="rightForm">
    <!--对话框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定删除统计疾病模板？</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="deletePackage">确 定</el-button>
        </span>
    </el-dialog>
    <!--表单-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col :span="20">
          <el-form-item label="模板编号" prop="code" required>
            <el-input v-model="ruleForm.code" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="模板名称" prop="name" required>
            <el-input v-model="ruleForm.name" placeholder="请输入模板名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="显示顺序" prop="seq" required>
            <el-input v-model.number="ruleForm.seq" placeholder="请输入显示顺序"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="操作员" prop="operator">
            <el-input type="text" v-model="ruleForm.operator" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="修改日期" prop="date">
            <el-input type="text" v-model="ruleForm.date" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" @click="resetForm('ruleForm')" size="small">增加</el-button>
            <el-button type="success" @click="submitForm('ruleForm')" size="small">保存</el-button>
            <el-button type="danger" @click="dialogVisible = true" size="small">删除</el-button>
            <el-button type="warning" @click="updatePackage('ruleForm')" size="small">修改</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import http from '@/api/index.js'
import Bus from '@/utils/bus.js'
export default {
  name: "statisticTemplateForm",
  data () {
    return {
      ruleForm: {
        code: '',
        name: '',
        seq: '',
        pid: '0',
        operator: '',
        date: '',
        examGroupItems: []
      },
      rules: {
        name: [
          {required: true, message: '请输入模板名称', trigger: 'blur'}
        ],
        seq: [
          { required: true, message: '请输入显示顺序', trigger: 'blur' }
        ]
      },
      currentId: '',
      dialogVisible: false
    };
  },
  methods: {
    // 增加模板
    submitForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          if (that.$parent.$parent.$parent.$parent.$parent.$children[0].data.length > 0) {
            that.ruleForm.pid = '100001';
          }
          http.addPackage(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '添加疾病模板成功！',
                type: 'success'
              });
              http.packageTree().then(function (response) {
                console.log(response);
                if (response.status === 200 && response.data.result === '00000000') {
                  that.$parent.$parent.$parent.$parent.$parent.$children[0].data = response.data.data;
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
    },
    handleChange (value) {
      console.log(value);
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
    // 删除模板
    deletePackage () {
      let that = this;
      that.dialogVisible = false;
      http.deletePackage(this.currentId).then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.$message({
            message: '删除疾病模板成功！',
            type: 'success'
          });
          that.resetForm('ruleForm');
          http.packageTree().then(function (response) {
            console.log(response);
            Bus.$emit('packageTree', response.data.data);
          }).catch(function (error) {
            console.log(error);
          });
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    // 修改模板
    updatePackage (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          http.updatePackage(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '修改疾病模板成功！',
                type: 'success'
              });
              http.packageTree().then(function (response) {
                console.log(response);
                that.$parent.$children[0].data = response.data.data;
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
    }
  },
  created () {
    this.getCode();
    let that = this;
    Bus.$on('packageForm', (e) => {
      that.ruleForm = e;
      console.log(e);
    });
    Bus.$on('packageId', (e) => {
      that.currentId = e;
      console.log(e);
    });
    Bus.$on('examGroupItems', (e) => {
      that.ruleForm.examGroupItems = e;
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
    padding-top:20px;
    overflow:auto;
    overflow-x:hidden;
  }
  .el-radio-group{
    width:100%;
  }
</style>
<style>
  @import '../../styles/common.css';
</style>
