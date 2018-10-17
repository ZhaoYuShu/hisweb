<!--用户管理-->
<template>
  <div class="container">
    <!--对话框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定删除用户？</span>
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
        label="用户名"
        prop="userName"
        width="250"
        align="left">
      </el-table-column>
      <el-table-column
        label="手机号"
        prop="mobile"
        width="250"
        align="left">
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="createTime"
        width="250"
        align="left">
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="authorization(scope.row)">授权</el-button>
          <el-button @click="deleteUser(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="增加用户" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules" label-width="100px" class="demo-form">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" prop="mobile">
              <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
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
  name: "user",
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
        userName: '',
        mobile: '',
        passWord: '',
        passWord2: ''
      },
      form2: {
        roleCode: '',
        userNo: ''
      },
      rules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '请输入手机号', trigger: 'blur'}
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
    submitForm (formName) {
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
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    // 获取用户列表
    userList () {
      let that = this;
      http.userList().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          let list = response.data.data.list;
          for (let i = 0; i < list.length; i++) {
            let date = new Date(list[i].createTime);
            let year = date.getFullYear();
            let month = date.getMonth();
            let day = date.getDate();
            list[i].createTime = year + '/' + month + '/' + day;
          }
          that.tableData = list;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 删除用户
    deleteUser (data) {
      console.log(data);
      let that = this;
      that.userNo = data.userNo;
      that.dialogVisible = true;
    },
    // 确定删除用户
    confirmDeleteUser () {
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
    // 点击授权按钮，弹出弹框
    authorization (data) {
      let that = this;
      console.log(data);
      that.dialogFormVisible2 = true;
      that.userNo = data.userNo;
      that.form2.userNo = data.userNo;
      http.getAuth(data.userNo).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          if (response.data.data.role) {
            that.form2.roleCode = response.data.data.role.roleCode;
          } else {
            that.form2.roleCode = '';
          }
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 确定授权
    confirmAuth (formName) {
      let that = this;
      that.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("submit!");
          http.authorization(that.form2).then(response => {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '用户授权成功',
                type: 'success'
              });
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
      that.dialogFormVisible2 = false;
    },
    // 获取所有角色
    getAllRole () {
      let that = this;
      http.getAllRole().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.roles = response.data.data;
        }
      }).catch(error => {
        console.log(error);
      });
    }
  },
  mounted () {
    this.userList();
    this.getAllRole();
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
<style>
  @import '../../styles/common.css';
</style>
