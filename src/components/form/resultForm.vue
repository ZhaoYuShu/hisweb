<template>
    <div class="rightForm">
      <!--对话框-->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
        <span>确定删除常见结果？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="deleteCommonResults" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <!--新增-->
      <el-dialog title="项目常见结果" :visible.sync="dialogFormVisible">
        <el-form :model="form" ref="form" :rules="rules2" label-width="100px" class="demo-form">
          <el-row :gutter="20">
            <!--<el-col :span="12">-->
              <!--<el-form-item label="编号" prop="code">-->
                <!--<el-input v-model="form.code" disabled></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <el-col :span="12">
              <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" placeholder="请输入名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="显示顺序" prop="seq">
                <el-input v-model="form.seq" placeholder="请输入显示顺序"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="描述" prop="descrption">
                <el-input v-model="form.descrption" placeholder="请输入描述"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="诊断" prop="diagnoseId">
                <el-select v-model="form.diagnoseId" filterable placeholder="请选择诊断">
                  <el-option
                    v-for="item in diagnoseId"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="拼音简拼" prop="spell">
                <el-input v-model="form.spell" placeholder="请输入拼音简拼"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="五笔简拼" prop="fiveName">
                <el-input v-model="form.fiveName" placeholder="请输入五笔简拼"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="小于" prop="samll">
                <el-input v-model="form.samll" placeholder="请输入最大值"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="大于" prop="big">
                <el-input v-model="form.big" placeholder="请输入最小值"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="confirmInsert('form')" size="small">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改-->
      <el-dialog title="项目常见结果" :visible.sync="dialogFormVisible2">
        <el-form :model="form2" ref="form2" :rules="rules2" label-width="100px" class="demo-form2">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="名称" prop="name">
                <el-input v-model="form2.name" placeholder="请输入名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="显示顺序" prop="seq">
                <el-input v-model="form2.seq" placeholder="请输入显示顺序"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="描述" prop="descrption">
                <el-input v-model="form2.descrption" placeholder="请输入描述"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="诊断" prop="diagnoseId">
                <el-select v-model="form2.diagnoseId" filterable placeholder="请选择诊断">
                  <el-option
                    v-for="item in diagnoseId"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="拼音简拼" prop="spell">
                <el-input v-model="form2.spell" placeholder="请输入拼音简拼"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="五笔简拼" prop="fiveName">
                <el-input v-model="form2.fiveName" placeholder="请输入五笔简拼"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="小于" prop="samll">
                <el-input v-model="form2.samll" placeholder="请输入最大值"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="大于" prop="big">
                <el-input v-model="form2.big" placeholder="请输入最小值"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false" size="small">取 消</el-button>
          <el-button type="primary" @click="updateResults('form2')" size="small">确 定</el-button>
        </div>
      </el-dialog>
      <!--表单-->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
        <el-row>
          <el-col :span="24">
            <p class="title">项目结果进入方式设置</p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="是否进入小结" prop="inNode" required>
              <el-radio-group v-model="ruleForm.inNode">
                <el-radio
                  v-for="item in summary"
                  :key="item.id"
                  :label="item.boolean">{{item.value}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称是否显示进入小结" prop="inNodeName" required>
              <el-radio-group v-model="ruleForm.inNodeName">
                <el-radio
                  v-for="item in showName"
                  :key="item.id"
                  :label="item.boolean">{{item.value}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="性别" required prop="sex">
              <el-select v-model="ruleForm.sex" @change="handleChange">
                <el-option
                  v-for="item in gender"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="男女是否使用同一常见结果" prop="resultType">
              <el-radio-group v-model="ruleForm.resultType" disabled>
                <el-radio
                  v-for="item in result"
                  :key="item.id"
                  :label="item.id">{{item.value}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <!--<el-col :span="12">-->
            <!--<el-form-item>-->
          <el-button type="primary" @click="resetForm('ruleForm')" size="small">增加</el-button>
          <el-button type="success" @click="submitForm('ruleForm')" size="small">保存</el-button>
          <el-button type="danger" @click="insertForm" size="small">插入</el-button>
          <!--<el-button type="warning" @click="updateForm('ruleForm')" size="small">修改</el-button>-->
          <el-button size="small" @click="reloadTree">刷新</el-button>
            <!--</el-form-item>-->
          <!--</el-col>-->
        </el-row>
      </el-form>
      <hr style="width:96%;"/>
      <el-row>
        <el-col :span="12">
          <p class="title">项目常见结果</p>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        border
        height="69%"
        :row-class-name="tableRowClassName"
        @row-click="rowClick"
        :highlight-current-row="true">
        <el-table-column
          label="顺序"
          type="index"
          width="80"
          align="left">
        </el-table-column>
        <el-table-column
          label="结果名称"
          prop="name"
          width="200"
          align="left">
        </el-table-column>
        <el-table-column
          prop="descrption"
          label="描述"
          width="200"
          align="left">
        </el-table-column>
        <el-table-column
          prop="diagnoseContext"
          label="诊断"
          width="200"
          align="left">
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="seq"-->
          <!--label="显示顺序"-->
          <!--width="100"-->
          <!--align="left">-->
        <!--</el-table-column>-->
        <el-table-column
          prop="samll"
          label="小于"
          width="100"
          align="left">
        </el-table-column>
        <el-table-column
          prop="big"
          label="大于"
          width="100"
          align="left">
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right">
          <template slot-scope="scope">
            <el-button @click="updateForm(scope.row)" type="warning" size="small">修改</el-button>
            <el-button @click="handleClick(scope.row)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
import http from '@/api/index.js'
import Bus from '@/utils/bus.js'
export default {
  name: "resultForm",
  data () {
    return {
      ruleForm: {
        inNode: '', // 是否进入小结
        inNodeName: '', // 项目名称是否进入小结
        sex: '', // 性别
        resultType: '' // 男女是否使用同一套结果
      },
      form: {
        name: '', // 结果名称
        seq: '', // 显示顺序
        descrption: '', // 描述
        diagnoseId: '', // 诊断
        spell: '', // 拼音简拼
        fiveName: '', // 五笔简拼
        samll: '', // 最小值
        big: '' // 最大值
      },
      form2: {
        name: '',
        seq: '',
        descrption: '',
        diagnoseId: '',
        spell: '',
        fiveName: '',
        samll: '',
        big: ''
      },
      examItemId: '', // 项目ID
      diagnoseId: [], // 所有诊断
      currentId: '',
      dialogVisible: false,
      rules: {
        inNode: [
          {required: true, message: '请选择是否进入小结', trigger: 'change'}
        ],
        inNodeName: [
          {required: true, message: '请选择项目名称是否进入小结', trigger: 'change'}
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ]
        // resultType: [
        //   {required: true, message: '请选择', trigger: 'change'}
        // ]
      },
      rules2: {
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'}
        ],
        descrption: [
          {required: true, message: '请输入描述', trigger: 'blur'}
        ]
      },
      summary: [
        {id: 1, value: '是', boolean: true},
        {id: 0, value: '否', boolean: false}
      ],
      showName: [
        {id: 1, value: '是', boolean: true},
        {id: 0, value: '否', boolean: false}
      ],
      gender: [
        {id: 1, value: '男'},
        {id: 2, value: '女'},
        {id: 0, value: '所有'}
      ],
      result: [
        {id: 1, value: '是'},
        {id: 0, value: '否'}
      ],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      tableData: [],
      obj: {},
      obj2: {},
      arr: [],
      arr2: [],
      currentCode: ''
    }
  },
  methods: {
    // 增加常见结果
    submitForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          http.addCommonResults(that.obj).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '添加常见结果成功！',
                type: 'success'
              });
              that.arr = [];
              http.commonResultsDetail(that.examItemId).then(response => {
                console.log(response);
                if (response.status === 200 && response.data.result === '00000000') {
                  that.tableData = response.data.data.commonResultParamDtoList;
                }
              }).catch(error => {
                console.log(error);
              });
            } else {
              that.$message({
                message: response.data.msg,
                type: 'error'
              });
            }
          }).catch(function (error) {
            console.log(error);
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 重置所有
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    // 只重置插入的表单
    resetForm2 (formName) {
      this.$refs[formName].resetFields();
    },
    // 删除常见结果
    handleClick (row) {
      console.log(row);
      this.currentCode = row.id;
      this.dialogVisible = true;
    },
    // 确定删除常见结果
    deleteCommonResults () {
      let that = this;
      that.dialogVisible = false;
      http.deleteCommonResults(that.currentCode).then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.$message({
            message: '删除常见结果成功！',
            type: 'success'
          });
          http.commonResultsDetail(that.examItemId).then(response => {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.tableData = response.data.data.commonResultParamDtoList;
            }
          }).catch(error => {
            console.log(error);
          });
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    // 弹出修改框
    updateForm (row) {
      let that = this;
      console.log(row);
      this.dialogFormVisible2 = true;
      http.commonResultsDetail2(row.id).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.form2 = response.data.data;
        }
      }).catch(error =>{
        console.log(error);
      });
    },
    // 修改常见结果
    updateResults (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = {};
          let obj2 = {};
          that.arr2 = [];
          obj2.big = that.form2.big;
          obj2.descrption = that.form2.descrption;
          obj2.diagnoseId = that.form2.diagnoseId;
          obj2.fiveName = that.form2.fiveName;
          obj.inNode = that.ruleForm.inNode;
          obj.inNodeName = that.ruleForm.inNodeName;
          obj2.name = that.form2.name;
          obj.resultType = that.ruleForm.resultType;
          obj2.samll = that.form2.samll;
          obj2.seq = that.form2.seq;
          obj.sex = that.ruleForm.sex;
          obj2.spell = that.form2.spell;
          obj2.id = that.form2.id;
          that.arr2.push(obj2);
          obj.commonResultParamDtoList = that.arr2;
          obj.examItemId = that.examItemId;
          that.obj2 = obj;
          console.log('submit!');
          http.updateCommonResults(that.obj2).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '修改常见结果成功！',
                type: 'success'
              });
              that.dialogFormVisible2 = false;
              http.commonResultsDetail(that.examItemId).then(response => {
                console.log(response);
                if (response.status === 200 && response.data.result === '00000000') {
                  that.tableData = response.data.data.commonResultParamDtoList;
                }
              }).catch(error => {
                console.log(error);
              });
            } else {
              that.$message({
                message: response.data.msg,
                type: 'error'
              });
            }
          }).catch(function (error) {
            console.log(error);
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleChange (value) {
      console.log(value);
      if (value === 0) {
        this.ruleForm.resultType = 1;
      } else {
        this.ruleForm.resultType = 0;
      }
    },
    // 选择上级科室
    selectOffice (value) {
      // let that = this;
      console.log(value);
    },
    // 插入常见结果
    insertForm () {
      this.dialogFormVisible = true;
    },
    // 确定插入常见结果
    confirmInsert (formName) {
      let that = this;
      this.dialogFormVisible = false;
      let obj = {};
      let obj2 = {};
      that.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit');
          obj2.big = that.form.big;
          obj2.descrption = that.form.descrption;
          obj2.diagnoseId = that.form.diagnoseId;
          obj2.fiveName = that.form.fiveName;
          obj.inNode = that.ruleForm.inNode;
          obj.inNodeName = that.ruleForm.inNodeName;
          obj2.name = that.form.name;
          obj.resultType = that.ruleForm.resultType;
          obj2.samll = that.form.samll;
          obj2.seq = that.form.seq;
          obj.sex = that.ruleForm.sex;
          obj2.spell = that.form.spell;
          that.arr.push(obj2);
          obj.commonResultParamDtoList = that.arr;
          obj.examItemId = that.examItemId;
          that.obj = obj;
        }
      });
      console.log(that.obj);
      that.resetForm2('form');
      console.log(that.tableData, typeof that.tableData);
      that.tableData.push(obj2);
    },
    // 获取所有诊断
    getAllDiagnose () {
      let that = this;
      http.allDiagnoseInfo().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.diagnoseId = response.data.data;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 变化表格的颜色
    tableRowClassName ({row, rowIndex}) {
      let length = this.tableData.length - this.arr.length;
      if (length && rowIndex >= length) {
        return 'success-row';
      }
    },
    // 刷新树结构
    reloadTree () {
      let that = this;
      Bus.$emit("loading1", true);
      http.examItemTree().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          Bus.$emit("reloadResultTree", response.data.data);
          Bus.$emit("loading2", false);
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 点击每行获取项目结果进入方式设置的信息
    rowClick (row, event, column) {
      let that = this;
      http.commonResultsDetail2(row.id).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.ruleForm.inNode = response.data.data.inNode;
          that.ruleForm.inNodeName = response.data.data.inNodeName;
          that.ruleForm.sex = response.data.data.sex;
          that.ruleForm.resultType = response.data.data.resultType;
        }
      }).catch(error =>{
        console.log(error);
      });
    }
  },
  mounted () {
    this.getAllDiagnose();
    Bus.$on("currentId", (e) => {
      this.examItemId = e;
    });
    Bus.$on("tableData", (e) => {
      this.tableData = e;
    });
    Bus.$on('ruleForm', (e) => {
      this.ruleForm = e;
    });
    Bus.$on('diagnoseInfo', (e) => {
      this.diagnoseId = e;
    });
  }
}
</script>

