import Layout from '@/layout'

const changeuser = {
  path: '/changeuser',
  component: Layout,
  redirect: '/changeuser/password',
  hidden: true,
  children: [{
    path: 'password',
    name: 'password',
    component: resolve => require(['@/views/changeuser/password'], resolve),
    meta: {
      hiddenTag: true,
      title: '修改密码',
      icon: ''
    }
  }, {
    path: 'TelOne',
    name: 'TelOne',
    component: resolve => require(['@/views/changeuser/telOne'], resolve),
    meta: {
      hiddenTag: true,
      title: '修改手机号码',
      icon: ''
    }
  }, {
    path: 'TelTwo',
    name: 'TelTwo',
    component: resolve => require(['@/views/changeuser/telTwo'], resolve),
    meta: {
      hiddenTag: true,
      title: '修改手机号',
      icon: ''
    }
  }, {
    path: 'OutFirm',
    name: 'OutFirm',
    component: resolve => require(['@/views/changeuser/outFirm'], resolve),
    meta: {
      hiddenTag: true,
      title: '退出企业',
      icon: ''
    }
  }]
}
export default changeuser
