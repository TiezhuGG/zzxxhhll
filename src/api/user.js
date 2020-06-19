import request from '@/utils/request'

// 用户注册
export function register(data) {
    return request({
        url: 'admin_register',
        method: 'post',
        data
    })
}

// 获取验证码
export function getVerifyCode(data) {
    return request({
        url: 'send_sms',
        method: 'post',
        data
    })
}

// 登录
export function login(data) {
    return request({
        url: 'admin_login',
        method: 'post',
        data
    })
}

// 获取个人信息
export function getUserinfo() {
    return request({
        url: 'info',
    })
}

// 获取企业列表
export function getEnterpriseList() {
    return request({
        url: 'user_company_list',
    })
}

// 注册企业
export function enterpriseRegister() {
    return request({
        url: 'company/register',
    })
}

// 修改密码
export function changePassword(data) {
    return request({
        url: 'password',
        method: 'post',
        data
    })
}

// 修改手机
export function changeMoblie(data) {
    return request({
        url: 'mobile',
        method: 'post',
        data
    })
}

// 验证用户(旧手机)
export function checkAccount(data) {
    return request({
        url: 'check_account',
        method: 'post',
        data
    })
}

// 绑定新手机
export function changeMobile(data) {
    return request({
        url: 'change_mobile',
        method: 'post',
        data
    })
}



export function logout() {
    return request({
        url: '/vue-admin-template/user/logout',
        method: 'post'
    })
}