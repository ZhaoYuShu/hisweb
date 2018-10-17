<!--单位体检个人预登记-->
<template>
    <div class="container">
      <individual-pre-tree></individual-pre-tree>
      <individual-pre-form></individual-pre-form>
    </div>
</template>

<script>
import IndividualPreTree from "../../components/tree/individualPreTree";
import IndividualPreForm from "../../components/form/individualPreForm";
export default {
  name: "individualPreRegistration",
  components: {IndividualPreForm, IndividualPreTree}
}
</script>

<style scoped>
.container{
  height:100%;
  width:100%;
  overflow:hidden;
}
</style>
