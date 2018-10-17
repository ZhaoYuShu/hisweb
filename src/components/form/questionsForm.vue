<template>
    <div class="rightForm">
      <!--对话框-->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
        <span>确定删除问题明细？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteQuestions">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible2"
        width="30%">
        <span>确定删除问题答案？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="deleteQuestions">确 定</el-button>
        </span>
      </el-dialog>
      <!--增加问题答案-->
      <el-dialog title="新增问题答案" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules2" ref="form">
          <el-row>
            <el-col :span="20">
              <el-form-item label="建议内容" label-width="100px" prop="diagnoseContent">
                <el-input v-model="form.diagnoseContent" placeholder="请输入问题答案" type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm('form')">确 定</el-button>
        </div>
      </el-dialog>
      <div class="top">
        <el-row style="display:flex;align-items:center;justify-content:space-between;">
          <el-col :span="16">
            <h5 class="title">问题明细</h5>
          </el-col>
          <el-col :span="8" style="display:flex;align-items:center;justify-content:flex-end;">
            <el-button type="primary" @click="resetForm('ruleForm')" size="small">增加</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')" size="small">保存</el-button>
            <el-button type="primary" @click="dialogVisible = true" size="small">删除</el-button>
            <el-button type="primary" @click="updateOffice('ruleForm')" size="small">修改</el-button>
          </el-col>
        </el-row>
        <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-row>
            <el-col :span="24">
              <el-form-item label="问题内容" prop="content">
                <el-input type="textarea" v-model="ruleForm.content"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="问题类别" prop="type">
                <el-input v-model="ruleForm.type"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="结果类型" prop="resultType">
                <el-radio-group v-model="ruleForm.resultType">
                  <el-radio
                    v-for="item in resultType"
                    :key="item.id"
                    :label="item.id">{{item.value}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item prop="sex" label="适用性别">
                <el-radio-group v-model="ruleForm.sex">
                  <el-radio
                    v-for="item in sex"
                    :key="item.id"
                    :label="item.id">{{item.value}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="显示顺序" prop="seq">
                <el-input v-model="ruleForm.seq" placeholder="请输入显示顺序"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <hr style="width:98%;"/>
      <div class="bottom">
        <el-row style="display:flex;align-items:center;justify-content: space-between;">
          <el-col :span="22">
            <h5 class="title">问题答案</h5>
          </el-col>
          <el-col :span="2" style="display:flex;align-items:center;justify-content: flex-end;">
            <el-button @click="dialogFormVisible = true" type="primary" size="small">添加</el-button>
          </el-col>
        </el-row>
        <el-table
          :data="tableData"
          style="width:98%;margin:0 auto;"
          border
          height="70%">
          <el-table-column
            type="index"
            label="序号"
            width="80"></el-table-column>
          <el-table-column
            prop="answer"
            label="问题答案"
            >
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="100">
            <template slot-scope="scope">
              <el-button @click="updateAnswer(scope.$index, scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="deleteAnswer(scope.$index, scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
export default {
  name: "questionsForm",
  data () {
    return {
      ruleForm: {
        content: '',
        type: '',
        resultType: '',
        sex: '',
        seq: ''
      },
      form: {
        answer: ''
      },
      rules: {
        content: [
          {required: true, message: '请输入问题内容', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请输入问题类别', trigger: 'blur'}
        ],
        resultType: [
          {required: true, message: '请选择结果类型', trigger: 'change'}
        ],
        sex: [
          {required: true, message: '请选择适用性别', trigger: 'change'}
        ]
      },
      rules2: {
        answer: [
          {required: true, message: '请输入问题答案', trigger: 'blur'}
        ]
      },
      resultType: [
        {id: 0, value: '单选'},
        {id: 1, value: '多选'}
      ],
      sex: [
        {id: 1, value: '男'},
        {id: 2, value: '女'},
        {id: 0, value: '均可'}
      ],
      dialogVisible: false,
      dialogVisible2: false,
      dialogFormVisible: false,
      tableData: []
    }
  },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    // 提交问题明细
    submitForm (formName) {
      console.log(33);
    },
    // 修改问题明细
    updateOffice (formName) {
      console.log(44);
    },
    // 确认删除问题明细
    deleteQuestions () {
      console.log(111);
    }
  }
}
</script>

<style scoped>
  .rightForm{
    width:80%;
    height:92%;
    float:left;
    margin-left:4%;
    padding-right:1%;
    background:#fff;
    overflow:auto;
  }
  .top{
    width:100%;
    height:45%;
    margin-bottom:5%;
  }
  .top .title{
    text-align:left;
    text-indent:20px;
  }
  .bottom{
    width:100%;
    height:50%;
  }
  .bottom .title{
    text-align:left;
    text-indent:20px;
  }
</style>
