import Layout from '@/layout'

const apps = {
  path: '/apps',
  component: Layout,
  redirect: '/apps/payroll',
  hidden: true,
  children: [{
    path: 'payroll',
    name: 'Payroll',
    component: resolve => require(['@/views/apps/payroll/index'], resolve),
    meta: {
      title: '公司工资薪资表',
      icon: 'payroll',
      activeMenu: '/index'
    }
  }, {
    path: 'detail',
    name: 'Detail',
    component: resolve => require(['@/views/apps/payroll/detail'], resolve),
    meta: {
      title: '个人信息',
      icon: 'payroll',
      activeMenu: '/index'
    }
  },
  {
    path: 'order',
    name: 'Order',
    component: resolve => require(['@/views/apps/order/order'], resolve),
    meta: {
      title: '客户订单汇总管理',
      icon: 'collect',
      activeMenu: '/index'
    }
  }, {
    path: 'orderDetail',
    name: 'OrderDetail',
    component: resolve => require(['@/views/apps/order/detail'], resolve),
    meta: {
      title: '客户订单汇总管理',
      icon: 'collect',
      activeMenu: '/index'
    }
  }, {
    path: '/material',
    name: 'Material',
    component: resolve => require(['@/views/apps/material/index'], resolve),
    meta: {
      title: '材料名称表',
      icon: 'namematerial',
      activeMenu: '/index'
    }
  }, {
    path: 'order_admin',
    name: 'OrderAdmin',
    component: resolve => require(['@/views/apps/orderAdmin/index'], resolve),
    meta: {
      title: '订单管理',
      icon: 'collect',
      activeMenu: '/index'
    },
    children: [{
      path: 'detail',
      name: 'Detail',
      component: resovle => require(['@/views/apps/orderAdmin/detail'], resovle),
      meta: {
        title: '订单详情',
        icon: 'collect',
        activeMenu: '/index'
      }
    }, {
      path: 'add',
      name: 'Add',
      component: resovle => require(['@/views/apps/orderAdmin/add'], resovle),
      meta: {
        title: '添加订单',
        icon: 'collect',
        activeMenu: '/index'
      }
    }]
  },
  {
    path: 'customer_index',
    name: 'customerIndex',
    component: resolve => require(['@/views/apps/customer/index.vue'], resolve),
    meta: {
      title: '客户管理',
      icon: 'collect',
      activeMenu: '/index'
    },
    children: [{
      path: 'customer_detail',
      name: 'customerDetail',
      component: resovle => require(['@/views/apps/customer/detail'], resovle),
      meta: {
        title: '客户详情',
        icon: 'collect',
        activeMenu: '/index'
      }
    }]
  },
  {
    path: 'material_admin',
    name: 'materialAdmin',
    component: resolve => require(['@/views/apps/materialAdmin/index.vue'], resolve),
    meta: {
      title: '材料管理',
      icon: 'collect',
      activeMenu: '/index'
    }
  },
  {
    path: 'consumption_index',
    name: 'customerIndex',
    component: resolve => require(['@/views/apps/consumption/index.vue'], resolve),
    meta: {
      title: '单耗管理',
      icon: 'collect',
      activeMenu: '/index'
    },
    children: [{
      path: 'consumption_detail',
      name: 'consumptionDetail',
      component: resovle => require(['@/views/apps/consumption/detail'], resovle),
      meta: {
        title: '单耗详情',
        icon: 'collect',
        activeMenu: '/index'
      }
    }]
  },
  {
    path: 'materialSupplier_index',
    name: 'materialSupplierIndex',
    component: resolve => require(['@/views/apps/materialSupplier/index.vue'], resolve),
    meta: {
      title: '材料供应商',
      icon: 'collect',
      activeMenu: '/index'
    },
    children: [{
      path: 'materialSupplier_detail',
      name: 'materialSupplierDetail',
      component: resovle => require(['@/views/apps/materialSupplier/detail'], resovle),
      meta: {
        title: '材料供应商详情',
        icon: 'collect',
        activeMenu: '/index'
      }
    }]
  },
  {
    path: 'machining_index',
    name: 'machiningIndex',
    component: resolve => require(['@/views/apps/machining/index.vue'], resolve),
    meta: {
      title: '外加工厂',
      icon: 'collect',
      activeMenu: '/index'
    },
    children: [{
      path: 'machining_detail',
      name: 'machiningDetail',
      component: resovle => require(['@/views/apps/machining/detail'], resovle),
      meta: {
        title: '外加工厂详情',
        icon: 'collect',
        activeMenu: '/index'
      }
    }]
  },
  {
    path: 'logisticsSupplier_index',
    name: 'logisticsSupplierIndex',
    component: resolve => require(['@/views/apps/logisticsSupplier/index.vue'], resolve),
    meta: {
      title: '物流供应商',
      icon: 'collect',
      activeMenu: '/index'
    },
    children: [{
      path: 'logisticsSupplier_detail',
      name: 'logisticsSupplierDetail',
      component: resovle => require(['@/views/apps/logisticsSupplier/detail'], resovle),
      meta: {
        title: '物流供应商详情',
        icon: 'collect',
        activeMenu: '/index'
      }
    }]
  },
  {
    path: 'contractFiling_index',
    name: 'contractFilingIndex',
    component: resolve => require(['@/views/apps/contractFiling/index.vue'], resolve),
    meta: {
      title: '合同备案',
      icon: 'collect',
      activeMenu: '/index'
    },
    children: [
      {
      path: 'contractFiling_detail',
      name: 'contractFilingDetail',
      component: resovle => require(['@/views/apps/contractFiling/detail'], resovle),
      meta: {
        title: '合同备案详情',
        icon: 'collect',
        activeMenu: '/index'
      }
    },

  ]
  },

]
}

export default apps
