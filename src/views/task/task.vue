<!--任务管理-->
<template>
  <div class="container">
    <!--对话框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定删除任务？</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="confirmDeleteUser" size="small">确 定</el-button>
        </span>
    </el-dialog>
    <el-row style="height:10%;text-align:left;text-indent:20px;">
      <el-col>
        <el-button type="primary" size="small" @click="dialogFormVisible = true">增加</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      border
      height="85%"
      style="width:98%;margin:0 auto;">
      <el-table-column
        label="任务名称"
        prop="taskName"
        width="250"
        align="left">
      </el-table-column>
      <el-table-column
        label="任务所在组"
        prop="taskGroup"
        width="100"
        align="left">
      </el-table-column>
      <el-table-column
        label="任务类名"
        prop="className"
        width="250"
        align="left">
      </el-table-column>
      <el-table-column
        label="触发器名称"
        prop="triggerName"
        width="250"
        align="left">
      </el-table-column>
      <el-table-column
        label="触发器所在组"
        prop="triggerGroup"
        width="100"
        align="left">
      </el-table-column>
      <el-table-column
        label="表达式"
        prop="expression"
        width="250"
        align="left">
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right">
        <template slot-scope="scope">
          <el-button type="info" size="small" @click="suspendedTask(scope.row)">暂停</el-button>
          <el-button @click="restoreTask(scope.row)" type="success" size="small">恢复</el-button>
          <el-button @click="updateTask(scope.row)" type="warning" size="small">修改</el-button>
          <el-button @click="deleteTask(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="增加任务" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules" label-width="100px" class="demo-form">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="任务名称" prop="taskName">
              <el-input v-model="form.taskName" placeholder="请输入任务名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="登录账号" prop="mobile">
              <el-input v-model="form.mobile" placeholder="请输入登录账号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="密码" prop="passWord">
              <el-input v-model="form.passWord" placeholder="请输入密码" type="password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="确认密码" prop="passWord2">
              <el-input v-model="form.passWord2" placeholder="请输入确认密码" type="password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="用户授权" :visible.sync="dialogFormVisible2" style="width:50%;margin:0 auto;">
      <el-form :model="form2" ref="form2" :rules="rules2" label-width="100px" class="demo-form2">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="角色名称" prop="roleCode">
              <el-select v-model="form2.roleCode" placeholder="请选择角色名称">
                <el-option
                  v-for="item in roles"
                  :key="item.roleCode"
                  :label="item.roleName"
                  :value="item.roleCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmAuth('form2')" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import http from '@/api/index.js'
export default {
  name: "task",
  data () {
    let checkPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入确认密码"));
      }
      if (value !== this.form.passWord) {
        return callback(new Error("两次密码不一致"));
      }
      if (value && value === this.form.passWord) {
        return callback();
      }
    };
    return {
      form: {
        taskName: '',
        mobile: '',
        passWord: '',
        passWord2: ''
      },
      form2: {
        roleCode: '',
        userNo: ''
      },
      rules: {
        taskName: [
          {required: true, message: '请输入任务名称', trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '请输入登录账号', trigger: 'blur'}
        ],
        passWord: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        passWord2: [
          {required: true, validator: checkPassword, trigger: 'blur'}
        ]
      },
      rules2: {
        roleCode: [
          {required: true, message: '请选择角色', trigger: 'change'}
        ]
      },
      dialogFormVisible: false,
      dialogFormVisible2: false,
      tableData: [],
      dialogVisible: false,
      userNo: '',
      roles: []
    }
  },
  methods: {
    // 增加用户
    submitForm(formName) {
      let that = this;
      that.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("submit!");
          http.addUser(that.form).then(response => {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '增加用户成功！',
                type: 'success'
              });
              that.resetForm('form');
              that.dialogFormVisible = false;
              that.userList();
            } else {
              that.$message({
                message: response.data.msg,
                type: 'error'
              });
            }
          }).catch(error => {
            console.log(error);
          });
        }
      });
      that.dialogFormVisible = false;
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 删除用户
    deleteUser(data) {
      console.log(data);
      let that = this;
      that.userNo = data.userNo;
      that.dialogVisible = true;
    },
    // 确定删除用户
    confirmDeleteUser() {
      let that = this;
      http.deleteUser(that.userNo).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.$message({
            message: '删除用户成功',
            type: 'success'
          });
          that.userList();
        } else {
          that.$message({
            message: response.data.msg,
            type: 'error'
          });
        }
      }).catch(error => {
        console.log(error);
      });
      that.dialogVisible = false;
    },
    // 暂停任务
    suspendedTask (data) {
      console.log(data);
    },
    // 恢复任务
    restoreTask (data) {
      console.log(data);
    },
    // 修改任务
    updateTask (data) {
      console.log(data);
    },
    // 删除任务
    deleteTask (data) {
      console.log(data);
    }
  },
  mounted () {

  }
}
</script>

<style scoped>
  .container{
    width:100%;
    height:90%;
    padding-top:1%;
    overflow:hidden;
    background:#fff;
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
