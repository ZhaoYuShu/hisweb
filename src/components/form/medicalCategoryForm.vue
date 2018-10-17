<template>
  <div class="rightForm">
    <!--对话框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定删除体检类别？</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="deleteExamType" size="small">确 定</el-button>
        </span>
    </el-dialog>
    <!--表单-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col :span="24">
          <el-form-item label="编号" prop="code" required>
            <el-input v-model.number="ruleForm.code" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="名称" prop="name" required>
            <el-input v-model.number="ruleForm.name" placeholder="请输入体检类别名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-form-item prop="funding" required label="财政拨款">-->
        <!--<el-radio-group v-model="ruleForm.funding">-->
          <!--<el-radio-->
            <!--v-for="item in funding"-->
            <!--:key="item.id"-->
            <!--:label="item.id">-->
            <!--{{item.value}}-->
          <!--</el-radio>-->
        <!--</el-radio-group>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="备注" prop="remark">-->
        <!--<el-input v-model="ruleForm.remark" placeholder="请输入备注" type="textarea"></el-input>-->
      <!--</el-form-item>-->
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
  name: "serviceForm",
  data () {
    return {
      ruleForm: {
        code: '',
        name: '',
        // funding: '',
        pid: 0
        // remark: '',
      },
      operator: '',
      updatedAt: '',
      currentId: '',
      dialogVisible: false,
      length: '',
      // funding: [
      //   {id: 1, value: '是'},
      //   {id: 2, value: '否'}
      // ],
      rules: {
        name: [
          { required: true, message: '请输入体检类别名称', trigger: 'blur' }
        ]
      },
      saveDisabled: false,
      deleteDisabled: true,
      updateDisabled: true,
      pid: ''
    };
  },
  methods: {
    // 增加体检类别
    submitForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          if (that.length >= 1) {
            that.ruleForm.pid = that.pid;
          }
          http.addExamType(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '添加体检类别成功！',
                type: 'success'
              });
              that.resetForm('ruleForm');
              http.examTypeTree().then(function (response) {
                console.log(response);
                Bus.$emit("addExamTypeTree", response.data.data);
                that.length = response.data.data.length;
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
    },
    // 删除体检类别
    deleteExamType () {
      let that = this;
      that.dialogVisible = false;
      http.deleteExamType(this.currentId).then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.$message({
            message: '删除体检类别成功！',
            type: 'success'
          });
          that.resetForm('ruleForm');
          http.examTypeTree().then(function (response) {
            console.log(response);
            Bus.$emit("deleteExamTypeTree", response.data.data);
            that.length = response.data.data.length;
          }).catch(function (error) {
            console.log(error);
          });
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    // 修改体检类别
    updateForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          http.updateExamType(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '修改体检类别成功！',
                type: 'success'
              });
              http.examTypeTree().then(function (response) {
                console.log(response);
                Bus.$emit("updateExamTypeTree", response.data.data);
                that.length = response.data.data.length;
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
    // 获取体检类别编号
    getCode () {
      let that = this;
      http.examTypeCode().then(function (response) {
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
      http.getAllExamType().then(response => {
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
      http.examTypeTree().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.length = response.data.data.length;
          Bus.$emit("reloadExamTypeTree", response.data.data);
          Bus.$emit("loading2", false);
        }
      }).catch(error => {
        console.log(error);
      });
    }
  },
  mounted () {
    this.getCode();
    this.getId();
    Bus.$on("length", (e) => {
      this.length = e;
    });
    Bus.$on("examTypeDetail", (e) => {
      this.ruleForm = e;
      // let date = new Date(e.updatedAt);
      // let year = date.getFullYear();
      // let month = date.getMonth() + 1;
      // let day = date.getDate();
      this.updatedAt = formatDate(e.updatedAt);
      this.operator = e.operator;
    });
    Bus.$on("currentId", (e) => {
      this.currentId = e;
    });
    Bus.$on("saveDisabledMedicalCategory", (e) => {
      this.saveDisabled = e;
    });
    Bus.$on("deleteDisabledMedicalCategory", (e) => {
      this.deleteDisabled = e;
    });
    Bus.$on("updateDisabledMedicalCategory", (e) => {
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
</style>
<style>
  @import '../../styles/common.css';
</style>
