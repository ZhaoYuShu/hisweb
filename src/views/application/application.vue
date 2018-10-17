<!--申请单设置-->
<template>
    <div class="container">
      <application-tree></application-tree>
      <application-tabs></application-tabs>
    </div>
</template>

<script>
import ApplicationTree from "../../components/tree/applicationTree";
import ApplicationTabs from "../../components/tabs/application/applicationTabs";
export default {
  name: "application",
  components: {ApplicationTabs, ApplicationTree}
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:hidden;
  }
</style>
