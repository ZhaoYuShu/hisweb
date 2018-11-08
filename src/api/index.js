import axios from 'axios'
import http from '@/utils/request.js'
let web = 'http://192.168.0.114:8081';
// let web = 'http://a7958454.ngrok.io';
let token = localStorage.getItem('token');
let header = {'Authorization': token};
// 登录
let login = (data) => axios.post(web + '/api/login', data);

/* 科室设置模块 */

// 获取科室树结构
let officeTree = (data) => http.get(web + '/api/office/tree', {params: data});

// 获取全部科室列表
let officeList = (data) => http.get(web + '/api/office/all', {params: data});

// 获取所有科室类型
let officeType = (data) => http.get(web + '/api/officeType/all', {params: data});

// 获取下一个科室编号
let officeCode = (data) => http.get(web + '/api/office/code', {params: data});

// 新增科室信息
let addOffice = (data) => http.post(web + '/api/office', data);

// 删除科室信息
let deleteOffice = (data) => http.delete(web + '/api/office/' + data);

// 获取科室详细信息
let officeDetail = (data) => http.get(web + '/api/office/' + data);

// 修改科室信息
let updateOffice = (data) => http.put(web + '/api/office', data);

/* 标本设置模块 */

// 新增标本类别信息
let addSample = (data) => http.post(web + '/api/sampleType', data);

// 获取标本类型的编号
let sampleCode = (data) => http.get(web + '/api/sampleType/code', {params: data});

// 获取标本树
let sampleTree = (data) => http.get(web + '/api/sampleType/tree', {params: data});

// 获取所有的标本类型
let sampleList = (data) => http.get(web + '/api/sampleType/all', {params: data});

// 删除标本类别
let deleteSample = (data) => http.delete(web + '/api/sampleType/' + data);

// 获取标本类别的详细信息
let sampleDetail = (data) => http.get(web + '/api/sampleType/' + data);

// 修改标本类型信息
let updateSample = (data) => http.put(web + '/api/sampleType', data);

/* 体检项目设置模块 */

// 获取项目树
let examItemTree = (data) => http.get(web + '/api/examItem/tree', {params: data});

// 获取所有的体检项目
let getAllExam = (data) => http.get(web + '/api/examItem/all', {params: data});

// 获取体检项目的编号
let examItemCode = (data) => http.get(web + '/api/examItem/code', {params: data});

// 增加体检项目
let addExamItem = (data) => http.post(web + '/api/examItem', data);

// 根据id获取体检项目的详细信息
let examItemDetail = (data) => http.get(web + '/api/examItem/' + data);

// 根据科室ID查询出科室下所有体检项目
let officeExamItem = (data) => http.get(web + '/api/examItem/office/' + data);

// 删除体检项目
let deleteExamItem = (data) => http.delete(web + '/api/examItem/' + data);

// 修改体检项目
let updateExamItem = (data) => http.put(web + '/api/examItem', data);

/* 体检组合项目管理 */

// 获取基于科室树的体检组合项目
let groupTree = (data) => http.get(web + '/api/examGroupItem/tree', {params: data});

// 获取所有体检组合项目
let allGroup = (data) => http.get(web + '/api/examGroupItem/all', {params: data});

//根据体检组合项目code获取试管类型
let  tubeType = (data) => http.get(web + '/api/examGroupItem/applyType/' + data);

// 获取体检组合项目编号
let groupCode = (data) => http.get(web + '/api/examGroupItem/code', {params: data});

// 新增体检组合项目
let addGroup = (data) => http.post(web + '/api/examGroupItem', data);

// 修改体检组合项目
let updateGroup = (data) => http.put(web + '/api/examGroupItem', data);

// 删除体检组合项目
let deleteGroup = (data) => http.delete(web + '/api/examGroupItem/' + data);

// 根据code获取体检项目的详细信息
let groupDetail = (data) => http.get(web + '/api/examGroupItem/' + data);

/* 体检套餐 */

// 获取体检套餐编号
let packageCode = (data) => http.get(web + '/api/examPackage/code', {params: data});

// 获取体检套餐树结构
let packageTree = (data) => http.get(web + '/api/examPackage/tree', {params: data});

