const user = {
    path: '/user',
    redirect: '/user/login',
    component: resolve => require(['@/views/user/index'], resolve),
    hidden: true,
    children: [{
            path: 'login',
            name: 'Login',
            component: resolve => require(['@/views/user/login/login'], resolve),
            hidden: true,
            meta: {
                title: '登录'
            }
        },
        {
            path: 'register',
            name: 'Register',
            component: resolve => require(['@/views/user/register/register'], resolve),
            hidden: true,
            meta: {
                title: '注册'
            }
        },
        {
            path: 'verify-code',
            name: 'VerifyCode',
            component: resolve => require(['@/views/user/verify-code/verify-code'], resolve),
            hidden: true,
            meta: {
                title: '验证码'
            }
        },
        {
            path: 'set-password',
            name: 'SetPassword',
            component: resolve => require(['@/views/user/set-password/set-password'], resolve),
            hidden: true,
            meta: {
                title: '设置密码'
            }
        },
        {
            path: 'forget-password',
            name: 'ForgetPassword',
            component: resolve => require(['@/views/user/forget-password/forget-password'], resolve),
            hidden: true,
            meta: {
                title: '手机找回密码'
            }
        },
        {
            path: 'forget-password-email',
            name: 'ForgetPasswordEmail',
            component: resolve => require(['@/views/user/forget-password-email/forget-password-email'], resolve),
            hidden: true,
            meta: {
                title: '邮箱找回密码'
            }
        },
        {
            path: 'enterprise',
            name: 'Enterprise',
            component: resolve => require(['@/views/user/enterprise/enterprise'], resolve),
            hidden: true,
            meta: {
                title: '注册企业'
            }
        },
        {
            path: 'has-enterprise',
            name: 'HasEnterprise',
            component: resolve => require(['@/views/user/has-enterprise/has-enterprise'], resolve),
            hidden: true,
            meta: {
                title: '已有企业'
            }
        },
        {
            path: 'unreviewed',
            name: 'Unreviewed',
            component: resolve => require(['@/views/user/unreviewed/unreviewed'], resolve),
            hidden: true,
            meta: {
                title: '申请企业未审批'
            }
        }
    ]
}

export default user