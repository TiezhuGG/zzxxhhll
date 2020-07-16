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

// 验证码验证
export function checkCode(data) {
    return request({
        url: 'check_code',
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

// 更改默认企业
export function changeEnterprise(data) {
    return request({
        url: 'change_company',
        method: 'post',
        data
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

// 找回重置密码
export function findPassword(data) {
    return request({
        url: 'find_password',
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

// 验证密码
export function checkPassword(data) {
    return request({
        url: 'check_password',
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
        params: data
    })
}

// 获取子集部门列表含成员
export function getDeparmentMember(data) {
    return request({
        url: 'company_department_member',
        params: data
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

// 邀请成员
export function inviteMember(data) {
    return request({
        url: 'invite_member',
        method: 'post',
        data
    })
}

// 获取邀请验证码
export function getInviteCode(data) {
    return request({
        url: 'send_invite_sms',
        method: 'post',
        data
    })
}

// 邀请注册页面信息
export function inviteInfo(id) {
    return request({
        url: `invite_member/register/${id}`,
    })
}

// 申请加入公司
export function joinCompany(data) {
    return request({
        url: 'join_company',
        method: 'post',
        data
    })
}

// 邀请用户(加入团队)注册
export function inviteRegister(data) {
    return request({
        url: 'admin_invite_register',
        method: 'post',
        data
    })
}

// 上传图片
export function imageUpload(data) {
    return request({
        url: 'image_upload',
        method: 'post',
        data
    })
}

// 获取公司成员列表
export function getMemberList(id) {
    return request({
        url: `company_member_list?company_id=${id}`,
    })
}