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
  }]
}

export default apps