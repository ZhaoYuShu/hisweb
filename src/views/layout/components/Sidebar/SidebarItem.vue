<template>
  <div class="menu-wrapper">
    <!--<template v-for="item in routes" v-if="!item.hidden&&item.children">-->

      <!--<router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow" :to="item.path+'/'+item.children[0].path"-->
        <!--:key="item.children[0].name">-->
        <!--<el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">-->
          <!--<svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>-->
          <!--<span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{generateTitle(item.children[0].meta.title)}}</span>-->
        <!--</el-menu-item>-->
      <!--</router-link>-->

      <!--<el-submenu v-else :index="item.name||item.path" :key="item.name">-->
        <!--<template slot="title">-->
          <!--<svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>-->
          <!--<span v-if="item.meta&&item.meta.title" slot="title">{{generateTitle(item.meta.title)}}</span>-->
        <!--</template>-->

        <!--<template v-for="child in item.children" v-if="!child.hidden">-->
          <!--<sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>-->

          <!--<router-link v-else :to="item.path+'/'+child.path" :key="child.name">-->
            <!--<el-menu-item :index="item.path+'/'+child.path">-->
              <!--<svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>-->
              <!--<span v-if="child.meta&&child.meta.title" slot="title">{{generateTitle(child.meta.title)}}</span>-->
            <!--</el-menu-item>-->
          <!--</router-link>-->
        <!--</template>-->
      <!--</el-submenu>-->

    <!--</template>-->


    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#42b983"
      text-color="#fff"
      active-text-color="#42b983"
      :unique-opened="true"
      :router="true"
      >
      <template v-for="item in menuList">
        <el-menu-item v-if="item.childMenu.length < 1" :index="item.url" :key="item.menuId">{{item.name}}</el-menu-item>
        <el-submenu v-else :key="item.id" :index="item.menuCode">
          <template slot="title">
            <!--<i class="el-icon-setting"></i>-->
            <span slot="title">{{item.name}}</span>
          </template>
          <template v-for="child in item.childMenu">
            <el-menu-item :index="child.url" :key="child.id">{{child.name}}</el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
// import { generateTitle } from '@/utils/i18n'
export default {
  name: 'SidebarItem',
  data () {
    return {
      menuList: JSON.parse(localStorage.getItem('menuList'))
    }
  },
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // generateTitle,
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      });
      if (showingChildren.length === 1) {
        return true
      }
      return false
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  created() {
    for (const o in this.routes) {
      const obj = this.routes[o];
      if (obj.path.indexOf('myiframe') >= 0) {
        obj.children[0].path = 'urlPath?src=https://www.baidu.com'
      }
    }
  }
}
</script>
<style scoped>
  .el-menu-item.is-active{
    background:#f4f3f3!important;
  }
  .el-menu{
    background:#42b983;
  }
  .el-submenu .el-menu{
    background:#23d584!important;
  }
  .el-submenu__title{
    background:#42b983!important;
  }
  .el-submenu__title span{
    font-size:18px;
  }
  .el-menu-item{
    font-size:18px;
  }
</style>
