<template>
  <div class="box1">
    <!--对话框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定删除诊断信息？</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="confirmDelete" size="small">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible2"
      width="30%">
      <span>确定删除建议内容？</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2 = false" size="small">取 消</el-button>
          <el-button type="primary" @click="confirmDelete2" size="small">确 定</el-button>
        </span>
    </el-dialog>
    <!--增加诊断信息-->
    <el-dialog title="新增诊断信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="编号" :label-width="formLabelWidth" prop="code" required>
              <el-input v-model="form.code" auto-complete="off" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属科室" :label-width="formLabelWidth" prop="officeId">
              <el-select v-model="form.officeId" filterable :disabled="officeDisabled">
                <el-option
                  v-for="item in office"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="主要诊断" :label-width="formLabelWidth" prop="title">
              <el-input v-model="form.title" placeholder="请输入主要诊断"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="建议名称" :label-width="formLabelWidth" prop="name">
              <el-input v-model="form.name" placeholder="请输入建议名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="是否疾病" :label-width="formLabelWidth" prop="illness">
              <el-radio-group v-model="form.illness">
                <el-radio
                  v-for="item in illness"
                  :key="item.id"
                  :label="item.boolean">
                  {{item.value}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否常见病" :label-width="formLabelWidth" prop="commonDiseases">
              <el-radio-group v-model="form.commonDiseases">
                <el-radio
                  v-for="item in commonDiseases"
                  :key="item.id"
                  :label="item.boolean">
                  {{item.value}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel1('form')" size="small">取 消</el-button>
        <el-button type="primary" @click="confirm1('form')" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改诊断信息-->
    <el-dialog title="修改诊断信息" :visible.sync="dialogFormVisible3">
      <el-form :model="form3" :rules="rules" ref="form3">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="编号" :label-width="formLabelWidth" prop="code" required>
              <el-input v-model="form3.code" auto-complete="off" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属科室" :label-width="formLabelWidth" prop="officeId">
              <el-select v-model="form3.officeId" filterable>
                <el-option
                  v-for="item in office"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="主要诊断" :label-width="formLabelWidth" prop="title">
              <el-input v-model="form3.title" placeholder="请输入主要诊断"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="建议名称" :label-width="formLabelWidth" prop="name">
              <el-input v-model="form3.name" placeholder="请输入建议名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="是否疾病" :label-width="formLabelWidth" prop="illness">
              <el-radio-group v-model="form3.illness">
                <el-radio
                  v-for="item in illness"
                  :key="item.id"
                  :label="item.boolean">
                  {{item.value}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否常见病" :label-width="formLabelWidth" prop="commonDiseases">
              <el-radio-group v-model="form3.commonDiseases">
                <el-radio
                  v-for="item in commonDiseases"
                  :key="item.id"
                  :label="item.boolean">
                  {{item.value}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel3('form3')" size="small">取 消</el-button>
        <el-button type="primary" @click="confirm3('form3')" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <!--增加建议内容-->
    <el-dialog title="新增建议内容" :visible.sync="dialogFormVisible2">
      <el-form :model="form2" :rules="rules2" ref="form2">
        <el-row>
          <el-col :span="20">
            <el-form-item label="建议内容" :label-width="formLabelWidth" prop="diagnoseContent">
              <el-input v-model="form2.diagnoseContent" placeholder="请输入建议内容" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel2('form2')" size="small">取 消</el-button>
        <el-button type="primary" @click="confirm2('form2')" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <el-row>
      <el-col :span="20">
        <h5 class="title">体检诊断信息</h5>
      </el-col>
      <el-col :span="2" class="span44">
        <el-button @click="addAdvice()" type="primary" class="add" size="small">添加</el-button>
      </el-col>
      <el-col :span="2" class="span4">
        <el-button @click="saveAdvice" type="success" class="save" size="small" :disabled="saveDisabled">保存</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      height="45%"
      border
      style="width:96%;margin:0 auto;"
      @row-click="handleRowClick"
      :highlight-current-row="true">
      <el-table-column
        label="顺序"
        type="index"
        width="60"
        align="left"></el-table-column>
      <el-table-column
        prop="code"
        label="编号"
        width="60"
        align="left"></el-table-column>
      <el-table-column
        prop="title"
        label="主要诊断"
        width="400"
        align="left"></el-table-column>
      <el-table-column
        prop="name"
        label="建议名称"
        width="400"
        align="left"></el-table-column>
      <el-table-column
        prop="illnessName"
        label="是否疾病"
        width="80"
        align="left"></el-table-column>
      <el-table-column
        prop="commonDiseasesName"
        label="是否常见病"
        width="100"
        align="left"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="updateDiagnoseInfo(scope.$index, scope.row)" type="warning" size="small">修改</el-button>
          <el-button @click="deleteDiagnoseInfo(scope.$index, scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="20">
        <h5 class="title">建议内容</h5>
      </el-col>
      <el-col :span="4" class="span4">
        <el-button type="primary" class="addAdvice" @click="addAdvice2" size="small">添加</el-button>
      </el-col>
    </el-row>
    <div class="bottom">
      <div class="advice">
        <el-table
          :data="tableData2"
          height="98%"
          border
          :highlight-current-row="true">
          <el-table-column
            type="index"
            label="顺序"
            width="60"></el-table-column>
          <el-table-column
            label="建议内容"
            prop="diagnoseContent"
            align="left"></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="deleteDiagnoseContent(scope.$index, scope.row)" type="danger" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/api/index.js'
import Bus from '@/utils/bus.js'
export default {
  name: "adviceTable",
  data () {
    return {
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      dialogVisible: false,
      dialogVisible2: false,
      form: {
        code: '',
        title: '',
        name: '',
        illness: '',
        commonDiseases: '',
        officeId: '',
        clinicId: '',
        // diagnoseContentResultDtos: [],
        seq: '',
        id: ''
      },
      form3: {
        code: '',
        title: '',
        name: '',
        illness: '',
        commonDiseases: '',
        officeId: '',
        clinicId: '',
        // diagnoseContentResultDtos: [],
        seq: '',
        id: ''
      },
      form2: {
        backup: '',
        diagnoseContent: '',
        seq: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入建议名称', trigger: 'blur'}
        ],
        title: [
          {required: true, message: '请输入主要诊断', trigger: 'blur'}
        ],
        officeId: [
          {required: true, message: '请选择所属科室', trigger: 'change'}
        ]
      },
      rules2: {
        diagnoseContent: [
          {required: true, message: '请输入建议内容', trigger: 'blur'}
        ]
      },
      formLabelWidth: '120px',
      tableData: [],
      tableData2: [],
      illness: [
        {id: 1, value: '是', boolean: true},
        {id: 0, value: '否', boolean: false}
      ],
      commonDiseases: [
        {id: 1, value: '是', boolean: true},
        {id: 0, value: '否', boolean: false}
      ],
      office: [],
      officeId: '',
      rowId: '',
      rowId2: '',
      infoCode: '',
      saveDisabled: false,
      saveDisabled2: false,
      officeDisabled: false,
      obj: {},
      currentCode: ''
    }
  },
  methods: {
    addAdvice () {
      this.dialogFormVisible = true;
      // this.form.officeId = this.officeId;

      // this.form.diagnoseContentResultDtos = [];
      this.form.title = '';
      this.form.name = '';
      this.form.illness = '';
      this.form.commonDiseases = '';
      this.form.officeId = '';
      this.form.clinicId = '';
      this.form.id = '';
      this.getCode();
      this.form.officeId = this.officeId;
    },
    addAdvice2 () {
      this.dialogFormVisible2 = true;
    },
    saveAdvice () {
      console.log('保存');
      let that = this;
      http.addDiagnoseInfo(this.form).then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.$message({
            message: '添加诊断信息成功！',
            type: 'success'
          });
          that.getCode();
          http.diagnoseInfoDetail(that.form.officeId).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              for (let i = 0; i < response.data.data.length; i++) {
                if (response.data.data[i].illness === true) {
                  response.data.data[i].illnessName = '是';
                } else if (response.data.data[i].illness === false) {
                  response.data.data[i].illnessName = '否';
                }
                if (response.data.data[i].commonDiseases === true) {
                  response.data.data[i].commonDiseasesName = '是';
                } else if (response.data.data[i].commonDiseases === false) {
                  response.data.data[i].commonDiseasesName = '否';
                }
              }
              console.log(response.data.data, 1111111111);
              that.tableData = response.data.data;
            }
          }).catch(function (error) {
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
    },
    // 点击一行显示对应的建议内容
    handleRowClick (row, event, column) {
      let that = this;
      that.infoCode = row.code;
      that.obj = row;
      that.currentCode = row.code;
      console.log(row, event, column);
      http.diagnoseContentDetail(row.code).then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.tableData2 = response.data.data;
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    // 获取编号
    getCode () {
      let that = this;
      http.diagnoseCode().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.form.code = response.data.data;
          that.currentCode = response.data.data;
          console.log(that.currentCode);
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    // 获取所有科室
    getOfficeList () {
      let that = this;
      http.officeList().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          let arr = [];
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].pid !== 0) {
              arr.push(response.data.data[i]);
            }
          }
          that.office = arr;
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    // 取消添加诊断信息
    cancel1 (formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },
    // 取消添加建议内容
    cancel2 (formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible2 = false
    },
    // 取消修改诊断信息
    cancel3 (formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible3 = false;
    },
    // 确定添加诊断信息
    confirm1 (formName) {
      let that = this;
      that.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          that.dialogFormVisible = false;
          console.log(that.form);
          http.diagnoseInfoDetail(that.form.officeId).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              for (let i = 0; i < response.data.data.length; i++) {
                if (response.data.data[i].illness === true) {
                  response.data.data[i].illnessName = '是';
                } else if (response.data.data[i].illness === false) {
                  response.data.data[i].illnessName = '否';
                }
                if (response.data.data[i].commonDiseases === true) {
                  response.data.data[i].commonDiseasesName = '是';
                } else if (response.data.data[i].commonDiseases === false) {
                  response.data.data[i].commonDiseasesName = '否';
                }
              }
              if (that.form.illness === true) {
                that.form.illnessName = '是';
              } else if (that.form.illness === false) {
                that.form.illnessName = '否';
              }
              if (that.form.commonDiseases === true) {
                that.form.commonDiseasesName = '是';
              } else if (that.form.commonDiseases === false) {
                that.form.commonDiseasesName = '否';
              }
              that.tableData = response.data.data;
              that.tableData.push(that.form);
            }
          }).catch(function (error) {
            console.log(error);
          });
          that.tableData2 = [];
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      this.saveDisabled = false;
    },
    // 确定添加建议内容
    confirm2 (formName) {
      let that = this;
      that.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          that.dialogFormVisible2 = false;
          let objSave = {};
          Object.assign(objSave, that.form2);
          that.tableData2.push(objSave);
          that.obj.diagnoseContent = that.form2.diagnoseContent;
          that.obj.diagnoseCode = that.currentCode;
          that.form2.diagnoseContent = '';
          console.log(that.obj);
          http.addDiagnoseContent(that.obj).then(response => {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '添加建议内容成功！',
                type: 'success'
              });
            } else {
              that.$message({
                message: response.data.msg,
                type: 'error'
              });
            }
          }).catch(error => {
            console.log(error);
          });
          // console.log(that.form.diagnoseContentResultDtos);
          console.log(that.form2);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      this.saveDisabled2 = false;
    },
    // 确定修改诊断信息
    confirm3 (formName) {
      let that = this;
      that.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("submit");
          console.log(that.form3);
          http.diagnoseContentDetail(that.form3.code).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.tableData2 = response.data.data;
              // that.form3.diagnoseContentResultDtos = response.data.data;
              http.updateDiagnoseInfo(that.form3).then(response => {
                console.log(response);
                if (response.status === 200 && response.data.result === '00000000') {
                  that.$message({
                    message: '修改诊断信息成功！',
                    type: 'success'
                  });
                  http.diagnoseInfoDetail(that.form3.officeId).then(function (response) {
                    console.log(response);
                    if (response.status === 200 && response.data.result === '00000000') {
                      for (let i = 0; i < response.data.data.length; i++) {
                        if (response.data.data[i].illness === true) {
                          response.data.data[i].illnessName = '是';
                        } else if (response.data.data[i].illness === false) {
                          response.data.data[i].illnessName = '否';
                        }
                        if (response.data.data[i].commonDiseases === true) {
                          response.data.data[i].commonDiseasesName = '是';
                        } else if (response.data.data[i].commonDiseases === false) {
                          response.data.data[i].commonDiseasesName = '否';
                        }
                      }
                      that.tableData = response.data.data;
                      that.tableData2 = [];
                    }
                  }).catch(function (error) {
                    console.log(error);
                  });
                } else {
                  that.$message({
                    message: response.data.msg,
                    type: 'error'
                  });
                }
              }).catch(error => {
                console.log(error);
              });
            }
          }).catch(function (error) {
            console.log(error);
          });
        }
        that.dialogFormVisible3 = false;
      });
    },
    // 修改诊断信息
    updateDiagnoseInfo (index, row) {
      console.log(index, row);
      let that = this;
      that.form3 = row;
      that.dialogFormVisible3 = true;
    },
    // 删除诊断信息
    deleteDiagnoseInfo (index, row) {
      this.dialogVisible = true;
      this.rowId = row.id;
    },
    // 确认删除诊断信息
    confirmDelete () {
      let that = this;
      that.dialogVisible = false;
      http.deleteDiagnoseInfo(that.rowId).then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.$message({
            message: '删除诊断信息成功！',
            type: 'success'
          });
          http.diagnoseInfoDetail(that.officeId).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              for (let i = 0; i < response.data.data.length; i++) {
                if (response.data.data[i].illness === true) {
                  response.data.data[i].illnessName = '是';
                } else if (response.data.data[i].illness === false) {
                  response.data.data[i].illnessName = '否';
                }
                if (response.data.data[i].commonDiseases === true) {
                  response.data.data[i].commonDiseasesName = '是';
                } else if (response.data.data[i].commonDiseases === false) {
                  response.data.data[i].commonDiseasesName = '否';
                }
              }
              that.tableData = response.data.data;
              that.tableData2 = [];
            }
          }).catch(function (error) {
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
    },
    // 删除建议内容
    deleteDiagnoseContent (index, row) {
      this.dialogVisible2 = true;
      console.log(index, row);
      this.rowId2 = row.id;
    },
    // 确认删除建议内容
    confirmDelete2 () {
      let that = this;
      that.dialogVisible2 = false;
      http.deleteDiagnoseContent(that.rowId2).then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.$message({
            message: '删除建议内容成功！',
            type: 'success'
          });
          http.diagnoseContentDetail(that.infoCode).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.tableData2 = response.data.data;
            }
          }).catch(function (error) {
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
    }
  },
  mounted () {
    this.getCode();
    this.getOfficeList();
    Bus.$on('diagnoseInfo', (e) => {
      for (let i = 0; i < e.length; i++) {
        if (e[i].illness === true) {
          e[i].illnessName = '是';
        } else if (e[i].illness === false) {
          e[i].illnessName = '否';
        }
        if (e[i].commonDiseases === true) {
          e[i].commonDiseasesName = '是';
        } else if (e[i].commonDiseases === false) {
          e[i].commonDiseasesName = '否';
        }
      }
      this.tableData = e;
    });
    Bus.$on('diagnoseContent', (e) => {
      this.tableData2 = e;
    });
    Bus.$on('officeId', (e) => {
      this.officeId = e;
    });
    Bus.$on("saveDisabled", (e) => {
      this.saveDisabled = e;
    });
    Bus.$on("saveDisabled", (e) => {
      this.saveDisabled2 = e;
    });
    Bus.$on("tableData2", (e) => {
      this.tableData2 = e;
    });
    Bus.$on('officeDisabled', (e) => {
      this.officeDisabled = e;
    });
  }
}
</script>

