<template>
  <div class="container">
    <package-tree></package-tree>
    <package-tabs></package-tabs>
  </div>
</template>

<script>
import PackageTree from '@/components/tree/packageTree'
import PackageTabs from '@/components/tabs/package/packageTabs'
export default {
  name: "package",
  components: {PackageTabs, PackageTree}
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:hidden;
  }
</style>
