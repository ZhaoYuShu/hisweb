<!--角色管理-->
<template>
  <div class="container">
    <!--对话框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定删除角色？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmDeleteRole" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-row style="height:10%;text-align:left;text-indent:20px;">
      <el-col>
        <el-button type="primary" size="small" @click="addRole">增加</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      border
      height="85%"
      style="width:98%;margin:0 auto;">
      <el-table-column
        label="角色名称"
        prop="roleName"
        width="800"
        align="left">
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right">
        <template slot-scope="scope">
          <el-button @click="deleteRole(scope.row)" type="danger" size="small">删除</el-button>
          <el-button type="warning" size="small" @click="updateForm(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="增加角色" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules" label-width="100px" class="demo-form">
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="form.roleName" placeholder="请输入角色名称"></el-input>
            </el-form-item>
          </el-col>
          <!--<el-col :span="12">-->
          <!--<el-form-item label="可操作菜单" prop="menuCodes">-->
          <!--<el-select v-model="form.menuCodes" placeholder="请选择可操作菜单" multiple collapse-tags>-->
          <!--<el-option-->
          <!--v-for="item in menus"-->
          <!--:key="item.id"-->
          <!--:label="item.name"-->
          <!--:value="item.menuCode">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="4">
            <el-button type="primary" size="small" @click="dialogTreeVisible = true">选择菜单</el-button>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改角色" :visible.sync="dialogFormVisible2">
      <el-form :model="form2" ref="form2" :rules="rules" label-width="100px" class="demo-form2">
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="form2.roleName" placeholder="请输入角色名称"></el-input>
            </el-form-item>
          </el-col>
          <!--<el-col :span="12">-->
          <!--<el-form-item label="可操作菜单" prop="menuCodes">-->
          <!--<el-select v-model="form.menuCodes" placeholder="请选择可操作菜单" multiple collapse-tags>-->
          <!--<el-option-->
          <!--v-for="item in menus"-->
          <!--:key="item.id"-->
          <!--:label="item.name"-->
          <!--:value="item.menuCode">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="4">
            <el-button type="primary" size="small" @click="dialogTreeVisible = true">选择菜单</el-button>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmUpdateRole('form2')" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="选择菜单" :visible.sync="dialogTreeVisible">
      <el-tree
        :data="data"
        ref="tree"
        :props="defaultProps"
        accordion
        :highlight-current="true"
        node-key="menuCode"
        @node-click="handleNodeClick"
        default-expand-all
        show-checkbox
        :default-checked-keys="checkedArr"
        @check="handleCheck">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTreeVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogTreeVisible = false" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import http from '@/api/index.js'
export default {
  name: "role",
  data () {
    return {
      tableData: [],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogTreeVisible: false,
      dialogVisible: false,
      form: {
        roleName: '',
        menuCodes: []
      },
      form2: {
        roleName: '',
        menuCodes: [],
        roleCode: ''
      },
      rules: {
        roleName: [
          {required: true, message: '请输入角色名称', trigger: 'blur'}
        ],
        menuCodes: [
          {required: true, message: '请选择菜单', trigger: 'change'}
        ]
      },
      menus: [],
      data: [],
      defaultProps: {
        children: 'childMenu',
        label: 'name'
      },
      checkedArr: [],
      currentRoleCode: ''
    }
  },
  methods: {
    // 确定增加角色
    submitForm (formName) {
      let that = this;
      that.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          http.addRole(that.form).then(response => {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '新增角色成功',
                type: 'success'
              });
              that.resetForm('form');
              that.dialogFormVisible = false;
              that.getAllRole();
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
    },
    // 增加角色
    addRole () {
      this.dialogFormVisible = true;
      this.$refs.tree.setCheckedKeys([]);
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    // 删除角色获取roleCode
    deleteRole (data) {
      console.log(data);
      this.currentRoleCode = data.roleCode;
      this.dialogVisible = true;
    },
    // 确定删除角色
    confirmDeleteRole () {
      let that = this;
      http.deleteRole(that.currentRoleCode).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.$message({
            message: '删除角色成功',
            type: 'success'
          });
          that.getAllRole();
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
    // 修改角色获取roleCode
    updateForm (data) {
      let that = this;
      console.log(data);
      that.currentRoleCode = data.roleCode;
      that.form2.roleCode = data.roleCode;
      that.dialogFormVisible2 = true;
      http.roleDetail(that.currentRoleCode).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          http.menuTree().then(response => {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.data = response.data.data;
            }
          }).catch(error => {
            console.log(error);
          });
          that.form2.roleName = response.data.data.role.roleName;
          that.form2.menuCodes = response.data.data.nodes.menuList;
          let menuList = response.data.data.nodes.menuList;
          let arr = [];
          for (let i = 0; i < menuList.length; i++) {
            arr.push(menuList[i].menuCode);
            if (menuList[i].childMenu) {
              let child = menuList[i].childMenu;
              for (let j = 0; j < child.length; j++) {
                arr.push(child[j].menuCode);
              }
            }
          }
          that.checkedArr = arr;
          console.log(that.checkedArr);
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 确认修改角色
    confirmUpdateRole (formName) {
      let that = this;
      that.$refs[formName].validate((valid) => {
        if (valid) {
          http.updateRole(that.form2).then(response => {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '修改角色成功',
                type: 'success'
              });
              that.getAllRole();
            } else {
              that.$message({
                message: response.data.msg,
                type: 'error'
              });
            }
          }).catch(error => {
            console.log(error);
          });
          that.dialogFormVisible2 = false;
        }
      });
    },
    // 获取所有菜单
    getAllMenus () {
      let that = this;
      http.menuTree().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.data = response.data.data;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    handleNodeClick (data) {
      console.log(data);
    },
    handleCheck () {
      console.log(this.$refs.tree.getCheckedKeys());
      console.log(this.$refs.tree.getHalfCheckedKeys());
      this.$nextTick(function () {
        let arr1 = [];
        let arr2 = [];
        arr1 = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());
        arr2 = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());
        // console.log(arr1);
        this.form.menuCodes = arr1;
        this.form2.menuCodes = arr2;
      });
      console.log(this.form2.menuCodes);
    },
    // 获取所有角色
    getAllRole () {
      let that = this;
      http.getAllRole().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.tableData = response.data.data;
        }
      }).catch(error => {
        console.log(error);
      });
    }
  },
  mounted () {
    this.getAllMenus();
    this.getAllRole();
  }
}
</script>

<style scoped>
  .container{
    width:100%;
    height:90%;
    overflow:hidden;
    padding-top:1%;
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

