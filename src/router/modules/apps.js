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

]
}

export default apps
