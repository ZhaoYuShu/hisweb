<template>
  <div class="rightForm">
    <!--对话框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定删除疾病分类？</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteIllType">确 定</el-button>
        </span>
    </el-dialog>
    <!--表单-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="分类编号" prop="code" required>
            <el-input v-model="ruleForm.code" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="分类名称" prop="name" required>
            <el-input v-model="ruleForm.name" placeholder="请输入分类名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="显示顺序" prop="seq">
            <el-input v-model.number="ruleForm.seq" placeholder="请输入显示顺序"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
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
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" @click="resetForm('ruleForm')" size="small">增加</el-button>
            <el-button type="success" @click="submitForm('ruleForm')" size="small">保存</el-button>
            <el-button type="danger" @click="dialogVisible = true" size="small">删除</el-button>
            <el-button type="warning" @click="updateForm('ruleForm')" size="small">修改</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import Bus from '@/utils/bus.js'
import http from '@/api/index.js'
export default {
  name: "diseasesForm",
  data () {
    return {
      ruleForm: {
        code: '',
        name: '',
        seq: '',
        pid: 0,
        examGroupItems: []
      },
      rules: {
        name: [
          {required: true, message: '请输入分类名称', trigger: 'blur'}
        ]
      },
      operator: '',
      updatedAt: '',
      length: '',
      options: [],
      currentId: '',
      dialogVisible: false
    };
  },
  methods: {
    submitForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          if (that.length > 0) {
            that.ruleForm.pid = '1';
          }
          http.addIllType(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '添加疾病分类成功！',
                type: 'success'
              });
              http.illTypeTree().then(function (response) {
                console.log(response);
                if (response.status === 200 && response.data.result === '00000000') {
                  Bus.$emit("addTree", response.data.data);
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
    },
    // 获取编号
    getCode () {
      let that = this;
      http.illTypeCode().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.ruleForm.code = response.data.data;
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    // 删除疾病分类
    deleteIllType () {
      let that = this;
      that.dialogVisible = false;
      http.deleteIllType(this.currentId).then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.$message({
            message: '删除疾病分类成功！',
            type: 'success'
          });
          that.resetForm('ruleForm');
          http.illTypeTree().then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              Bus.$emit('deleteTree', response.data.data);
            }
          }).catch(function (error) {
            console.log(error);
          });
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    // 修改疾病分类
    updateForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          http.updateIllType(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '修改疾病分类成功！',
                type: 'success'
              });
              http.illTypeTree().then(function (response) {
                console.log(response);
                if (response.status === 200 && response.data.result === '00000000') {
                  Bus.$emit("updateTree", response.data.data);
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
    }
  },
  created () {
    this.getCode();
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
    padding-top:20px;
    overflow:auto;
    overflow-x:hidden;
  }
  .el-radio-group{
    width:100%;
  }
  .el-select{
    width:100%;
  }
</style>
<style>
  @import '../../styles/common.css';
</style>
