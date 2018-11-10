import Vue from 'vue'
import Router from 'vue-router'
// import Layout from '@/views/layout/Layout'

// const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/login',
  //   name: 'login',
  //   hidden: true
  // },
  {
    path: '',
    component: Layout,
    redirect: '/dashboard/dashboard',
    meta: {title: '首页'}
  },
  { path: '/login', component: () => import('@/views/login'), name: '登录', hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  // 锁屏
  {
    path: '/lock',
    hidden: true,
    name: '锁屏页',
    component: () => import('@/views/common/lock')
  },
  // 报表
  {
    path: '/dashboard',
    component: Layout,
    meta: { title: 'dashboard', icon: 'dashboard' },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/dashboard'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },
  // 图表
  {
    path: '/charts',
    component: Layout,
    redirect: '/charts/DiscountFigure',
    name: 'charts',
    meta: { title: 'charts', icon: 'chart' },
    children: [
      {
        path: 'DiscountFigure',
        name: 'DiscountFigure',
        component: () => import('@/views/charts/DiscountFigure'),
        meta: { title: 'DiscountFigure', icon: 'discounting' }
      },
      {
        path: 'columnar',
        name: 'columnar',
        component: () => import('@/views/charts/columnar'),
        meta: { title: 'columnar', icon: 'columnar' }
      },
      {
        path: 'barGraph',
        name: 'barGraph',
        component: () => import('@/views/charts/barGraph'),
        meta: { title: 'barGraph', icon: 'barGraph' }
      },
      {
        path: 'pieChart',
        name: 'pieChart',
        component: () => import('@/views/charts/pieChart'),
        meta: { title: 'pieChart', icon: 'pieChart' }
      },
      {
        path: 'ringChart',
        name: 'ringChart',
        component: () => import('@/views/charts/ringChart'),
        meta: { title: 'ringChart', icon: 'ringChart' }
      },
      {
        path: 'waterfallCharts',
        name: 'waterfallCharts',
        component: () => import('@/views/charts/waterfallCharts'),
        meta: { title: 'waterfallCharts', icon: 'waterfallCharts' }
      },
      {
        path: 'funnelCharts',
        name: 'funnelCharts',
        component: () => import('@/views/charts/funnelCharts'),
        meta: { title: 'funnelCharts', icon: 'funnelCharts' }
      },
      {
        path: 'radarCharts',
        name: 'radarCharts',
        component: () => import('@/views/charts/radarCharts'),
        meta: { title: 'radarCharts', icon: 'radarCharts' }
      },
      {
        path: 'sankeyChart',
        name: 'sankeyChart',
        component: () => import('@/views/charts/sankeyChart'),
        meta: { title: 'sankeyChart', icon: 'sankeyChart' }
      },
      {
        path: 'heatmapChart',
        name: 'heatmapChart',
        component: () => import('@/views/charts/heatmapChart'),
        meta: { title: 'heatmapChart', icon: 'heatmapChart' }
      },
      {
        path: 'scatterChart',
        name: 'scatterChart',
        component: () => import('@/views/charts/scatterChart'),
        meta: { title: 'scatterChart', icon: 'scatterChart' }
      },
      {
        path: 'candleChart',
        name: 'candleChart',
        component: () => import('@/views/charts/candleChart'),
        meta: { title: 'candleChart', icon: 'candleChart' }
      },
      {
        path: 'gaugeChart',
        name: 'gaugeChart',
        component: () => import('@/views/charts/gaugeChart'),
        meta: { title: 'gaugeChart', icon: 'gaugeChart' }
      },
      {
        path: 'treeChart',
        name: 'treeChart',
        component: () => import('@/views/charts/treeChart'),
        meta: { title: 'treeChart', icon: 'treeChart' }
      }
    ]
  },
  // 地图
  {
    path: '/map',
    component: Layout,
    redirect: '/map/pointAccumulationMap',
    name: 'baidumap',
    meta: {
      title: 'baidumap',
      icon: 'baidumap'
    },
    children: [
      {
        path: 'pointMap',
        name: 'pointMap',
        component: () => import('@/views/map/pointMap'),
        meta: { title: 'pointMap', icon: 'pointMap' }
      },
      {
        path: 'cityLlistMap',
        name: 'cityLlistMap',
        component: () => import('@/views/map/cityLlistMap'),
        meta: { title: 'cityLlistMap', icon: 'cityLlistMap' }
      },
      {
        path: 'roadBookMap',
        name: 'roadBookMap',
        component: () => import('@/views/map/roadBookMap'),
        meta: { title: 'roadBookMap', icon: 'roadBookMap' }
      },
      {
        path: 'gpsMap',
        name: 'gpsMap',
        component: () => import('@/views/map/gpsMap'),
        meta: { title: 'gpsMap', icon: 'gpsMap' }
      }
    ]
  },
  // 第三方官网
  {
    path: '/myiframe',
    component: Layout,
    redirect: '/myiframe',
    children: [{
      path: ':routerPath',
      name: 'myiframe',
      component: () => import('@/components/nx-iframe'),
      meta: { title: 'thirdPartyWebsite', icon: 'people' }
    }]

  },
  // pdf说明
  {
    path: '/pdfTest',
    component: Layout,
    redirect: '/pdfTest/pdf',
    children: [{
      path: 'pdf',
      name: 'pdf',
      component: () => import('@/views/pdfTest/index'),
      meta: { title: 'PDF', icon: 'pdf' }
    }]
  },

  {
    path: '/wel',
    component: Layout,
    meta: { title: 'wel', icon: 'wel' },
    children: [
      {
        path: 'wel',
        name: 'wel',
        component: () => import('@/views/page/wel'),
        meta: { title: 'wel', icon: 'wel' }
      }

    ]
  },

  // 表情包
  {
    path: '/emoji',
    component: Layout,
    meta: { title: 'emoji', icon: 'emoji' },
    children: [
      {
        path: 'emoji',
        name: 'emoji',
        component: () => import('@/views/githubemoji'),
        meta: { title: 'emoji', icon: 'emoji' }
      }

    ]
  },
  // 树形组件
  {
    path: '/treeMen',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: 'treeMen',
      icon: 'TreeMean'
    },
    children: [
      {
        path: 'treeMen',
        name: 'treeMen-demo',
        component: () => import('@/views/tree/treeMen'),
        meta: { title: 'treeMen', icon: 'TreeMean' }
      }
    ]
  },
  // 图标组件
  {
    path: '/icons',
    component: Layout,
    redirect: '/icons/iconIndex',
    name: 'icons',
    meta: {
      title: 'Icons',
      icon: 'icon'
    },
    children: [
      {
        path: 'iconIndex',
        name: 'iconIndex',
        component: () => import('@/views/icons/svg-icons/iconIndex'),
        meta: { title: 'svgicons', icon: 'icon' }
      },
      {
        path: 'font-awesome',
        name: 'font-awesome',
        component: () => import('@/views/icons/font-awesome/'),
        meta: { title: 'fontawesome', icon: 'font-awesome' }
      },
      {
        path: 'AliIcons',
        name: 'AliIcons',
        component: () => import('@/views/icons/AliIcons/'),
        meta: { title: 'AliIcons', icon: 'AliIcons' }
      }
    ]
  },
  // 实战
  {
    path: '/vueActual',
    component: Layout,
    redirect: '/vueActual/Pos',
    name: 'vueActual',
    meta: {
      title: 'vueActual',
      icon: 'shizhan'
    },
    children: [
      {
        path: 'Pos',
        name: 'Pos',
        component: () => import('@/views/vueActual/Pos'),
        meta: { title: 'vueActual', icon: 'shizhan' }
      }
    ]
  },
  // 组件
  {
    path: '/components',
    component: Layout,
    redirect: '/components/dragKanban',
    name: 'Components',
    meta: {
      title: 'Components',
      icon: 'component'
    },
    children: [
      {
        path: 'dragKanban',
        name: 'dragKanban',
        component: () => import('@/views/components/dragKanban'),
        meta: { title: 'dragKanban' }
      },
      {
        path: 'markdown',
        name: 'markdown',
        component: () => import('@/views/components/markdown'),
        meta: { title: 'markdown' }
      },
      {
        path: 'backToTop',
        name: 'backToTop',
        component: () => import('@/views/components/backToTop'),
        meta: { title: 'backToTop' }
      },
      {
        path: 'clipboard',
        name: 'clipboard',
        component: () => import('@/views/clipboard/index'),
        meta: { title: 'clipboard', icon: 'clipboard' }
      },
      {
        path: 'mixin',
        name: 'componentMixin',
        component: () => import('@/views/components-demo/mixin'),
        meta: { title: 'componentMixin' }
      },
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/components/index'),
        meta: { title: 'HightLightinViewer' }
      },
      {
        path: 'countup',
        name: 'countup',
        component: () => import('@/views/components/countup/'),
        meta: { title: 'Digitalanimation' }
      }
    ]
  },
  // 表格
  {
    path: '/Tabs',
    component: Layout,
    redirect: 'Tabs',
    meta: { title: 'Tabs', icon: 'tab' },
    children: [
      {
        path: 'Tabs',
        name: 'Tabs',
        component: () => import('@/views/table/Tabs'),
        meta: { title: 'Tabs', icon: 'tab' }
      }
    ]
  },

  // 滚动定位
  {
    path: '/better-scroll',
    component: Layout,
    redirect: 'better-scroll/to',
    meta: { title: 'better-scroll', icon: 'better-scroll' },
    children: [
      {
        path: 'to',
        name: 'to',
        component: () => import('@/views/better-scroll/to'),
        meta: { title: 'Rollingpositioning', icon: 'Rollingpositioning' }
      }
    ]
  },
  // 表单
  {
    path: '/form',
    component: Layout,
    redirect: '/form/BaseForm',
    name: 'form',
    meta: {
      title: 'form',
      icon: 'form'
    },
    children: [
      {
        path: 'BaseForm',
        name: 'BaseForm',
        component: () => import('@/views/form/BaseForm'),
        meta: { title: 'BaseForm' }
      },
      {
        path: 'VueEditor',
        name: 'VueEditor',
        component: () => import('@/views/form/VueEditor'),
        meta: { title: 'VueEditor' }
      },
      {
        path: 'Upload',
        name: 'Upload',
        component: () => import('@/views/form/Upload'),
        meta: { title: 'Upload' }
      }
    ]
  },
  // 右菜单
  {
    path: '/contextmenu',
    component: Layout,
    redirect: '/contextmenu/simple',
    name: 'contextmenu',
    meta: {
      title: 'contextmenu',
      icon: 'right-mean'
    },
    children: [
      {
        path: 'simple',
        name: 'simple',
        component: () => import('@/views/contextmenu/simple'),
        meta: { title: 'simple' }
      },
      {
        path: 'divier',
        name: 'divier',
        component: () => import('@/views/contextmenu/divier'),
        meta: { title: 'divier' }
      },
      {
        path: 'group',
        name: 'group',
        component: () => import('@/views/contextmenu/group'),
        meta: { title: 'group' }
      },
      {
        path: 'submenu',
        name: 'submenu',
        component: () => import('@/views/contextmenu/submenu'),
        meta: { title: 'submenu' }
      },
      {
        path: 'disabled',
        name: 'disabled',
        component: () => import('@/views/contextmenu/disabled'),
        meta: { title: 'disabled' }
      },
      {
        path: 'custom-trigger',
        name: 'customtrigger',
        component: () => import('@/views/contextmenu/custom-trigger'),
        meta: { title: 'customtrigger' }
      }
    ]
  },
  // 表格
  {
    path: '/table',
    component: Layout,
    redirect: '/table/complex-table',
    name: 'table',
    meta: {
      title: 'Table',
      icon: 'table'
    },
    children: [
      {
        path: 'complex-table',
        name: 'complex-table',
        component: () => import('@/views/table/complex-table'),
        meta: { title: 'complexTable' }
      },
      {
        path: 'TreeTable',
        name: 'TreeTable',
        component: () => import('@/views/table/tree-table/index'),
        meta: { title: 'treeTable' }
      }

    ]
  },
  //
  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/exportExcel',
    name: 'excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'exportExcel',
        name: 'exportExcel',
        component: () => import('@/views/excel/exportExcel'),
        meta: { title: 'exportExcel' }
      },
      {
        path: 'selectExcel',
        name: 'selectExcel',
        component: () => import('@/views/excel/selectExcel'),
        meta: { title: 'selectExcel' }
      },
      {
        path: 'uploadExcel',
        name: 'uploadExcel',
        component: () => import('@/views/excel/uploadExcel'),
        meta: { title: 'uploadExcel' }
      }
    ]
  },
  {
    path: '/zip',
    component: Layout,
    redirect: 'zip',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/zip/index'),
        meta: { title: 'zip', icon: 'zip' }
      }
    ]
  },
  {
    path: '/i18n-demo',
    component: Layout,
    redirect: 'i18n-demo',
    children: [
      {
        path: 'indexLang',
        name: 'indexLang',
        component: () => import('@/views/i18n-demo/indexLang'),
        meta: { title: 'i18n', icon: 'international' }
      }
    ]
  },
  {
    path: '/base',
    name: 'Layout',
    component: Layout,
    children: [
      {path: 'office', name: 'office', component: () => import('@/views/office/office'), meta: {title: '体检科室设置'}},
      {path: 'clinic', name: 'clinic', component: () => import('@/views/clinic/clinic'), meta: {title: '临床类型设置'}},
      {path: 'sample', name: 'sample', component: () => import('@/views/sample/sample'), meta: {title: '标本类型设置'}},
      {path: 'examItems', name: 'examItems', component: () => import('@/views/examItems/examItems'), meta: {title: '体检项目设置'}},
      {path: 'programGroup', name: 'programGroup', component: () => import('@/views/programGroup/programGroup'), meta: {title: '组合项目设置'}},
      {path: 'package', name: 'package', component: () => import('@/views/package/package'), meta: {title: '体检套餐设置'}},
      {path: 'advice', name: 'advice', component: () => import('@/views/advice/advice'), meta: {title: '诊断建议设置'}},
      {path: 'application', name: 'application', component: () => import('@/views/application/application'), meta: {title: '检查项目申请单'}},
      {path: 'equipment', name: 'equipment', component: () => import('@/views/equipment/equipment'), meta: {title: '医技设备设置'}},
      // {path: 'conclusion', name: 'conclusion', component: () => import('@/views/conclusion/conclusion'), meta: {title: '体检结论设置'}},
      // {path: 'diseases', name: 'diseases', component: () => import('@/views/diseases/diseases'), meta: {title: '疾病分类设置'}},
      {path: 'result', name: 'result', component: () => import('@/views/result/result'), meta: {title: '常见结果设置'}},
      // {path: 'service', name: 'service', component: () => import('@/views/service/service'), meta: {title: '服务行业设置'}},
      {path: 'personalCategory', name: 'personalCategory', component: () => import('@/views/personalCategory/personalCategory'), meta: {title: '人员类别设置'}},
      {path: 'medicalCategory', name: 'medicalCategory', component: () => import('@/views/medicalCategory/medicalCategory'), meta: {title: '体检类别设置'}},
      // {path: 'statisticTemplate', name: 'statisticTemplate', component: () => import('@/views/statisticTemplate/statisticTemplate'), meta: {title: '疾病模板设置'}},
      // {path: 'remindDiagnosis', name: 'remindDiagnosis', component: () => import('@/views/remindDiagnosis/remindDiagnosis'), meta: {title: ''}},
      // {path: 'summaryOffice', name: 'summaryOffice', component: () => import('@/views/summaryOffice/summaryOffice'), meta: {title: '汇总科室设置'}},
      {path: 'invoice', name: 'invoice', component: () => import('@/views/invoice/invoice'), meta: {title: '发票项目设置'}},
      {path: 'summaryProject', name: 'summaryProject', component: () => import('@/views/summaryProject/summaryProject'), meta: {title: '汇总项目设置'}},
      {path: 'relevantCharges', name: 'relevantCharges', component: () => import('@/views/relevantCharges/relevantCharges'), meta: {title: '相关收费设置'}},
      {path: 'discount', name: 'discount', component: () => import('@/views/discount/discount'), meta: {title: '折扣种类设置'}},
      // {path: 'projectFunction', name: 'projectFunction', component: () => import('@/views/projectFunction/projectFunction'), meta: {title: '项目函数设置'}},
      // {path: 'questions', name: 'questions', component: {app_main: Questions}},
      // {path: 'serviceRegistration', name: 'serviceRegistration', component: () => import('@/views/serviceRegistration/serviceRegistration'), meta: {title: '服务登记'}},
      //{path: 'personalExamInfo', name: 'personalExamInfo', component: () => import('@/views/personalExamInfo/personalExamInfo'), meta: {title: '个人体检信息'}},
      // {path: 'companySettlement', name: 'companySettlement', component: () => import('@/views/companySettlement/companySettlement'), meta: {title: '单位体检结算方式设置'}},
      // {path: 'officeQuestion', name: 'officeQuestion', component: {app_main: OfficeQuestion}},
      // {path: 'personalUpdateInfo', name: 'personalUpdateInfo', component: () => import('@/views/personalUpdateInfo/personalUpdateInfo'), meta: {title: '单个人员信息修改'}},
      // {path: 'specimenManagement', name: 'specimenManagement', component: () => import('@/views/specimenManagement/specimenManagement'), meta: {title: '检验标本管理'}},
      // {path: 'batchPreRegistration', name: 'batchPreRegistration', component: () => import('@/views/batchPreRegistration/batchPreRegistration'), meta: {title: '批量预登记'}},
      // {path: 'batchFromExcel', name: 'batchFromExcel', component: () => import('@/views/batchPreRegistration/batchFromExcel'), meta: {title: '从Excel文件中读取'}},
      // {path: 'batchFromRecord', name: 'batchFromRecord', component: () => import('@/views/batchPreRegistration/batchFromRecord'), meta: {title: '从以往体检记录中读取'}},
      // {path: 'personalExamCharge', name: 'personalExamCharge', component: () => import('@/views/personalExamCharge/personalExamCharge'), meta: {title: '单个体检收费'}},
      // {path: 'cancelRefund', name: 'cancelRefund', component: () => import('@/views/cancelRefund/cancelRefund'), meta: {title: '撤销退费'}},
      // {path: 'medicalPlatform', name: 'medicalPlatform', component: () => import('@/views/medicalPlatform/medicalPlatform'), meta: {title: '体检诊台设置'}},
      // {path: 'medicalArea', name: 'medicalArea', component: () => import('@/views/medicalArea/medicalArea'), meta: {title: '体检区域设置'}},
      // {path: 'refusalExam', name: 'refusalExam', component: () => import('@/views/refusalExam/refusalExam'), meta: {title: '单位人员拒检登记'}},
      // {path: 'adjustProject', name: 'adjustProject', component: () => import('@/views/adjustProject/adjustProject'), meta: {title: '按项目单个调整'}},
      // {path: 'adjustProjectBatch', name: 'adjustProjectBatch', component: () => import('@/views/adjustProjectBatch/adjustProjectBatch'), meta: {title: '按项目批量调整'}},
      // {path: 'groupAdjustment', name: 'groupAdjustment', component: () => import('@/views/groupAdjustment/groupAdjustment'), meta: {title: '按分组调整'}},
      // {path: 'barcode', name: 'barcode', component: () => import('@/views/barcode/barcode'), meta: {title: '打印条形码'}},

      {path: 'chargeType', name: 'chargeType', component: () => import('@/views/chargeType/chargeType'), meta: {title: '收费类别设置'}}

    ]
  },
  {
    path: '/exam',
    component: Layout,
    children: [
      {path: 'registration', name: 'registration', component: () => import('@/views/registration/registration'), meta: {title: '个人体检登记'}},
      {path: 'individualPreRegistration', name: 'individualPreRegistration', component: () => import('@/views/individualPreRegistration/individualPreRegistration'), meta: {title: '单位体检个人预登记'}},
      {path: 'officiallyRegistered', name: 'officiallyRegistered', component: () => import('@/views/officiallyRegistered/officiallyRegistered'), meta: {title: '正式登记'}},
      {path: 'company', name: 'company', component: () => import('@/views/company/company'), meta: {title: '体检单位登记'}},
      {path: 'companyGroup', name: 'companyGroup', component: () => import('@/views/companyGroup/companyGroup'), meta: {title: '单位分组设置'}},
      {path: 'examFee', name: 'examFee', component: () => import('@/views/examFee/examFee'), meta: {title: '个人体检收费'}},
      {path: 'instructionSheet', name: 'instructionSheet', component: () => import('@/views/instructionSheet/instructionSheet'), meta: {title: '打印指引单'}},
      {path: 'companyFee', name: 'companyFee', component: () => import('@/views/companyFee/companyFee'), meta: {title: '单位收费'}},
      {path: 'physicalExamination', name: 'physicalExamination', component: () => import('@/views/physicalExamination/physicalExamination'), meta: {title: '体检医生诊断'}},
      {path: 'inspection', name: 'inspection', component: () => import('@/views/inspection/inspection'), meta: {title: '检验项目诊断'}},
      {path: 'generalExamination', name: 'generalExamination', component: () => import('@/views/generalExamination/generalExamination'), meta: {title: '总检医生诊断'}},
      {path: 'medicalReport', name: 'medicalReport', component: () => import('@/views/medicalReport/medicalReport'), meta: {title: '打印体检报告'}}
    ]
  },
  {
    path: '/system',
    component: Layout,
    children: [
      {path: 'menus', name: 'menus', component: () => import('@/views/menus/menus'), meta: {title: '菜单管理'}},
      {path: 'role', name: 'role', component: () => import('@/views/role/role'), meta: {title: '角色管理'}},
      {path: 'user', name: 'user', component: () => import('@/views/user/user'), meta: {title: '用户管理'}},
      {path: 'configInfo', name: 'configInfo', component: () => import('@/views/configInfo/configInfo'), meta: {title: '基本信息设置'}},
      {path: 'changePassword', name: 'changePassword', component: () => import('@/views/changePassword/changePassword'), meta: {title: '修改密码'}}
    ]
  }
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    name: 'permission',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [{
      path: 'page',
      component: () => import('@/views/permission/page'),
      name: 'pagePermission',
      meta: {
        title: 'pagePermission',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }, {
      path: 'directive',
      component: () => import('@/views/permission/directive'),
      name: 'directivePermission',
      meta: {
        title: 'directivePermission'
        // if do not set roles, means: this page does not require permission
      }
    }]
  },
  // 报表
  {
    path: '/dashboard',
    component: Layout,
    meta: { title: 'dashboard', icon: 'dashboard' },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/dashboard'),
        meta: { title: 'dashboard', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'errorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      { path: '401', component: () => import('@/views/errorPage/401'), name: 'page401', meta: { title: 'page401', noCache: true }},
      { path: '404', component: () => import('@/views/errorPage/404'), name: 'page404', meta: { title: 'page404', noCache: true }}
    ]
  },
  // 错误日志
  {
    path: '/errorLog',
    component: Layout,

    children: [
      {
        path: 'errorLog',
        name: 'errorLog',
        component: () => import('@/views/errorLog/errorLog'),
        meta: { title: 'Errorlog', icon: 'errorLog' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }];
