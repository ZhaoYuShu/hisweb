<template>
    <div class="container">
      <service-registration-tree></service-registration-tree>
      <service-registration-form></service-registration-form>
    </div>
</template>

<script>
import ServiceRegistrationTree from "../../components/tree/serviceRegistrationTree";
import ServiceRegistrationForm from "../../components/form/serviceRegistrationForm";
export default {
  name: "serviceRegistration",
  components: {ServiceRegistrationForm, ServiceRegistrationTree}
}
</script>

<style scoped>
.container{
  width:100%;
  height:100%;
  overflow:hidden;
}
</style>
