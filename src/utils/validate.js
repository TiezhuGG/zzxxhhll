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
export function validMobile(str) {
  // 验证注册手机号
  const phoneReg = /^(13[0-9]{9})|(15[0-9][0-9]{8})|(18[0-9][0-9]{8})$/
  if (!phoneReg.test(str)) {
    return false
  } else {
    return true
  }
}

/**
 * @param {string} str
 */
export function validNumber(str) {
  console.log(str)
  for (let aa of str) {
    console.log(aa.value)
    if (parseFloat(aa.value).toString() == "NaN") {
      console.log('不是数字')
      return false;
    } else {
      console.log('是数字')
      return true;
    }
  }
  // 验证数字(验证码)
  // const numberReg = /^\d{6}$/
  // if (!numberReg.test(str)) {
  //   console.log('验证失败')
  //   console.log(numberReg.test(str))
  //   console.log(str)
  //   return false
  // } else {
  //   console.log('验证成功')
  //   console.log(numberReg.test(str))
  //   console.log(str)
  //   return true
  // }
}
