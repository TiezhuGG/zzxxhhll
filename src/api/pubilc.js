/*
 * @Author: xiaoxin
 * @Date: 2020-07-22 14:37:08
 * @LastEditTime: 2020-07-22 16:02:25
 * @LastEditors: xiaoxin
 * @FilePath: /zxhl/src/api/pubilc.js
 */ 
import request from '@/utils/request'
import store from '@/store'
// 上传图片
export function imageUpload(data) {
  data.append('company_id', store.getters.userinfo.default_company.id)
  console.log(data)
  return request({
      url: 'image_upload',
      method: 'post',
      headers: {"Content-Type": 'multipart/form-data'},
      data
  })
}