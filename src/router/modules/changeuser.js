import Layout from '@/layout'

const changeuser = {
  path: '/changeuser',
  component: Layout,
  redirect: '/changeuser/password',
  hidden: true,
  children: [{
    path: 'password',
    name: 'password',
    component: resolve => require(['@/views/changeuser'], resolve),
    meta: {
      hiddenTag: true,
      title: '修改密码',
      icon: ''
    }
  }]
}
export default changeuser
