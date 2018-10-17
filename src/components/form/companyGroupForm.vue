<template>
    <div class="rightForm">
      <!--对话框-->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
        <span>确定删除体检单位分组？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="deleteCompanyGroup" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="单位名称" prop="companyCode">
              <el-select v-model="ruleForm.companyCode" :disabled="disabled">
                <el-option
                  v-for="item in companyName"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分组编号" prop="code">
              <el-input v-model="ruleForm.code" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="分组名称" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入分组名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-select v-model="ruleForm.sex">
                <el-option
                  v-for="item in sex"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="婚姻状况" prop="isMarried">
              <el-select v-model="ruleForm.isMarried">
                <el-option
                  v-for="item in maritalStatus"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄下限" prop="botAge">
              <el-input-number v-model="ruleForm.botAge" controls-position="right" :min="1" :max="59"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="年龄上限" prop="topAge">
              <el-input-number v-model="ruleForm.topAge" controls-position="right" :min="60" :max="120"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分组状态" prop="flag">
              <el-radio-group v-model="ruleForm.flag">
                <el-radio
                  v-for="item in groupStatus"
                  :key="item.id"
                  :label="item.id">
                  {{item.value}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-button type="primary" size="small" @click="resetForm('ruleForm')">增加</el-button>
          <el-button type="success" size="small" @click="submitForm('ruleForm')" :disabled="saveDisabled">保存</el-button>
          <el-button type="danger" size="small" @click="dialogVisible = true" :disabled="deleteDisabled">删除</el-button>
          <el-button type="warning" size="small" @click="updateForm('ruleForm')" :disabled="updateDisabled">修改</el-button>
          <el-button size="small" @click="reloadTree">刷新</el-button>
        </el-row>
      </el-form>
      <el-card>
        <div slot="header" class="clearfix">
          <span class="title">分组体检项目</span>
        </div>
        <div v-for="item in examGroupItems" :key="item.code" class="text item">
          {{item.name}}
        </div>
      </el-card>
    </div>
</template>

<script>
import http from '@/api/index.js'
import Bus from '@/utils/bus.js'
export default {
  name: "companyGroupForm",
  data () {
    return {
      ruleForm: {
        companyCode: '', // 单位名称
        code: '', // 分组编号
        name: '', // 分组名称
        abbreviation: '', // 简称
        sex: '', // 性别
        isMarried: '', // 婚姻状况
        botAge: '', // 年龄下限
        topAge: '', // 年龄上限
        flag: 1, // 分组状态
        examGroupItems: [], // 体检项目,
        examTimes: 1
      },
      rules: {
        companyCode: [
          {required: true, message: '请选择单位', trigger: 'change'}
        ],
        code: [
          {required: true, message: '分组编号不为空'}
        ],
        name: [
          {required: true, message: '请输入分组名称', trigger: 'blur'}
        ]
      },
      sex: [
        {id: 1, value: '男'},
        {id: 2, value: '女'},
        {id: 0, value: '所有'}
      ],
      maritalStatus: [
        {id: 1, value: '未婚'},
        {id: 2, value: '已婚'},
        {id: 0, value: '不限'}
      ],
      groupStatus: [
        {id: 1, value: '启用'},
        {id: 0, value: '禁用'}
      ],
      examGroupItems: Set,
      companyName: [],
      dialogVisible: false,
      currentId: '',
      disabled: false,
      saveDisabled: false,
      deleteDisabled: true,
      updateDisabled: true
    }
  },
  methods: {
    // 获取分组编号
    getCode () {
      let that = this;
      http.companyGroupCode().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.ruleForm.code = response.data.data;
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    // 获取所有单位名称
    getCompanyName () {
      let that = this;
      http.getAllCompany().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          let arr = [];
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].pid !== 0) {
              arr.push(response.data.data[i]);
            }
          }
          that.companyName = arr;
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    // 增加体检单位分组
    submitForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          http.addCompanyGroup(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '添加体检单位分组成功！',
                type: 'success'
              });
              that.resetForm('ruleForm');
              http.companyGroupTree().then(function (response) {
                console.log(response);
                if (response.status === 200 && response.data.result === '00000000') {
                  Bus.$emit('companyGroupTree', response.data.data);
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
      this.disabled = false;
      Bus.$emit('examItems2', []);
      this.examGroupItems = [];
      this.saveDisabled = false;
      this.deleteDisabled = true;
      this.updateDisabled = true;
      this.ruleForm.id = '';
    },
    // 删除体检单位分组
    deleteCompanyGroup () {
      let that = this;
      that.dialogVisible = false;
      http.deleteCompanyGroup(this.currentId).then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.$message({
            message: '删除体检单位分组成功！',
            type: 'success'
          });
          that.resetForm('ruleForm');
          http.companyGroupTree().then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              Bus.$emit('deleteCompanyGroup', response.data.data);
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
    // 修改体检单位分组
    updateForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          console.log(that.ruleForm);
          http.updateCompanyGroup(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '修改体检单位分组成功！',
                type: 'success'
              });
              Bus.$emit('packageGroup2', []);
              http.companyGroupTree().then(function (response) {
                console.log(response);
                if (response.status === 200 && response.data.result === '00000000') {
                  Bus.$emit('updateCompanyGroup', response.data.data);
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
      http.companyGroupTree().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          Bus.$emit("reloadTree", response.data.data);
          Bus.$emit("loading2", false);
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  },
  mounted () {
    this.getCode();
    this.getCompanyName();
    Bus.$on('currentId', (e) => {
      this.currentId = e;
    });
    Bus.$on("details", (e) => {
      this.ruleForm = e;
    });
    Bus.$on('disabled', (e) => {
      this.disabled = e;
    });
    Bus.$on('companyGroupItems', (e) => {
      this.ruleForm.examGroupItems = e;
      this.examGroupItems = [];
      this.examGroupItems = e;
    });
    Bus.$on('packageItems2', (e) => {
      this.examGroupItems = [];
      this.examGroupItems = e;
    })
    Bus.$on('companyCode', (e) => {
      this.ruleForm.companyCode = e;
    });
    Bus.$on('examTimes', (e) => {
      this.ruleForm.examTimes = e;
    });
    Bus.$on("saveDisabledCompanyGroup", (e) => {
      this.saveDisabled = e;
    });
    Bus.$on("deleteDisabledCompanyGroup", (e) => {
      this.deleteDisabled = e;
    });
    Bus.$on("updateDisabledCompanyGroup", (e) => {
      this.updateDisabled = e;
    });
  }
}
</script>

<style scoped>
  .rightForm{
    width:100%;
    height:100%;
  }
  .el-form{
    width:68%;
    height:100%;
    float:left;
  }
  .el-card{
    float:right;
    width:25%;
    height:400px;
    overflow:auto;
  }
  .el-select{
    width:100%;
  }
  .el-input-number{
    width:100%;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
    display:inline-block;
    margin-right:40px;
  }
  .title{
    font-size:14px;
  }

</style>
<style>
  @import '../../styles/common.css';
</style>
