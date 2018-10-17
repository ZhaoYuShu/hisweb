<template>
  <div class="rightForm">
    <!--对话框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定删除菜单？</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="deleteMenu" size="small">确 定</el-button>
        </span>
    </el-dialog>
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="菜单名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入菜单名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上级菜单" prop="parentId">
            <el-select v-model="ruleForm.parentId" placeholder="请选择上级菜单">
              <el-option
                v-for="item in menus"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="菜单序号" prop="num">
            <el-input v-model="ruleForm.num" placeholder="请输入菜单序号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单类型" prop="menuType">
            <el-select v-model="ruleForm.menuType" placeholder="请选择菜单类型">
              <el-option
                v-for="item in menuType"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="标识符" prop="code">
            <el-input v-model="ruleForm.code" placeholder="请输入标识符"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单地址" prop="url">
            <el-input v-model="ruleForm.url" placeholder="请输入菜单地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-row :gutter="20">-->
        <!--<el-col :span="12">-->
          <!--<el-form-item label="菜单图标" prop="icon">-->
            <!--<el-input v-model="ruleForm.icon" placeholder="请输入菜单图标"></el-input>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
      <!--</el-row>-->
      <el-row type="flex" justify="center">
        <!--<el-col :span="16">-->
        <el-button type="primary" size="small" @click="resetForm('ruleForm')">增加</el-button>
        <el-button type="success" size="small" @click="addForm('ruleForm')" :disabled="saveDisabled">保存</el-button>
        <el-button type="danger" size="small" @click="dialogVisible = true" :disabled="deleteDisabled">删除</el-button>
        <el-button type="warning" size="small" @click="updateForm('ruleForm')" :disabled="updateDisabled">修改</el-button>
        <el-button size="small" @click="reloadTree">刷新</el-button>
        <!--</el-col>-->
      </el-row>
    </el-form>
  </div>
</template>

<script>
import http from '@/api/index.js'
import Bus from '@/utils/bus.js'
export default {
  name: "menusForm",
  data () {
    return {
      ruleForm: {
        name: '', // 菜单名称
        num: '', // 菜单序号
        menuType: 1, // 菜单类型
        code: '', // 标识符
        url: '', // 菜单地址
        // icon: '', // 菜单图标
        parentId: 0 // 上级菜单id
      },
      rules: {
        name: [
          {required: true, message: '请输入菜单名称', trigger: 'blur'}
        ],
        menuType: [
          {required: true, message: '请选择菜单名称', trigger: 'change'}
        ],
        parentId: [
          {required: true, message: '请选择上级菜单', trigger: 'change'}
        ]
      },
      menuType: [
        {id: 1, name: '菜单'},
        {id: 2, name: '业务操作'}
      ],
      currentId: '',
      menus: [],
      dialogVisible: false,
      saveDisabled: false,
      deleteDisabled: true,
      updateDisabled: true
    }
  },
  methods: {
    // 增加菜单
    addForm (formName) {
      let that = this;
      that.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          http.addMenu(that.ruleForm).then(response => {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '添加菜单成功！',
                type: 'success'
              });
              that.resetForm('ruleForm');
              http.menuTree().then(response => {
                console.log(response);
                if (response.status === 200 && response.data.result === '00000000') {
                  Bus.$emit("addMenusTree", response.data.data);
                }
              }).catch(error => {
                console.log(error);
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
      })
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields();
      this.getAllMenus();
      this.ruleForm.menuCode = '';
      this.ruleForm.id = '';
      this.saveDisabled = false;
      this.deleteDisabled = true;
      this.updateDisabled = true;
    },
    // 删除菜单
    deleteMenu () {
      let that = this;
      http.deleteMenu(that.currentId).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.$message({
            message: '删除菜单成功！',
            type: 'success'
          });
          that.resetForm('ruleForm');
          http.menuTree().then(response => {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              Bus.$emit('deleteMenusTree', response.data.data);
            }
          }).catch(error => {
            console.log(error);
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
      that.dialogVisible = false;
    },
    // 修改菜单
    updateForm (formName) {
      let that = this;
      that.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          http.updateMenu(that.ruleForm).then(response => {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '修改菜单成功！',
                type: 'success'
              });
              that.getAllMenus();
              http.menuTree().then(response => {
                console.log(response);
                if (response.status === 200 && response.data.result === '00000000') {
                  Bus.$emit("updateMenusTree", response.data.data);
                }
              }).catch(error => {
                console.log(error);
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
      })
    },
    // 获取所有菜单
    getAllMenus () {
      let that = this;
      http.menuTree().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          let result = response.data.data;
          let arr = [];
          // for (let i = 0; i < result.length; i++) {
          //   result[i].level = 0;
          //   arr.push(result[i]);
          //   if (result[i].childMenu) {
          //     let child = result[i].childMenu;
          //     for (let j = 0; j < child.length; j++) {
          //       child[j].level = 2;
          //       arr.push(child[j]);
          //     }
          //   }
          // }
          for (let i = 0; i < result.length; i++) {
            arr.push(result[i]);
          }
          arr.unshift({id: 0, name: '无'});
          that.menus = arr;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 刷新树结构
    reloadTree () {
      let that = this;
      Bus.$emit("loading1", true);
      http.menuTree().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          Bus.$emit("reloadMenusTree", response.data.data);
          Bus.$emit("loading2", false);
        }
      }).catch(error => {
        console.log(error);
      });
    }
  },
  mounted () {
    this.getAllMenus();
    Bus.$on("menuCode", (e) => {
      this.currentId = e;
    });
    Bus.$on("menuDetail", (e) => {
      this.ruleForm = e;
    });
    Bus.$on("saveDisabledMenus", (e) => {
      this.saveDisabled = e;
    });
    Bus.$on("deleteDisabledMenus", (e) => {
      this.deleteDisabled = e;
    });
    Bus.$on("updateDisabledMenus", (e) => {
      this.updateDisabled = e;
    });
  }
}
</script>

<style scoped>
  .rightForm{
    width:82%;
    height:90%;
    padding-top:1%;
    float:right;
    background:#fff;
    padding-right:1%;
  }
</style>
<style>
  @import '../../styles/common.css';
</style>