// 新增体检套餐
let addPackage = (data) => http.post(web + '/api/examPackage', data);

// 删除体检套餐
let deletePackage = (data) => http.delete(web + '/api/examPackage/' + data);

// 根据Code获取体检套餐
let packageDetail = (data) => http.get(web + '/api/examPackage/' + data);

// 修改体检套餐
let updatePackage = (data) => http.put(web + '/api/examPackage', data);

// 获取所有套餐信息
let getAllPackage = (data) => http.get(web + '/api/examPackage/all', {params: data});

// 根据套餐ID获取标签个数
let getLabelNum = (data) => http.get(web + '/api/examPackage/applyPage/' + data);

/* 医技设备维护 */

// 获取设备的编号
let equipmentCode = (data) => http.get(web + '/api/medicalTechnology/code', {params: data});

// 获取设备树结构
let equipmentTree = (data) => http.get(web + '/api/medicalTechnology/tree', {params: data});

// 获取所有医技设备
let getAllEquipment = (data) => http.get(web + '/api/medicalTechnology/all', {params: data});

// 新增医技设备信息
let addEquipment = (data) => http.post(web + '/api/medicalTechnology', data);

// 获取设备详细信息
let equipmentDetail = (data) => http.get(web + '/api/medicalTechnology/' + data);

// 删除设备信息
let deleteEquipment = (data) => http.delete(web + '/api/medicalTechnology/' + data);

// 修改设备信息
let updateEquipment = (data) => http.put(web + '/api/medicalTechnology', data);

/* 申请单 */

// 获取编号
let applicationCode = (data) => http.get(web + '/api/applyPageType/code', {params: data});

// 获取申请单树结构
let applicationTree = (data) => http.get(web + '/api/applyPageType/tree', {params: data});

// 新增申请单类型
let addApplication = (data) => http.post(web + '/api/applyPageType', data);

// 获取申请单详细信息
let applicationDetail = (data) => http.get(web + '/api/applyPageType/' + data);

// 删除申请单类型
let deleteApplication = (data) => http.delete(web + '/api/applyPageType/' + data);

// 修改申请单类型
let updateApplication = (data) => http.put(web + '/api/applyPageType', data);

/* 临床类型 */

// 获取临床类型树结构
let clinicTree = (data) => http.get(web + '/api/clinic/tree', {params: data});

// 获取临床类型编号
let clinicCode = (data) => http.get(web + '/api/clinic/code', {params: data});

// 获取所有临床类型
let allClinic = (data) => http.get(web + '/api/clinic/all', {params: data});

// 新增临床类型
let addClinic = (data) => http.post(web + '/api/clinic', data);

// 修改临床类型
let updateClinic = (data) => http.put(web + '/api/clinic', data);

// 删除临床类型
let deleteClinic = (data) => http.delete(web + '/api/clinic/' + data);

// 根据ID查询临床类型
let clinicDetail = (data) => http.get(web + '/api/clinic/' + data);

/* 诊断信息 */

// 获取编号
let diagnoseCode = (data) => http.get(web + '/api/diagnoseInfo/code', {params: data});

// 获取所有诊断信息
let allDiagnoseInfo = (data) => http.get(web + '/api/diagnoseInfo/all', {params: data});

// 根据科室ID获取诊断信息
let diagnoseInfoDetail = (data) => http.get(web + '/api/diagnoseInfo/office/' + data);

// 新增诊断信息
let addDiagnoseInfo = (data) => http.post(web + '/api/diagnoseInfo', data);

// 删除诊断信息
let deleteDiagnoseInfo = (data) => http.delete(web + '/api/diagnoseInfo/' + data);

// 修改诊断信息
let updateDiagnoseInfo = (data) => http.put(web + '/api/diagnoseInfo', data);

/* 建议内容 */

// 根据诊断code获取建议内容
let diagnoseContentDetail = (data) => http.get(web + '/api/diagnoseContent/diagnose/' + data);

// 删除建议内容
let deleteDiagnoseContent = (data) => http.delete(web + '/api/diagnoseContent/' + data);

