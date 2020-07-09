/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  // 验证用户名
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} str
 */
export function validName(str) {
  // 验证姓名
  const nameReg = /^[\u4E00-\u9FA5a-zA-Z0-9_]{2,10}$/
  if (!nameReg.test(str)) {
    return false
  } else {
    return true
  }
}

/**
 * @param {string} str
 */
export function validEnterpriseName(str) {
  // 验证企业名称
  const enterpriseName = /^[\u4E00-\u9FA5]{2,20}$/
  if (!enterpriseName.test(str)) {
    return false
  } else {
    return true
  }
}

/**
 * @param {string} str
 */
export function validMobile(str) {
  // 验证注册手机号
  const phoneReg = /^1[3456789]\d{9}$/
  if (!phoneReg.test(str)) {
    return false
  } else {
    return true
  }
}

/**
 * @param {string} str
 */
export function validCode(str) {
  // 验证验证码
  const phoneReg = /^\d{6}$/
  if (!phoneReg.test(str)) {
    return false
  } else {
    return true
  }
}

/**
 * @param {string} str
 */
export function validEmail(str) {
  // 验证邮箱
  const emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  if (!emailReg.test(str)) {
    return false
  } else {
    return true
  }
}

/**
 * @param {string} str
 */
export function validIdcard(str) {
  // 验证邮箱
  const idCardReg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
  if (!idCardReg.test(str)) {
    return false
  } else {
    return true
  }
}
