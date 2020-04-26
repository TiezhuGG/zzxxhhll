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
  const nameReg = /^[\u4E00-\u9FA5]{2,4}$/
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
export function validRegisterUsername(str) {
  // 验证注册手机号
  const phoneReg = /^(13[0-9]{9})|(15[0-9][0-9]{8})|(18[0-9][0-9]{8})$/
  if (!phoneReg.test(str)) {
    return false
  } else {
    return true
  }
}