// 新增建议内容
let addDiagnoseContent = (data) => http.post(web + '/api/diagnoseContent', data);

/* 体检单位管理 */

// 获取全部体检单位列表
let getAllCompany = (data) => http.get(web + '/api/company/all', {params: data});

// 获取编号
let companyCode = (data) => http.get(web + '/api/company/code', {params: data});

// 根据ID获取体检单位详细信息
let companyDetail = (data) => http.get(web + '/api/company/' + data);

// 获取体检单位树结构
let companyTree = (data) => http.get(web + '/api/company/tree', {params: data});

// 新增体检单位
let addCompany = (data) => http.post(web + '/api/company', data);

// 删除体检单位
let deleteCompany = (data) => http.delete(web + '/api/company/' + data);

// 修改体检单位
let updateCompany = (data) => http.put(web + '/api/company', data);

// 根据体检单位ID获取单位详细信息
let companyDetail2 = (data) => http.get(web + '/api/company/getCompany/' + data);

/* 体检单位预约登记记录模块 */

// 新增体检单位登记记录
let addCompanyExamRecord = (data) => http.post(web + '/api/companyExamRecord', data);

// 修改单位预约登记记录
let updateCompanyExamRecord = (data) => http.put(web + '/api/companyExamRecord', data);

// 删除单位预约登记记录
let deleteCompanyExamRecord = (data) => http.delete(web + '/api/companyExamRecord/' + data);

// 根据体检单位code获取体检预约历史
let companyExamRecordList = (data) => http.get(web + '/api/companyExamRecord/records/' + data);

// 获取单位体检次数
let companyExamRecordTimes = (data) => http.get(web + '/api/companyExamRecord/times?companyCode=' + data);

// 根据ID获取详细信息
let companyExamRecordDetail = (data) => http.get(web + '/api/companyExamRecord/' + data);

/* 体检单位分组 */

// 获取体检单位分组的编号
let companyGroupCode = (data) => http.get(web + '/api/companyGroup/code', {params: data});

// 新增体检单位分组
let addCompanyGroup = (data) => http.post(web + '/api/companyGroup', data);

// 修改单位体检分组
let updateCompanyGroup = (data) => http.put(web + '/api/companyGroup', data);

// 获取体检单位分组树结构
let companyGroupTree = (data) => http.get(web + '/api/companyGroup/tree', {params: data});

// 删除体检单位分组
let deleteCompanyGroup = (data) => http.delete(web + '/api/companyGroup/' + data);

// 根据code获取体检分组的详细信息
let companyGroupDetail = (data) => http.get(web + '/api/companyGroup/' + data);

// 根据公司code获取公司下的分组信息
let getAllCompanyGroup = (data) => http.get(web + '/api/companyGroup/groups/' + data);

/* 体检结论类别管理 */

// 获取全部体检结论类别
let allExamResultType = (data) => http.get(web + '/api/examResultType/all', {params: data});

// 获取编号
let examResultTypeCode = (data) => http.get(web + '/api/examResultType/code', {params: data});

// 获取体检结论类别树结构
let examResultTypeTree = (data) => http.get(web + '/api/examResultType/tree', {params: data});

/* 单位体检预定登记 */

// 预约新增（单个员工）
let addRegistration = (data) => http.post(web + '/api/registration', data);

// 修改单个预约信息
let updateRegistration = (data) => http.put(web + '/api/registration', data);

// 获取预约编号
let registrationCode = (data) => http.get(web + '/api/registration/code', {params: data});

// 单位体检批量正式登记，根据预约编号
let officialRegistration = (data) => http.get(web + '/api/registration/batch/' + data);

// 根据体检单位分组获取标签个数
let getLabelNumber = (data) => http.get(web + '/api/registration/lableNum/' + data);

// 根据分组code获取分组下所有员工
let getAllStaff = (data) => http.get(web + '/api/registration/regRecords/' + data);

// 根据身份证号获取预约人的基本信息
let getPersonInfo = (code, phone) => http.post(web + '/api/registration/personnel?code=' + code + '&phone=' + phone);

// 删除预约信息（只删除登记信息，不删除人员信息）
let deleteRegistration = (data) => http.delete(web + '/api/registration/' + data);