<style>
  .box1{
    width:84%;
    float:left;
    margin-left:1%;
    height:100%;
    background:#fff;
    overflow:auto;
  }
  .title{
    text-align:left;
    text-indent:20px;
  }
  .span4{
    position:absolute;
    right:2%;
    top:50%;
    transform:translateY(-50%);
  }
  .span44{
    position:absolute;
    right:10%;
    top:50%;
    transform:translateY(-50%);
  }
  .span44 .add{
    float:right;
  }
  .span4 .save{
    float:right;
  }
  .span4 .addAdvice{
    float:right;
  }
  .bottom{
    width:96%;
    height:40%;
    margin:0 auto;
  }
  .bottom .advice{
    height:100%;
    width:100%;
  }
  .el-select{
    width:100%;
  }
  /*.bottom .instructions{*/
    /*width:48%;*/
    /*height:100%;*/
    /*float:right;*/
  /*}*/
  /*.bottom .instructions .title{*/
    /*text-indent:0;*/
  /*}*/
  /*.bottom .instructions .el-card{*/
    /*width:100%;*/
    /*height:90%;*/
  /*}*/
  /*.bottom .instructions .el-card .el-card__body{*/
    /*width:90%;*/
    /*height:90%;*/
  /*}*/
  /*.bottom .instructions .message{*/
    /*width:100%;*/
    /*height:100%;*/
    /*overflow:auto;*/
    /*text-align:left;*/
    /*font-size:14px;*/
  /*}*/
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
