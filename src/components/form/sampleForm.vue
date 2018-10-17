<template>
  <div class="rightForm">
    <!--对话框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定删除标本信息？</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="deleteSample" size="small">确 定</el-button>
        </span>
    </el-dialog>
    <!--表单-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form-item label="编号" prop="code" :span="12" required>
            <el-input v-model.number="ruleForm.code" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form-item label="名称" required prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form-item label="性别" prop="sex" required>
            <el-select v-model="ruleForm.sex" placeholder="请选择性别">
              <el-option
                v-for="item in genders"
                :key="item.id"
                :label="item.value"
                :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="ruleForm.remark" placeholder="请输入备注"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form-item label="操作员" prop="operator">
            <el-input type="text" v-model="operator" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form-item label="修改日期" prop="updatedAt">
            <el-input type="text" v-model="updatedAt" disabled></el-input>
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
  name: "sampleForm",
  data () {
    return {
      ruleForm: {
        code: '',
        name: '',
        sex: '',
        pid: '',
        remark: ''
      },
      operator: '',
      updatedAt: '',
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ]
      },
      options: [],
      genders: [
        {id: 1, value: '男'},
        {id: 2, value: '女'},
        {id: 3, value: '所有'}
      ],
      currentId: '',
      dialogVisible: false,
      length: '',
      saveDisabled: false,
      deleteDisabled: true,
      updateDisabled: true
    };
  },
  methods: {
    // 增加标本类型
    submitForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          if (that.length > 0) {
            that.ruleForm.pid = that.options[0].id;
          }
          http.addSample(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '添加标本类型成功！',
                type: 'success'
              });
              that.resetForm("ruleForm");
              http.sampleTree().then(function (response) {
                console.log(response);
                if (response.status === 200 && response.data.result === '00000000') {
                  Bus.$emit("addSampleTree", response.data.data);
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
      this.getAll();
      this.saveDisabled = false;
      this.deleteDisabled = true;
      this.updateDisabled = true;
      this.operator = '';
      this.updatedAt = '';
    },
    // 获取编号
    getCode () {
      let that = this;
      http.sampleCode().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.ruleForm.code = response.data.data;
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    // 获取所有的标本类型模块
    getAll () {
      let that = this;
      http.sampleList().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.options = response.data.data;
          console.log(that.options);
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    // 删除标本类型信息
    deleteSample () {
      let that = this;
      that.dialogVisible = false;
      http.deleteSample(this.currentId).then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.$message({
            message: '删除标本类型成功！',
            type: 'success'
          });
          that.resetForm('ruleForm');
          http.sampleTree().then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              Bus.$emit("deleteSampleTree", response.data.data);
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
    // 修改标本信息
    updateForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          http.updateSample(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '修改标本类型成功！',
                type: 'success'
              });
              that.getAll();
              http.sampleTree().then(function (response) {
                console.log(response);
                if (response.status === 200 && response.data.result === '00000000') {
                  Bus.$emit("updateSampleTree", response.data.data);
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
    // 刷新树结构
    reloadTree () {
      let that = this;
      Bus.$emit("loading1", true);
      http.sampleTree().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.length = response.data.data.length;
          Bus.$emit("reloadSampleTree", response.data.data);
          Bus.$emit("loading2", false);
        }
      }).catch(function (error) {
        console.log(error);
      })
    }
  },
  mounted () {
    this.getCode();
    this.getAll();
    Bus.$on("sampleDetail", (e) => {
      this.ruleForm = e;
      // let date = new Date(e.updatedAt);
      // let year = date.getFullYear();
      // let month = date.getMonth() + 1;
      // let day = date.getDate();
      this.operator = e.operator;
      this.updatedAt = formatDate(e.updatedAt);
    });
    Bus.$on("currentId", (e) => {
      this.currentId = e;
    });
    Bus.$on("length", (e) => {
      this.length = e;
    });
    Bus.$on("saveDisabledSample", (e) => {
      this.saveDisabled = e;
    });
    Bus.$on("deleteDisabledSample", (e) => {
      this.deleteDisabled = e;
    });
    Bus.$on("updateDisabledSample", (e) => {
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
<style>
  @import '../../styles/common.css';
</style>