// 根据预约编号获取详情
let registrationDetail = (data) => http.get(web + '/api/registration/registrationNo/' + data);

// 综合查询体检单位下所有登记人员（已正式登记、未正式登记）
let getAllStaffs = (data) => http.post(web + '/api/registration/users', data);

/* 人员信息管理 */

// 获取体检编号
let getExamCode = (data) => http.get(web + '/api/customer/code', {params: data});

/* 人员类别管理 */

// 新增人员类别
let addCustomerType = (data) => http.post(web + '/api/customerType', data);

// 修改人员类别
let updateCustomerType = (data) => http.put(web + '/api/customerType', data);

// 获取所有人员类别
let getAllCustomerType = (data) => http.get(web + '/api/customerType/all', {params: data});

// 获取人员类别编号
let customerTypeCode = (data) => http.get(web + '/api/customerType/code', {params: data});

// 删除人员类别
let deleteCustomerType = (data) => http.delete(web + '/api/customerType/' + data);

// 根据ID获取人员类别详情
let customerTypeDetail = (data) => http.get(web + '/api/customerType/' + data);

// 人员类别树结构
let customerTypeTree = (data) => http.get(web + '/api/customerType/tree', {params: data});

/* 体检类别 */

// 新增体检类别
let addExamType = (data) => http.post(web + '/api/examType', data);

// 修改体检类别
let updateExamType = (data) => http.put(web + '/api/examType', data);

// 获取所有体检类别列表
let getAllExamType = (data) => http.get(web + '/api/examType/all', {params: data});

// 获取体检类型编号
let examTypeCode = (data) => http.get(web + '/api/examType/code', {params: data});

// 体检类别树
let examTypeTree = (data) => http.get(web + '/api/examType/tree', {params: data});

// 删除体检类别
let deleteExamType = (data) => http.delete(web + '/api/examType/' + data);

// 根据ID获取体检类别详情
let examTypeDetail = (data) => http.get(web + '/api/examType/' + data);

/* 疾病分类 */

// 获取全部疾病分类列表
let getAllIllType = (data) => http.get(web + '/api/illType/all', {params: data});

// 获取编号
let illTypeCode = (data) => http.get(web + '/api/illType/code', {params: data});

// 疾病分类树
let illTypeTree = (data) => http.get(web + '/api/illType/tree', {params: data});

// 删除疾病分类
let deleteIllType = (data) => http.delete(web + '/api/illType/' + data);

// 新增疾病分类
let addIllType = (data) => http.post(web + '/api/illType', data);

// 修改疾病分类
let updateIllType = (data) => http.put(web + '/api/illType', data);

// 根据ID获取疾病详细信息

/* 折扣模块 */

// 新增折扣种类
let addDiscount = (data) => http.post(web + '/api/discount', data);

// 修改折扣种类
let updateDiscount = (data) => http.put(web + '/api/discount', data);

// 折扣类型树结构
let discountTree = (data) => http.get(web + '/api/discount/tree', {params: data});

// 根据Id查询折扣信息
let discountDetail = (data) => http.get(web + '/api/discount/' + data);

// 删除折扣种类
let deleteDiscount = (data) => http.delete(web + '/api/discount/' + data);

// 获取所有折扣种类
let getAllDiscount = (data) => http.get(web + '/api/discount/all', {params: data});

// 获取不同折扣类型的折扣信息
let discountType = (data) => http.get(web + '/api/discount/types/' + data);

/* 发票信息管理 */

// 新增发票信息管理
let addInvoice = (data) => http.post(web + '/api/Invoice', data);

// 修改发票信息管理
let updateInvoice = (data) => http.put(web + '/api/Invoice', data);

// 获取所有收费项目
let getAllInvoice = (data) => http.get(web + '/api/Invoice/all', {params: data});

// 获取发票编号
let invoiceCode = (data) => http.get(web + '/api/Invoice/code', {params: data});

// 获取树结构
let invoiceTree = (data) => http.get(web + '/api/Invoice/tree', {params: data});

