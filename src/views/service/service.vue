<!--服务行业维护-->
<template>
    <div class="container">
      <service-tree></service-tree>
      <service-form></service-form>
    </div>
</template>

<script>
import ServiceTree from "../../components/tree/serviceTree";
import ServiceForm from '../../components/form/serviceForm';
export default {
  name: "service",
  components: {ServiceTree, ServiceForm}
}
</script>

<style scoped>
.container{
  width:100%;
  height:100%;
  overflow:hidden;
}
</style>
