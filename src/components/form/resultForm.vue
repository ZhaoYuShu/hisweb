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
      <el-dialog title="数字型项目常见结果" :visible.sync="dialogFormVisible">
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
              <el-form-item label="描述" prop="desc">
                <el-input v-model="form.desc" placeholder="请输入描述"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="诊断" prop="diagnoseId">
                <el-select v-model="form.diagnoseId" placeholder="请选择诊断">
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
              <el-form-item label="小于" prop="small">
                <el-input v-model="form.small" placeholder="请输入最小值"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="大于" prop="big">
                <el-input v-model="form.big" placeholder="请输入最大值"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="confirmInsert('form')" size="small">确 定</el-button>
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
                  :label="item.id">{{item.value}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称是否显示进入小结" prop="inNodeName" required>
              <el-radio-group v-model="ruleForm.inNodeName">
                <el-radio
                  v-for="item in showName"
                  :key="item.id"
                  :label="item.id">{{item.value}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="性别" required prop="sex">
              <el-select v-model="ruleForm.sex">
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
            <el-form-item label="男女是否使用同一常见结果" prop="resultType" required>
              <el-radio-group v-model="ruleForm.resultType">
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
          <el-button type="info" @click="insertForm" size="small">插入</el-button>
          <el-button size="small" @click="reloadTree">刷新</el-button>
            <!--</el-form-item>-->
          <!--</el-col>-->
        </el-row>
      </el-form>
      <hr style="width:96%;"/>
      <el-row>
        <el-col :span="12">
          <p class="title">字符型项目常见结果</p>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        border
        height="69%"
        :row-class-name="tableRowClassName">
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
          prop="desc"
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
        <el-table-column
          prop="seq"
          label="显示顺序"
          width="100"
          align="left">
        </el-table-column>
        <el-table-column
          prop="spell"
          label="拼音简码"
          width="200"
          align="left">
        </el-table-column>
        <el-table-column
          prop="fiveName"
          label="五笔简码"
          width="200"
          align="left">
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
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
        desc: '', // 描述
        diagnoseId: '', // 诊断
        spell: '', // 拼音简拼
        fiveName: '', // 五笔简拼
        small: '', // 最小值
        big: '' // 最大值
      },
      examItemId: '', // 项目ID
      diagnoseId: '', // 所有诊断
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
        ],
        resultType: [
          {required: true, message: '请选择', trigger: 'change'}
        ]
      },
      rules2: {
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'}
        ],
        desc: [
          {required: true, message: '请输入描述', trigger: 'blur'}
        ]
      },
      summary: [
        {id: 1, value: '是'},
        {id: 0, value: '否'}
      ],
      showName: [
        {id: 1, value: '是'},
        {id: 0, value: '否'}
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
      tableData: [],
      obj: {},
      arr: [],
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
      this.currentCode = row.code;
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
    // 修改常见结果
    // updateForm (formName) {
    //   let that = this;
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       console.log('submit!');
    //       http.updateOffice(that.ruleForm).then(function (response) {
    //         console.log(response);
    //         if (response.status === 200 && response.data.result === '00000000') {
    //           that.$message({
    //             message: '修改常见结果成功！',
    //             type: 'success'
    //           });
    //         } else {
    //           that.$message({
    //             message: response.data.msg,
    //             type: 'error'
    //           });
    //         }
    //       }).catch(function (error) {
    //         console.log(error);
    //       });
    //     } else {
    //       console.log('error submit!!');
    //       return false;
    //     }
    //   });
    // },
    handleChange (value) {
      console.log(value);
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit');
          obj2.big = that.form.big;
          obj2.desc = that.form.desc;
          obj2.diagnoseId = that.form.diagnoseId;
          obj2.fiveName = that.form.fiveName;
          obj.inNode = that.ruleForm.inNode;
          obj.inNodeName = that.ruleForm.inNodeName;
          obj2.name = that.form.name;
          obj.resultType = that.ruleForm.resultType;
          obj2.small = that.form.small;
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
      this.resetForm2('form');
      console.log(this.tableData, typeof this.tableData);
      this.tableData.push(obj2);
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
      });    }
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
