<template>
  <div class="rightForm">
    <!--对话框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定删除组合项目？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="deleteGroup" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!--表单-->
    <el-row>
      <el-col :span="24">
        <p class="title">组合项目信息</p>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around" style="margin-bottom:10px;">
      <!--<el-col :span="24">-->
      <!--<el-form-item>-->
      <el-button type="primary" @click="resetForm('ruleForm')" size="small">增加</el-button>
      <el-button type="success" @click="submitForm('ruleForm')" size="small" :disabled="saveDisabled">保存</el-button>
      <el-button type="danger" @click="dialogVisible = true" size="small" :disabled="deleteDisabled">删除</el-button>
      <el-button type="warning" @click="updateGroup('ruleForm')" size="small" :disabled="updateDisabled">修改</el-button>
      <el-button size="small" @click="reloadTree">刷新</el-button>
      <!--</el-form-item>-->
      <!--</el-col>-->
    </el-row>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :lg="24" :xl="12">
          <el-form-item label="编号" prop="code" required>
            <el-input v-model.number="ruleForm.code" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="体检科室" prop="officeId" required>
            <el-select v-model="ruleForm.officeId" @change="selectOffice" filterable :disabled="false">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :lg="24" :xl="12">
          <el-form-item label="妇科" prop="gynecology">
            <el-radio-group v-model="ruleForm.gynecology">
              <el-radio
                v-for="item in female"
                :key="item.id"
                :label="item.boolean">{{item.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="组合名称" required prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入组合名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :lg="24" :xl="12">
          <el-form-item label="显示顺序" prop="seq" required>
            <el-input v-model.number="ruleForm.seq" placeholder="请输入显示顺序"></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="拼音简码" prop="alphabeticBrevityCode" required>
            <el-input v-model="ruleForm.alphabeticBrevityCode" placeholder="请输入拼音简码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :lg="24" :xl="12">
          <el-form-item label="五笔简码" prop="fivePrintCode">
            <el-input v-model="ruleForm.fivePrintCode" placeholder="请输入五笔简码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="临床类型" prop="clinicId" placeholder="请输入临床类型">
            <el-select v-model="ruleForm.clinicId">
              <el-option
                v-for="item in type"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :lg="24" :xl="12">
          <el-form-item label="自定义码" prop="diyCode">
            <el-input v-model="ruleForm.diyCode" placeholder="请输入自定义码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="汇总项目" prop="program">
            <el-select v-model="ruleForm.program" filterable placeholder="请选择汇总项目">
              <el-option
                v-for="item in program"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :lg="24" :xl="12">
          <el-form-item label="结果获取" prop="getResult">
            <el-radio-group v-model="ruleForm.getResult">
              <el-radio
                v-for="item in result"
                :key="item.id"
                :label="item.id">{{item.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="启用" prop="activated">
            <el-radio-group v-model="ruleForm.activated">
              <el-radio
                v-for="item in start"
                :key="item.id"
                :label="item.id">{{item.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :lg="24" :xl="12">
          <el-form-item label="对应性别" prop="sex">
            <el-select v-model="ruleForm.sex" placeholder="请选择性别">
              <el-option
                v-for="item in genders"
                :key="item.id"
                :label="item.value"
                :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="标准价格" prop="price" required>
            <el-input v-model="ruleForm.price" placeholder="请输入标准价格"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24" :xl="12">
          <el-form-item label="打折" prop="discount" required>
            <el-select v-model="ruleForm.discount" filterable @change="selectDiscount">
              <el-option
                v-for="item in discountType"
                :key="item.id"
                :label="item.name"
                :value="item.disGroup">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="实际价格" prop="realPrice" required>
            <el-input v-model="ruleForm.realPrice" placeholder="请输入实际价格"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :lg="24" :xl="12">
          <el-form-item label="检查类型" prop="examType">
            <el-select v-model="ruleForm.examType" placeholder="请选择检查类型">
              <el-option
                v-for="item in examType"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="需要标本" prop="specimen">
            <el-radio-group v-model="ruleForm.specimen">
              <el-radio
                v-for="item in isSample"
                :key="item.id"
                :label="item.boolean">{{item.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :lg="24" :xl="12">
          <el-form-item label="标本类型" prop="specimenType">
            <el-select v-model="ruleForm.specimenType" filterable placeholder="请选择标本类型">
              <el-option
                v-for="item in specimenType"
                :key="item.id"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="需申请单" prop="applicationForm">
            <el-radio-group v-model="ruleForm.applicationForm">
              <el-radio
                v-for="item in applicationForm"
                :key="item.id"
                :label="item.boolean">{{item.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :lg="24" :xl="12">
          <el-form-item label="是否需要抽血" prop="blood">
            <el-radio-group v-model="ruleForm.blood">
              <el-radio
                v-for="item in blood"
                :key="item.id"
                :label="item.id">{{item.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="餐前/餐后" prop="isBeforeMeal">
            <el-radio-group v-model="ruleForm.isBeforeMeal">
              <el-radio
                v-for="item in meal"
                :key="item.id"
                :label="item.id">{{item.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :lg="24" :xl="24">
          <el-form-item label="临床意义" prop="clinicalSignificance">
            <el-input v-model="ruleForm.clinicalSignificance" placeholder="请输入临床意义"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :lg="24" :xl="24">
          <el-form-item label="打印申请" prop="printApplication">
            <el-input v-model="ruleForm.printApplication" placeholder="请输入打印申请"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :lg="24" :xl="24">
          <el-form-item label="提示信息" prop="hintMessage">
            <el-input v-model="ruleForm.hintMessage" placeholder="请输入提示信息"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :lg="24" :xl="24">
          <el-form-item label="正常小结" prop="normalNode">
            <el-input v-model="ruleForm.normalNode" placeholder="请输入正常小结"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :lg="24" :xl="12">
          <el-form-item label="是否打折" prop="allowDiscount">
            <el-radio-group v-model="ruleForm.allowDiscount">
              <el-radio
                v-for="item in isDiscount"
                :key="item.id"
                :label="item.boolean">{{item.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="对应设备" prop="mapperEquipment">
            <el-select v-model="ruleForm.mapperEquipment" filterable placeholder="请选择对应设备">
              <el-option
                v-for="item in equipment"
                :key="item.id"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :lg="24" :xl="12">
          <el-form-item label="执行科室" prop="executeOffice">
            <el-select v-model="ruleForm.executeOffice" filterable placeholder="请选择执行科室">
              <el-option
                v-for="item in options2"
                :key="item.id"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="平均检查时间" prop="avgExamTime">
            <el-input v-model="ruleForm.avgExamTime" placeholder="请输入平均检查时间(分)"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :lg="24" :xl="12">
          <el-form-item label="HIS是否对照" prop="hisContrast">
            <el-radio-group v-model="ruleForm.hisContrast">
              <el-radio
                v-for="item in isHis"
                :key="item.id"
                :label="item.boolean">{{item.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="HisWay" prop="hisContrastType">
            <el-input v-model="ruleForm.hisContrastType" placeholder="请输入His对照方式"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :lg="4" :xl="4">
          <el-form-item label="PACS接口截图点："></el-form-item>
        </el-col>
        <el-col :lg="8" :xl="8">
          <el-form-item label="X1" prop="pacsApiX1">
            <el-input v-model="ruleForm.pacsApiX1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :xl="8">
          <el-form-item label="Y1" prop="pacsApiY1">
            <el-input v-model="ruleForm.pacsApiY1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :xl="8">
          <el-form-item label="X2" prop="pacsApiX2">
            <el-input v-model="ruleForm.pacsApiX2"></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :xl="8">
          <el-form-item label="Y2" prop="pacsApiY2">
            <el-input v-model="ruleForm.pacsApiY2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :lg="4" :xl="4">
          <el-form-item label="PACS图文报告大小:"></el-form-item>
        </el-col>
        <el-col :lg="8" :xl="8">
          <el-form-item label="宽" prop="pacsReportW">
            <el-input v-model="ruleForm.pacsReportW"></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :xl="8">
          <el-form-item label="高" prop="pacsReportH">
            <el-input v-model="ruleForm.pacsReportH"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :lg="24" :xl="24">
          <el-form-item label="图文报告" prop="report">
            <el-radio-group v-model="ruleForm.report">
              <el-radio
                v-for="item in report"
                :key="item.id"
                :label="item.boolean">{{item.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item></el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item></el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import http from '@/api/index.js'
import Bus from '@/utils/bus.js'
export default {
  name: "groupForm",
  data () {
    return {
      ruleForm: {
        id: '',
        code: '', // 编号
        officeId: '', // 体检科室
        gynecology: '', // 妇科
        name: '', // 组合名称
        seq: '', // 显示顺序
        alphabeticBrevityCode: '', // 拼音简码
        fivePrintCode: '', // 五笔简码
        clinicId: '', // 临床类型
        diyCode: '', // 自定义码
        program: '', // 汇总项目
        getResult: '', // 结果获取
        activated: 1, // 启用
        sex: '', // 对应性别
        price: '', // 标准价格
        discount: '', // 打折
        realPrice: '', // 实际价格
        examType: '', // 检查类型
        specimen: '', // 需要标本
        specimenType: '', // 标本类型
        applicationForm: '', // 需申请单
        blood: '', // 是否需要抽血
        isBeforeMeal: '', // 餐前/餐后
        clinicalSignificance: '', // 临床意义
        printApplication: '', // 打印申请
        hintMessage: '', // 提示信息
        normalNode: '', // 正常小结
        allowDiscount: '', // 是否允许折扣
        mapperEquipment: '', // 对应设备
        executeOffice: '', // 执行科室
        avgExamTime: '', // 平均检查时间
        hisContrast: '', // His是否对照
        hisContrastType: '', // His对照方式
        pacsApiX1: '', // PACS接口截图点：X1
        pacsApiY1: '', // Y1
        pacsApiX2: '', // X2
        pacsApiY2: '', // Y2
        pacsReportW: '', // PACS图文报告大小:宽
        pacsReportH: '', // 高
        report: '', // 图文报告
        examItemList: []// 选中的项目
      },
      modifier: '',
      date: '',
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        pid: [
          {required: true, message: '请选择体检科室', trigger: 'change'}
        ],
        seq: [
          {required: true, message: '请输入显示顺序', trigger: 'blur'},
          {type: 'number', message: '显示顺序必须为数字', trigger: 'blur'}
        ],
        price: [
          {required: true, message: '请输入标准价格', trigger: 'blur'}
        ],
        discount: [
          {required: true, message: '请输入折扣', trigger: 'blur'}
        ],
        realPrice: [
          {required: true, message: '请输入实际价格', trigger: 'blur'}
        ],
        alphabeticBrevityCode: [
          {required: true, message: '请输入拼音简码', trigger: 'blur'}
        ],
        examType: [
          {required: true, message: '请选择检查类型', trigger: 'change'}
        ],
        specimen: [
          {required: true, message: '请选择是否需要标本', trigger: 'change'}
        ],
        specimenType: [
          {required: true, message: '请选择标本类型', trigger: 'change'}
        ],
        applicationForm: [
          {required: true, message: '请选择是否需要申请单', trigger: 'change'}
        ]
      },
      options: [],
      options2: [],
      genders: [
        {value: '男', id: 1},
        {value: '女', id: 2},
        {value: '所有', id: 0}
      ],
      currentId: '',
      dialogVisible: false,
      female: [
        {id: 1, value: '是', boolean: true},
        {id: 0, value: '否', boolean: false}
      ],
      result: [
        {id: 1, value: '手工'},
        {id: 0, value: '导入'}
      ],
      start: [
        {id: 1, value: '是'},
        {id: 0, value: '否'}
      ],
      isSample: [
        {id: 1, value: '是', boolean: true},
        {id: 0, value: '否', boolean: false}
      ],
      applicationForm: [
        {id: 1, value: '是', boolean: true},
        {id: 0, value: '否', boolean: false}
      ],
      blood: [
        {id: 1, value: '是'},
        {id: 0, value: '否'}
      ],
      meal: [
        {id: 1, value: '餐前'},
        {id: 0, value: '餐后'}
      ],
      isDiscount: [
        {id: 1, value: '是', boolean: true},
        {id: 0, value: '否', boolean: false}
      ],
      isHis: [
        {id: 1, value: '是', boolean: true},
        {id: 0, value: '否', boolean: false}
      ],
      report: [
        {id: 1, value: '是', boolean: true},
        {id: 0, value: '否', boolean: false}
      ],
      type: [],
      examType: [
        {id: 1, value: '抽血及其他检验'},
        {id: 2, value: '医生检查'},
        {id: 3, value: '功能检查'}
      ],
      program: [],
      specimenType: [],
      equipment: [],
      saveDisabled: false,
      deleteDisabled: true,
      updateDisabled: true,
      discountType: []
    };
  },
  methods: {
    // 增加组合项目
    submitForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(that.ruleForm);
          http.addGroup(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '添加组合项目成功！',
                type: 'success'
              });
              that.resetForm('ruleForm');
              http.groupTree().then(function (response) {
                console.log(response);
                Bus.$emit("addGroupTree", response.data.data);
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
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields();
      this.getCode();
      Bus.$emit("resetTable", []);
      this.saveDisabled = false;
      this.deleteDisabled = true;
      this.updateDisabled = true;
      this.ruleForm.id = '';
      Bus.$emit("sum", 0);
    },
    // 选择科室
    selectOffice (value) {
      console.log(value);
      Bus.$emit("officeId", value);
      http.officeExamItem(value).then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          Bus.$emit("examItemResultDtos", response.data.data.examItemResultDtos);
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    // 获取编号
    getCode () {
      let that = this;
      http.groupCode().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.ruleForm.code = response.data.data;
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    // 获取所有的组合项目的折扣模式
    getAllDiscount () {
      let that = this;
      http.discountType(1).then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          let arr = [];
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].pid !== 0) {
              arr.push(response.data.data[i]);
            }
          }
          arr.unshift({id: 0, name: '无', disGroup: 100});
          that.discountType = arr;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 选择打折
    selectDiscount (data) {
      console.log(data);
      this.ruleForm.discount = data;
      this.ruleForm.realPrice = this.ruleForm.price * this.ruleForm.discount / 100;
    },
    // 获取所有的体检科室
    getAllOffice () {
      let that = this;
      http.officeList().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          console.log(that.options);
          let arr = [];
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].pid !== 0) {
              arr.push(response.data.data[i]);
            }
          }
          that.options = arr;
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    // 获取所有的执行科室
    getAllOffice2 () {
      let that = this;
      http.officeList().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          console.log(that.options);
          let arr = [];
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].pid !== 0) {
              arr.push(response.data.data[i]);
            }
          }
          that.options2 = that.changeNumber(arr);
          // that.changeNumber(that.options2);
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    // 获取所有汇总项目
    getAllCollect () {
      let that = this;
      http.getAllCollect().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          let arr = [];
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].pid !== 0) {
              arr.push(response.data.data[i]);
            }
          }
          that.program = arr;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 获取所有标本类型
    getAllSample () {
      let that = this;
      http.sampleList().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          let arr = [];
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].pid !== 0) {
              response.data.data[i].code = parseInt(response.data.data[i].code);
              arr.push(response.data.data[i]);
            }
          }
          arr.unshift({name: '无', code: 0});
          that.specimenType = that.changeNumber(arr);
          // that.changeNumber(that.specimenType);
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 获取临床类型
    getAllClinic () {
      let that = this;
      http.allClinic().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          let arr = [];
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].pid !== 0) {
              arr.push(response.data.data[i]);
            }
          }
          that.type = arr;
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    // 获取所有设备
    getAllEquipment () {
      let that = this;
      http.getAllEquipment().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          let arr = [];
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].pid !== 0) {
              arr.push(response.data.data[i]);
            }
          }
          arr.unshift({name: '无', code: 0});
          that.equipment = that.changeNumber(arr);
          // that.changeNumber(that.equipment);
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 将数据中code转换成number类型
    changeNumber (arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].code = parseInt(arr[i].code);
      }
      console.log(arr);
      return arr;
    },
    // 删除组合项目
    deleteGroup () {
      let that = this;
      if (that.currentId < 10000) {
        that.$message({
          message: '此项不能删除！',
          type: 'error'
        });
        that.dialogVisible = false;
        return
      }
      that.dialogVisible = false;
      http.deleteGroup(that.currentId).then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          that.$message({
            message: '删除组合项目成功！',
            type: 'success'
          });
          that.resetForm('ruleForm');
          http.groupTree().then(function (response) {
            console.log(response);
            Bus.$emit("deleteGroupTree", response.data.data);
          }).catch(function (error) {
            console.log(error);
          });
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    // 选择打折种类
    chooseDiscount () {
      let that = this;
      http.discountType().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {

        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 修改组合项目
    updateGroup (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          http.updateGroup(that.ruleForm).then(function (response) {
            console.log(response);
            if (response.status === 200 && response.data.result === '00000000') {
              that.$message({
                message: '修改组合项目成功！',
                type: 'success'
              });
              http.groupTree().then(function (response) {
                console.log(response);
                Bus.$emit("updateGroupTree", response.data.data);
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
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 刷新树结构
    reloadTree () {
      let that = this;
      Bus.$emit("loading1", true);
      http.groupTree().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          Bus.$emit("loading2", false);
          Bus.$emit("reloadGroupTree", response.data.data);
        }
      }).catch(function (error) {
        console.log(error);
      })
    }
  },
  created () {
    this.getCode();
    this.getAllOffice();
    this.getAllOffice2();
    this.getAllClinic();
    this.getAllCollect();
    this.getAllSample();
    this.getAllEquipment();
    this.getAllDiscount();
    Bus.$on("currentId", (e) => {
      this.currentId = e;
    });
    Bus.$on("groupDetail", (e) => {
      this.ruleForm = e;
      this.ruleForm.specimenType = parseInt(e.specimenType);
      this.ruleForm.executeOffice = parseInt(e.executeOffice);
      this.ruleForm.mapperEquipment = parseInt(e.mapperEquipment);
    });
    Bus.$on("examItemList2", (e) => {
      this.ruleForm.examItemList = e;
    });
    Bus.$on("examItemList3", (e) => {
      this.ruleForm.examItemList = e;
    });
    Bus.$on("saveDisabledGroup", (e) => {
      this.saveDisabled = e;
    });
    Bus.$on("deleteDisabledGroup", (e) => {
      this.deleteDisabled = e;
    });
    Bus.$on("updateDisabledGroup", (e) => {
      this.updateDisabled = e;
    });
  }
}
</script>

<style scoped>
  .rightForm{
    float:left;
    width:48%;
    height:100%;
    background:#fff;
    margin-left:1%;
    /*padding-right:1%;*/
    overflow:hidden;
  }
  .rightForm .demo-ruleForm{
    width:100%;
    height:88%;
    padding-right:1%;
    overflow:hidden;
    overflow-y:auto;
  }
  .el-radio-group{
    width:100%;
  }
  .el-select{
    width:100%;
  }
  .title{
    text-align:left;
    text-indent:20px;
    font-size:12px;
    font-weight:bold;
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
