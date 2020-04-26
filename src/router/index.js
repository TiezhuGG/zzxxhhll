import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

export const constantRoutes = [{
  path: '/login',
  component: resolve => require(['@/views/login/login'], resolve),
  hidden: true,
  meta: {
    title: '登录'
  }
},

{
  path: '/register',
  component: resolve => require(['@/views/register/register'], resolve),
  hidden: true,
  meta: {
    title: '注册'

  }
},

{
  path: '/verify-code',
  name: 'verify-code',
  component: resolve => require(['@/views/verify-code/verify-code'], resolve),
  hidden: true,
  meta: {
    title: '验证码'
  }
},

{
  path: '/set-password',
  name: 'set-password',
  component: resolve => require(['@/views/set-password/set-password'], resolve),
  hidden: true,
  meta: {
    title: '设置密码'
  }
},

{
  path: '/enterprise',
  name: 'enterprise',
  component: resolve => require(['@/views/enterprise/enterprise'], resolve),
  hidden: true,
  meta: {
    title: '注册企业'
  }
},

{
  path: '/',
  component: Layout,
  redirect: '/index',
  children: [{
    path: 'index',
    name: 'Index',
    component: resolve => require(['@/views/index/index'], resolve),
    meta: {
      title: '工作台',
      icon: 'use'
    }
  }]
},

{
  path: '/contact',
  component: Layout,
  children: [{
    path: 'contact',
    name: 'Contact',
    component: resolve => require(['@/views/contact/contact'], resolve),
    meta: {
      title: '联系人',
      icon: 'workbench'
    }
  }]
},
{
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
      icon: 'payroll'
    }
  }]
},

{
  path: '/404',
  component: resolve => require(['@/views/404/404'], resolve),
  hidden: true,
  meta: {
    title: '404 Not Found'
  }
},

// 404 page must be placed at the end !!!
{
  path: '*',
  redirect: '/404',
  hidden: true
}
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
