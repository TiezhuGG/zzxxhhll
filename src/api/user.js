import request from '@/utils/request'

// 注册
export function register(data) {
  console.log('发起注册请求')
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
