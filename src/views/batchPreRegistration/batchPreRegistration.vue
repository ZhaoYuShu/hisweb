<template>
    <div class="container">
      <el-dialog title="批量预登记导入方式选择" :visible.sync="dialogFormVisible">
        <el-form :model="form" ref="form" label-width="100px" :rules="rules" class="demo-form">
          <el-form-item label="导入方式" prop="method">
            <el-radio-group v-model="form.method">
              <el-radio
                v-for="item in method"
                :key="item.id"
                :label="item.id">
                {{item.value}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel" size="small">取 消</el-button>
          <el-button type="primary" @click="confirm" size="small">确 定</el-button>
        </div>
      </el-dialog>
      <el-button type="primary" @click="chooseMethod" class="choose">批量导入</el-button>
    </div>
</template>

<script>
export default {
  name: "batchPreRegistration",
  data () {
    return {
      dialogFormVisible: false,
      form: {
        method: ''
      },
      rules: {
        method: [
          {required: true, message: '请选择导入方式', trigger: 'change'}
        ]
      },
      method: [
        {id: 0, value: '从Excel文件中读取'},
        {id: 1, value: '从以往体检记录中读取'}
      ]
    }
  },
  methods: {
    // 点击批量导入按钮弹出弹出框
    chooseMethod () {
      this.dialogFormVisible = true;
    },
    // 取消选择
    cancel () {
      this.form.method = '';
      this.dialogFormVisible = false;
    },
    // 确认选择
    confirm () {
      console.log(this.form.method);
      if (this.form.method === 0) {
        // 从Excel中导入
        this.$router.push({path: 'batchFromExcel'});
      } else if (this.form.method === 1) {
        // 从以往记录中导入
        this.$router.push({path: 'batchFromRecord'});
      }
      this.dialogFormVisible = false;
    }
  }
}
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
    overflow:hidden;
  }
  .choose{
    position:absolute;
    left:50%;
    top:50%;
    transform: translateX(-50%) translateY(-50%);
  }
</style>