<style scoped>
  .rightForm{
    float:right;
    width:81%;
    height:100%;
    background:#fff;
    margin-left:1%;
    padding-right:1%;
    overflow:hidden;
  }
  .el-radio-group{
    width:100%;
  }
  .title{
    text-align:left;
    text-indent:20px;
    font-size:12px;
    font-weight:bold;
  }
  .el-table{
    width:96%;
    margin:0 auto;
  }
</style>
<style scoped>
  >>>.el-form-item__label{
    font-size:12px;
  }
  >>>.el-input__inner{
    height:30px;
    line-height:30px;
  }
  >>>.el-input-number.is-controls-right .el-input-number__increase{
    height:15px;
    top:5px;
  }
  >>>.el-input-number.is-controls-right .el-input-number__decrease{
    height:15px;
    bottom:5px;
  }
  >>>.el-form-item{
    margin-bottom:15px;
  }
  >>>.el-date-editor.el-input, >>>.el-date-editor.el-input__inner{
    width:100%;
  }
  >>>.el-select{
    width:100%;
  }
  >>>.el-table{
    font-size:12px;
  }
  >>>.el-table td, >>>.el-table th{
    padding:0.8vh 0;
  }
  >>>.el-tree-node__label{
    font-size:12px;
  }
  >>>.el-radio__label{
    font-size:12px;
  }
  >>>.el-checkbox+.el-checkbox{
    display:block;
  }
  >>>.el-transfer-panel__item.el-checkbox{
    margin-left:30px;
  }

</style>
