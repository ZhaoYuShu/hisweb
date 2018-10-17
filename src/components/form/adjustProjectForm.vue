<template>
    <div class="rightForm">
      <div class="div1">
        <el-form ref="form1" :model="form1" :rules="rules1" label-width="100px" class="demo-form1">
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="form1.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="性别" prop="sex">
                <el-select v-model="form1.sex" placeholder="请选择性别">
                  <el-option
                    v-for="item in sex"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="登记日期" prop="startDate">
                <el-date-picker
                  v-model="form1.startDate"
                  type="date"
                  placeholder="请选择登记日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="——" prop="endDate">
                <el-date-picker
                  v-model="form1.endDate"
                  type="date"
                  placeholder="请选择登记日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="索引卡号" prop="startCard">
                <el-input v-model="form1.startCard" placeholder="请输入索引卡号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="至" prop="endCard">
                <el-input v-model="form1.endCard" placeholder="请输入索引卡号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="体检编号/登记流水号" prop="examCode1">
                <el-input v-model="form1.examCode1" placeholder="请输入..."></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="——" prop="examCode2">
                <el-input v-model="form1.examCode2" placeholder="请输入..."></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="buttons">
          <el-row type="flex" style="width:100%;height:100%;align-items:center;">
            <el-col :span="24">
              <el-button type="primary" size="small">查询</el-button>
            </el-col>
            <el-col :span="24">
              <el-button type="primary" size="small">保存</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="div2">
        <el-row>
          <el-col>
            <p class="title">人员信息列表</p>
          </el-col>
        </el-row>
        <el-table
          :data="tableData1"
          border
          height="80%"
          style="width:98%;margin:0 auto;">
          <el-table-column
            label="体检编号"
            prop="examCode"
            width="150"
            align="left">
          </el-table-column>
          <el-table-column
            label="体检次数"
            prop="examTimes"
            width="120"
            align="left">
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="name"
            width="120"
            align="left">
          </el-table-column>
          <el-table-column
            label="性别"
            prop="sex"
            width="120"
            align="left">
          </el-table-column>
          <el-table-column
            label="年龄"
            prop="age"
            width="120"
            align="left">
          </el-table-column>
          <el-table-column
            label="分组名称"
            prop="groupName"
            width="200"
            align="left">
          </el-table-column>
          <el-table-column
            label="体检日期"
            prop="examDate"
            width="150"
            align="left">
          </el-table-column>
          <el-table-column
            label="身份证号"
            prop="IDCard"
            width="250"
            align="left">
          </el-table-column>
          <el-table-column
            label="索引卡号"
            prop="cardNumber"
            width="200"
            align="left">
          </el-table-column>
        </el-table>
      </div>
      <div class="div3">
        <el-row>
        <el-col>
          <p class="title">人员信息</p>
        </el-col>
      </el-row>
        <el-form ref="form2" :model="form2" :rules="rules2" label-width="100px" class="demo-form2">
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="单位" prop="company">
                <el-input v-model="form2.company" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="体检编号" prop="examCode">
                <el-input v-model="form2.examCode" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="体检次数" prop="examTimes">
                <el-input v-model="form2.examTimes" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="身份证号" prop="IDCard">
                <el-input v-model="form2.IDCard" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="form2.name" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="性别" prop="sex">
                <el-input v-model="form2.sex" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="年龄" prop="age">
                <el-input v-model="form2.age" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="出生日期" prop="birthday">
                <el-date-picker
                  v-model="form2.birthday"
                  type="date"
                  disabled>
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="索引卡号" prop="cardNumber">
                <el-input v-model="form2.cardNumber" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="登记流水号" prop="registrationNo">
                <el-input v-model="form2.registrationNo" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="是否VIP" prop="vip">
                <el-radio-group v-model="form2.vip" disabled>
                  <el-radio
                    v-for="item in vip"
                    :key="item.id"
                    :label="item.id">
                    {{item.value}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="div4">
        <el-row>
          <el-col>
            <p class="title">收费信息</p>
          </el-col>
        </el-row>
        <el-form ref="form3" :model="form3" :rules="rules3" label-width="100px" class="demo-form3">
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="分组名称" prop="groupName">
                <el-select v-model="form3.groupName" disabled>
                  <el-option
                    v-for="item in groupName"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="分组类型" prop="groupType">
                <el-select v-model="form3.groupType" disabled>
                  <el-option
                    v-for="item in groupType"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="标准价格" prop="standardPrice">
                <el-input v-model="form3.standardPrice" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="实际价格" prop="actualPrice">
                <el-input v-model="form3.actualPrice" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="固定金额" prop="fixedAmount">
                <el-input v-model="form3.fixedAmount" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="项目折扣" prop="projectDiscount">
                <el-input v-model="form3.projectDiscount" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="加项折扣" prop="addedDiscount">
                <el-input v-model="form3.addedDiscount" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="结算人数" prop="balanceNumber">
                <el-input v-model="form3.balanceNumber" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="分组支付" prop="groupPay">
                <el-radio-group v-model="form3.groupPay" disabled>
                  <el-radio
                    v-for="item in groupPay"
                    :key="item.id"
                    :label="item.id">
                    {{item.value}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="加项支付" prop="addedPay">
                <el-radio-group v-model="form3.addedPay" disabled>
                  <el-radio
                    v-for="item in addedPay"
                    :key="item.id"
                    :label="item.id">
                    {{item.value}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="div5">
        <div class="package">
          <el-row>
            <el-col>
              <p class="title">已选套餐</p>
            </el-col>
          </el-row>
          <el-input v-model="packages" style="width:98%;margin-bottom:5px;"></el-input>
          <el-table
            :data="tableData2"
            border
            height="70%"
            style="width:98%;margin:0 auto;">
            <el-table-column
              label="未选套餐"
              prop="package"
              align="left">
            </el-table-column>
          </el-table>
        </div>
        <div class="project1">
          <el-row>
            <el-col>
              <p class="title">未选项目</p>
            </el-col>
          </el-row>
          <el-table
            :data="tableData3"
            border
            height="80%"
            style="width:98%;margin:0 auto;">
            <el-table-column
              label="项目名称"
              prop="project"
              align="left">
            </el-table-column>
          </el-table>
        </div>
        <div class="project2">
          <el-row>
            <el-col>
              <p class="title">已选项目</p>
            </el-col>
          </el-row>
          <el-table
            :data="tableData4"
            border
            height="80%"
            style="width:98%;margin:0 auto;">
            <el-table-column
              label="类型"
              prop="type"
              width="60"
              align="left">
            </el-table-column>
            <el-table-column
              label="体检项目"
              prop="project"
              width="150"
              align="left">
            </el-table-column>
            <el-table-column
              label="标准单价"
              prop="standardPrice"
              width="100"
              align="left">
            </el-table-column>
            <el-table-column
              label="折扣"
              prop="discount"
              width="80"
              align="left">
            </el-table-column>
            <el-table-column
              label="实收单价"
              prop="actualPrice"
              width="100"
              align="left">
            </el-table-column>
            <el-table-column
              label="检完否"
              prop="check"
              width="100"
              align="left">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "adjustProjectForm",
  data () {
    return {
      form1: {
        name: '', // 姓名
        sex: '', // 性别
        startDate: '', // 登记日期（开始）
        endDate: '', // 登记日期（结束）
        startCard: '', // 索引卡号（开始）
        endCard: '', // 索引卡号（结束）
        examCode1: '', // 体检编号/登记流水号
        examCode2: '' // 体检编号/登记流水号
      },
      form2: {
        company: '', // 单位
        examCode: '', // 体检编号
        examTimes: '', // 体检次数
        IDCard: '', // 身份证号
        name: '', // 姓名
        sex: '', // 性别
        age: '', // 年龄
        birthday: '', // 出生日期
        cardNumber: '', // 索引卡号
        registrationNo: '', // 登记流水号
        vip: '' // 是否为vip
      },
      form3: {
        groupName: '', // 分组名称
        groupType: '', // 分组类型
        standardPrice: '', // 标准价格
        actualPrice: '', // 实际价格
        fixedAmount: '', // 固定金额
        projectDiscount: '', // 项目折扣
        addedDiscount: '', // 加项折扣
        balanceNumber: '', // 结算人数
        groupPay: '', // 分组支付
        addedPay: '' // 加项支付
      },
      rules1: {},
      rules2: {},
      rules3: {},
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      sex: [
        {id: 1, value: '男'},
        {id: 2, value: '女'},
        {id: 3, value: '所有'}
      ],
      vip: [
        {id: 0, value: '否'},
        {id: 1, value: '是'}
      ],
      groupName: [],
      groupType: [],
      groupPay: [
        {id: 0, value: '单位'},
        {id: 1, value: '个人'}
      ],
      addedPay: [
        {id: 0, value: '单位'},
        {id: 1, value: '个人'}
      ],
      packages: ''
    }
  }
}
</script>

<style scoped>
  .rightForm{
    width:82%;
    float:right;
    padding-right:1%;
    height:92%;
    overflow:auto;
  }
  .rightForm .div1{
    width:100%;
    height:30%;
    margin-bottom:1%;
  }
  .rightForm .div1 .demo-form1{
    width:65%;
    height:95%;
    overflow-y:auto;
    background:#fff;
    float:left;
    padding-top:1%;
  }
  .rightForm .div1 .buttons{
    width:34%;
    height:100%;
    background:#fff;
    float:right;
  }
  .rightForm .div2{
    width:100%;
    height:40%;
    margin-bottom:1%;
    background:#fff;
  }
  .rightForm .div3{
    width:100%;
    height:40%;
    margin-bottom:1%;
    background:#fff;
  }
  .rightForm .div3 .demo-form2{
    width:100%;
    height:80%;
    overflow-y:auto;
  }
  .rightForm .div4{
    width:100%;
    height:40%;
    background:#fff;
    margin-bottom:1%;
  }
  .rightForm .div4 .demo-form3{
    width:100%;
    height:80%;
    overflow-y:auto;
  }
  .rightForm .div5{
    width:100%;
    height:60%;
  }
  .rightForm .div5 .package{
    width:20%;
    height:100%;
    background:#fff;
    margin-right:1%;
    float:left;
  }
  .rightForm .div5 .project1{
    width:39%;
    height:100%;
    margin-right:1%;
    background:#fff;
    float:left;
  }
  .rightForm .div5 .project2{
    width:39%;
    height:100%;
    background:#fff;
    float:left;
  }
  .title{
    font-size:12px;
    font-weight:bold;
    text-align:left;
    text-indent:20px;
  }
</style>
<style>
  @import '../../styles/common.css';
</style>
