<template>
  <div class="box">
    <el-aside>
      <el-col :span="24">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :router="true">
          <template v-for="item in menuList">
            <el-menu-item v-if="item.childMenu.length < 1" :index="item.name" :route="{path:'{{item.url}}'}" :key="item.menuId">{{item.name}}</el-menu-item>
            <el-submenu v-else :key="item.id" :index="item.menuCode">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">{{item.name}}</span>
              </template>
              <template v-for="child in item.childMenu">
                <el-menu-item :index="child.url" :key="child.id">{{child.name}}</el-menu-item>
              </template>
            </el-submenu>
          </template>
        </el-menu>
      </el-col>
    </el-aside>
  </div>
</template>

<script>

export default {
  name: 'Side',
  data () {
    return {
      menuList: JSON.parse(localStorage.getItem('menuList'))
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
  .box{
    height:100%;
    width:20%;
  }
  .el-aside{
    width:100%!important;
    background:#d3dce6;
    color:#333;
    text-align:left;
    height:100%;
  }
  .el-aside .el-col{
    height:100%;
  }
  .el-aside .el-col .el-menu{
    height:100%;
  }
</style>
