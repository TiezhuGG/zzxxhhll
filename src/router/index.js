import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

import apps from './modules/apps'
import user from './modules/user'
import changeuser from './modules/changeuser'
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

export const constantRoutes = [
    /**
     * 用户端首页
     */
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
    /**
     * 登录注册
     */
    user,
    // 发送邮件
    {
        path: '/send-email',
        name: 'Send-Email',
        component: resolve => require(['@/views/user/send-email/send-email'], resolve),
        hidden: true,
        meta: {
            title: '发送邮件'
        }
    },

    /**
     *  邀请加入团队
     */
    {
        path: '/invite',
        redirect: '/user/login',
        component: resolve => require(['@/views/invite/index'], resolve),
        hidden: true,
        children: [{
                path: 'member/:id',
                name: 'Member',
                component: resolve => require(['@/views/invite/member/member'], resolve),
                hidden: true,
                meta: {
                    title: '邀请加入团队'
                }
            },
            {
                path: 'verify-code',
                name: 'Verify-code',
                component: resolve => require(['@/views/invite/verify-code/verify-code'], resolve),
                hidden: true,
                meta: {
                    title: '填写验证码'
                }
            },
            {
                path: 'write-name',
                name: 'WriteName',
                component: resolve => require(['@/views/invite/write-name/write-name'], resolve),
                hidden: true,
                meta: {
                    title: '填写姓名'
                }
            }
        ]
    },
    {
        path: '/application',
        name: 'Application',
        component: resolve => require(['@/views/invite/application/application'], resolve),
        hidden: true,
        meta: {
            title: '申请成功'
        }
    },

    // 修改密码
    changeuser,

    // 审批
    {
        path: '/message',
        component: Layout,
        children: [
            {
                path: 'message',
                name: 'Message',
                component: resolve => require(['@/views/message/index'],resolve),
                meta: {
                    title: '肖鑫',
                    icon: 'approval',
                    hiddenTag: true
                }
            }
        ]
    },

    // 审批
    {
        path: '/approval',
        component: Layout,
        children: [
            {
                path: 'approval',
                name: 'Approval',
                component: resolve => require(['@/views/approval/index'],resolve),
                meta: {
                    title: '审批',
                    icon: 'approval',
                    hiddenTag: true
                }
            }
        ]
    },

    // 联系人
    {
        path: '/contact',
        component: Layout,
        children: [{
                path: 'contact',
                name: 'Contact',
                component: resolve => require(['@/views/contact/index'], resolve),
                meta: {
                    title: '联系人',
                    icon: 'record'
                }
            },
            {
                path: 'add',
                name: 'Add',
                hidden: true,
                component: resolve => require(['@/views/contact/add/add'], resolve),
                meta: {
                    title: '添加团队成员',
                    icon: 'record'
                }
            }
        ]
    },

    /**
     * 工作台应用程序
     */
    apps,

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

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router