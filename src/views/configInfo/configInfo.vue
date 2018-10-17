<!--体检中心基本信息配置表-->
<template>
  <div class="rightForm">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="地址" prop="address">
            <el-input v-model="ruleForm.address" placeholder="请输入地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label=""></el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "configInfo",
  data () {
    return {
      ruleForm: {
        name: '',
        address: ''
      }
    }
  }
}
</script>

<style scoped>
  .rightForm{
    width:100%;
    height:100%;
  }
</style>
