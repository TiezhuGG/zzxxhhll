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
export function getUserinfo(id) {
    return request({
        url: `info/${id}`,
    })
}

// 注册企业
export function enterpriseRegister(data) {
    return request({
        url: 'company/register',
        method: 'post',
        data
    })
}

// 完善企业信息
export function completeInfo(data) {
    return request({
        url: 'company/complete',
        method: 'post',
        data
    })
}

// 获取企业列表
export function getEnterpriseList() {
    return request({
        url: 'user_company_list',
    })
}

// 获取退出企业理由列表
export function getQuitReasons() {
    return request({
        url: 'quit_reasons',
    })
}

// 退出企业
export function quitEnterprise(data) {
    return request({
        url: 'quit_company',
        method: 'post',
        data
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

// 获取一级部门列表
export function getDeparments(data) {
    return request({
        url: 'company_department_list',
        params:data
    })
}

// 获取子集部门列表含成员
export function getDeparmentMember(data) {
    return request({
        url: 'company_department_member',
        params:data
    })
}

// 获取省市区列表
export function getArea() {
    return request({
        url: 'china_area',
    })
}

// 获取行业列表
export function getBusiness() {
    return request({
        url: 'businesses',
    })
}



export function logout() {
    return request({
        url: '/vue-admin-template/user/logout',
        method: 'post'
    })
}