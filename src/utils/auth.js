import Cookies from 'js-cookie'

const TokenKey = 'token'

export function setInfo(info) {
  return Cookies.set('userinfo', info)
}

export function getUserInfo() {
  var u = Cookies.get('userinfo')
  u = u ? JSON.parse(u) : ''
  return u
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function removeUser() {
  return Cookies.remove('userinfo')
}
