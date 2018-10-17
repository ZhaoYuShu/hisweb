<template>
  <div class="rightForm">
    <!--对话框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定删除其他收费信息？</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="deleteOtherCharge" size="small">确 定</el-button>
        </span>
    </el-dialog>
    <!--表单-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
      <el-row>
        <el-col :span="22">
          <el-form-item label="项目编号" prop="code" required>
            <el-input v-model.number="ruleForm.code" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item label="项目名称" required prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入项目名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item label="收费类别" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择收费类别">
              <el-option
                v-for="item in chargeType"
                :key="item.id"
                :label="item.name"
                :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item label="标准单价" prop="price">
            <el-input v-model="ruleForm.price" placeholder="请输入标准单价"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item label="有效标志" prop="actived">
            <el-radio-group v-model="ruleForm.actived">
              <el-radio
                v-for="item in mark"
                :key="item.id"
                :label="item.id">{{item.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item label="显示顺序" prop="seq">
            <el-input v-model.number="ruleForm.seq" placeholder="请输入显示顺序"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item label="说明" prop="backup">
            <el-input type="textarea" v-model="ruleForm.backup"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
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
        <!--<el-col :span="16">-->
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
  name: "relevantChargesForm",
  data () {
    return {
      ruleForm: {
        code: '',
        seq: '',
        name: '',
        pid: 0,
        type: '',
        backup: '',
        actived: '',
        price: ''
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
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ]
      },
      mark: [
        {id: 1, value: '参与收费'},
        {id: 0, value: '暂停使用'}
      ],
      chargeType: [],
      length: '',
      saveDisabled: false,
      deleteDisabled: true,
      updateDisabled: true,
      pid: ''
    };
  },
  methods: {
    // 增加相关收费
    submitForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          console.log(that.length);
          if (that.length > 0) {
            that.ruleForm.pid = that.pid;
          }
          http.addOtherCharge(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '添加相关收费成功！',
                type: 'success'
              });
              that.resetForm('ruleForm');
              http.otherChargeTree().then(function (response) {
                console.log(response);
                if (response.status === 200 && response.data.result === '00000000') {
                  Bus.$emit("addRelevantTree", response.data.data);
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
    // 删除相关收费
    deleteOtherCharge () {
      let that = this;
      that.dialogVisible = false;
      http.deleteOtherCharge(that.currentId).then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.$message({
            message: '删除相关收费成功！',
            type: 'success'
          });
          that.resetForm('ruleForm');
          http.otherChargeTree().then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              Bus.$emit("deleteRelevantTree", response.data.data);
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
    // 修改相关收费
    updateForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          http.updateOtherCharge(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '修改相关收费成功！',
                type: 'success'
              });
              http.otherChargeTree().then(function (response) {
                console.log(response);
                if (response.status === 200 && response.data.result === '00000000') {
                  Bus.$emit("updateRelevantTree", response.data.data);
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
      http.otherChargeCode().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.ruleForm.code = response.data.data;
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    // 获取汇总项目
    getCollect () {
      let that = this;
      http.getAllCollect().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          let arr = [];
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].pid !== 0) {
              arr.push(response.data.data[i]);
            }
          }
          that.chargeType = arr;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 获取顶级id
    getId () {
      let that = this;
      http.getAllOtherCharge().then(response => {
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
      http.otherChargeTree().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.length = response.data.data.length;
          Bus.$emit("reloadRelevant", response.data.data);
          Bus.$emit("loading2", false);
        }
      }).catch(error => {
        console.log(error);
      });
    }
  },
  mounted () {
    this.getCode();
    this.getCollect();
    this.getId();
    // 获取详细信息
    Bus.$on("otherChargeDetail", (e) => {
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
    Bus.$on("saveDisabledRelevant", (e) => {
      this.saveDisabled = e;
    });
    Bus.$on("deleteDisabledRelevant", (e) => {
      this.deleteDisabled = e;
    });
    Bus.$on("updateDisabledRelevant", (e) => {
      this.updateDisabled = e;
    });
    Bus.$on("length", (e) => {
      this.length = e;
      console.log(e);
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