// 删除发票信息管理
let deleteInvoice = (data) => http.delete(web + '/api/Invoice/' + data);

// 根据ID获取收费项目详情
let invoiceDetail = (data) => http.get(web + '/api/Invoice/' + data);

/* 其他（相关）收费信息 */

// 新增其他收费信息
let addOtherCharge = (data) => http.post(web + '/api/otherCharge', data);

// 修改其他收费信息
let updateOtherCharge = (data) => http.put(web + '/api/otherCharge', data);

// 获取所有其他收费信息
let getAllOtherCharge = (data) => http.get(web + '/api/otherCharge/all', {params: data});

// 获取编号
let otherChargeCode = (data) => http.get(web + '/api/otherCharge/code', {params: data});

// 删除其他收费信息
let deleteOtherCharge = (data) => http.delete(web + '/api/otherCharge/' + data);

// 根据ID获取其他收费信息详情
let otherChargeDetail = (data) => http.get(web + '/api/otherCharge/' + data);

// 树结构
let otherChargeTree = (data) => http.get(web + '/api/otherCharge/tree', {params: data});

/* 汇总项目管理 */

// 新增汇总项目管理
let addCollect = (data) => http.post(web + '/api/collect', data);

// 修改汇总项目管理
let updateCollect = (data) => http.put(web + '/api/collect', data);

// 获取所有汇总项目信息
let getAllCollect = (data) => http.get(web + '/api/collect/all', {params: data});

// 获取编号
let collectCode = (data) => http.get(web + '/api/collect/code', {params: data});

// 获取树结构
let collectTree = (data) => http.get(web + '/api/collect/tree', {params: data});

// 删除汇总项目
let deleteCollect = (data) => http.delete(web + '/api/collect/' + data);

// 根据ID获取汇总项目详细信息
let collectDetail = (data) => http.get(web + '/api/collect/' + data);

/* 个人登记 */

// 个人登记
let addExamRecord = (data) => http.post(web + '/api/examRecord', data);

// 根据身份证号获取信息
let getInfo = (data) => http.get(web + '/api/examRecord/customer/' + data);

// 获取体检记录信息
let getExamRecord = (data) => http.post(web + '/api/examRecord/all', data);

/* 收据单 */

// 根据流水号查询交费的明细信息
let receiptInfoDetail = (data) => http.get(web + '/api/receiptInfo/card/' + data);

// 查找交费名单
let receiptInfoList = (data) => http.post(web + '/api/receiptInfo/list/', data);

// 根据体检单位code,体检单位分组获取单位收费单信息（未结算）
let receiptInfo = (companyCode, groupCode) => http.get(web + '/api/receiptInfo/' + companyCode + '/' + groupCode);

// 打印收费单
let printSheet = (companyCode, groupCode, data) => http.get(web + '/api/receiptInfo/print/' + companyCode + '/' + groupCode + "?regNo=" + data);

/* 收费单信息模块 */

// 根据流水号获取收费项目
let chargeInfo = (data) => http.get(web + '/api/chargeInfo/card/' + data);

/* 收费类别 */

// 新增收费类别
let addChargeType = (data) => http.post(web + '/api/chargeType', data);

// 修改收费类别
let updateChargeType = (data) => http.put(web + '/api/chargeType', data);

// 获取所有收费类别
let getAllChargeType = (data) => http.get(web + '/api/chargeType/all', {params: data});

// 获取收费类别编号
let chargeTypeCode = (data) => http.get(web + '/api/chargeType/code', {params: data});

// 获取收费类别树结构
let chargeTypeTree = (data) => http.get(web + '/api/chargeType/tree', {params: data});

// 删除收费类别
let deleteChargeType = (data) => http.delete(web + '/api/chargeType/' + data);

// 根据ID查询收费类别详情
let chargeTypeDetail = (data) => http.get(web + '/api/chargeType/' + data);

/* 常见结果 */

// 新增体检项目常见结果
let addCommonResults = (data) => http.post(web + '/api/commonResults', data);

// 根据常见结果code删除常见结果
let deleteCommonResults = (data) => http.delete(web + '/api/commonResults/' + data);

