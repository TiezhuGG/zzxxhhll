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

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: {
      token
    }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