// 根据体检项目id查询常见结果数据
let commonResultsDetail = (data) => http.get(web + '/api/commonResults/' + data);

/* 菜单管理 */

// 新增菜单
let addMenu = (data) => http.post(web + '/api/menu', data);

// 获取树结构菜单列表
let menuTree = (data) => http.get(web + '/api/menu/tree', {params: data});

// 根据ID获取详情
let menuDetail = (data) => http.get(web + '/api/menu/' + data);

// 删除菜单
let deleteMenu = (data) => http.delete(web + '/api/menu/' + data);

// 修改菜单
let updateMenu = (data) => http.put(web + '/api/menu', data);

/* 角色管理 */

// 新增角色
let addRole = (data) => http.post(web + '/api/role', data);

// 修改角色
let updateRole = (data) => http.put(web + '/api/role', data);

// 获取所有角色
let getAllRole = (data) => http.get(web + '/api/role/all', {params: data});

// 角色列表
let roleList = (data) => http.get(web + '/api/role/pageList', {params: data});

// 删除角色
let deleteRole = (data) => http.delete(web + '/api/role/' + data);

// 根据roleCode获取详情
let roleDetail = (data) => http.get(web + '/api/role/' + data);

/* 用户管理 */

// 新增用户
let addUser = (data) => http.post(web + '/api/user', data);

// 管理员修改密码
let adminPassword = (data) => http.post(web + '/api/user/admin/password', data);

// 获取当前用户登录信息
let currentUser = (data) => http.get(web + '/api/user/currentUser', {params: data});

// 用户详细信息
let userInfo = (data) => http.post(web + '/api/user/info', data);

// 验证手机号
let validationMobile = (data) => http.post(web + '/api/user/mobile', data);

// 用户列表
let userList = (data) => http.get(web + '/api/user/pageList', {params: data});

// 用户修改密码
let userPassword = (data) => http.post(web + '/api/user/password', data);

// 删除用户
let deleteUser = (data) => http.delete(web + '/api/user/' + data);

// 获取用户详细信息
let detailInfo = (data) => http.get(web + '/api/user/' + data);

/* 用户授权 */

// 授权用户
let authorization = (data) => http.post(web + '/api/userToRole/auth', data);

// 获取用户的授权信息
let getAuth = (data) => http.get(web + '/api/userToRole/roles/' + data);

/* 报表打印 */

// 根据体检编号，体检次数打印指引单
// let printInstructionSheet = (examCode, examTimes) => axios.get(web + '/api/reports/zy_report_A4?format=pdf&examCode=' + examCode + '&examTimes=' + examTimes, {headers: header});
// 根据登记流水号批量打印指引单
let printSheetBatch = (data) => http.post(web + '/api/reports/pdf', data);

/* 体检医生诊断 */

// 根据体检编号获取体检人的基本信息以及体检组合项目，体检明细项目（非检验项目）
let examRecordUser1 = (data) => http.get(web + '/api/examResult/user/' + data + '/1');

// 根据体检编号获取体检人的基本信息以及体检组合项目，体检明细项目（检验项目）
let examRecordUser2 = (data) => http.get(web + '/api/examResult/user2/' + data + '/1');

// 根据体检组合项目编号获取体检项目及诊断结果
let examResult = (resultId, examGroupItemCode) => http.get(web + '/api/examResult/result/' + resultId + '/' + examGroupItemCode);

// 保存体检结果
let saveExamResult = (data) => http.post(web + '/api/examResult', data);

// 保存单条结果
let saveExamResultItem = (data) => http.post(web + '/api/examResult/examGroupItem', data);

/* 总检诊台 */

// 根据体检编号获取总检信息
let checkoutInfo = (data) => http.get(web + '/api/examRecord/' + data);

export default {
  login,
  officeTree,
  officeList,
  officeType,
  officeCode,
  addOffice,
  officeDetail,
  deleteOffice,
  updateOffice,
  addSample,
  sampleCode,
  sampleTree,
  sampleList,
  deleteSample,
  sampleDetail,
  updateSample,
  examItemTree,
  getAllExam,
  examItemCode,
  addExamItem,
  examItemDetail,
  officeExamItem,
  deleteExamItem,
  updateExamItem,
  groupTree,
  addGroup,
  allGroup,
  tubeType,
  groupCode,
  updateGroup,
  deleteGroup,
  groupDetail,
  packageCode,
  packageTree,
  addPackage,
  deletePackage,
  getAllPackage,
  packageDetail,
  updatePackage,
  getLabelNum,
  equipmentCode,
  equipmentTree,
  getAllEquipment,
  addEquipment,
  equipmentDetail,
  deleteEquipment,
  updateEquipment,
  applicationCode,
  applicationTree,
  addApplication,
  applicationDetail,
  deleteApplication,
  updateApplication,
  clinicCode,
  allClinic,
  clinicTree,
  clinicDetail,
  addClinic,
  deleteClinic,
  updateClinic,
  diagnoseCode,
  allDiagnoseInfo,
  diagnoseInfoDetail,
  addDiagnoseInfo,
  deleteDiagnoseInfo,
  updateDiagnoseInfo,
  diagnoseContentDetail,
  deleteDiagnoseContent,
  addDiagnoseContent,
  getAllCompany,
  companyCode,
  companyDetail,
  companyTree,
  addCompany,
  deleteCompany,
  updateCompany,
  companyDetail2,
  addCompanyExamRecord,
  updateCompanyExamRecord,
  deleteCompanyExamRecord,
  companyExamRecordDetail,
  companyExamRecordList,
  companyExamRecordTimes,
  companyGroupCode,
  addCompanyGroup,
  updateCompanyGroup,
  companyGroupTree,
  deleteCompanyGroup,
  getAllCompanyGroup,
  companyGroupDetail,
  allExamResultType,
  examResultTypeCode,
  examResultTypeTree,
  addRegistration,
  updateRegistration,
  registrationDetail,
  registrationCode,
  getLabelNumber,
  deleteRegistration,
  officialRegistration,
  getAllStaff,
  getAllStaffs,
  getPersonInfo,
  getExamCode,
  addCustomerType,
  updateCustomerType,
  getAllCustomerType,
  customerTypeCode,
  deleteCustomerType,
  customerTypeDetail,
  customerTypeTree,
  addExamType,
  updateExamType,
  getAllExamType,
  examTypeCode,
  examTypeTree,
  deleteExamType,
  examTypeDetail,
  getAllIllType,
  illTypeCode,
  illTypeTree,
  deleteIllType,
  addIllType,
  updateIllType,
  addDiscount,
  updateDiscount,
  discountTree,
  discountDetail,
  deleteDiscount,
  getAllDiscount,
  discountType,
  addInvoice,
  updateInvoice,
  getAllInvoice,
  invoiceCode,
  invoiceTree,
  deleteInvoice,
  invoiceDetail,
  addOtherCharge,
  updateOtherCharge,
  getAllOtherCharge,
  otherChargeCode,
  otherChargeDetail,
  otherChargeTree,
  deleteOtherCharge,
  addCollect,
  updateCollect,
  getAllCollect,
  collectCode,
  collectDetail,
  collectTree,
  deleteCollect,
  addExamRecord,
  getInfo,
  getExamRecord,
  receiptInfoDetail,
  receiptInfoList,
  receiptInfo,
  printSheet,
  chargeInfo,
  addChargeType,
  updateChargeType,
  getAllChargeType,
  chargeTypeCode,
  chargeTypeTree,
  deleteChargeType,
  chargeTypeDetail,
  addCommonResults,
  deleteCommonResults,
  commonResultsDetail,
  addMenu,
  menuTree,
  menuDetail,
  deleteMenu,
  updateMenu,
  addRole,
  updateRole,
  getAllRole,
  roleList,
  deleteRole,
  roleDetail,
  addUser,
  adminPassword,
  currentUser,
  userInfo,
  validationMobile,
  userList,
  userPassword,
  deleteUser,
  detailInfo,
  authorization,
  getAuth,
  // printInstructionSheet,
  examRecordUser1,
  examRecordUser2,
  examResult,
  saveExamResult,
  saveExamResultItem,
  checkoutInfo,
  printSheetBatch
}
