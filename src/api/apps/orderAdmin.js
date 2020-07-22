/*
 * @Author: xiaoxin
 * @Date: 2020-07-22 09:32:24
 * @LastEditTime: 2020-07-22 10:18:40
 * @LastEditors: xiaoxin
 * @FilePath: /zxhl/src/api/apps/orderAdmin.js
 */
import request from '@/utils/request'
/**
 * @description: 订单管理列表
 * @param {number} limit -page_size
 * @return: object
 */
export function getOrders(params) {
  return request({
    url: '/order/custom_orders',
    method: 'get',
    params
  })
}
/**
 * @description: 删除订单
 * @param {number} id
 * @return: object
 */
export function deleteOrder(id) {
  return request({
    url: '/order/custom_orders/' + id,
    method: 'post'
  })
}
/**
 * @description: 新增订单
 * @param {string} order_status -订单状态
 * @param {string} order_sn -客户订单号码
 * @param {string} business_from -业务来源
 * @param {string} custom_code -客户代码
 * @param {string} custom_name -客户名称
 * @param {string} factory_order_sn -工厂订单号码
 * @param {string} consignment_date -交货日期
 * @param {string} consignment_address -	交货地点
 * @param {string} price_condition -价格条件
 * @param {string} pay_condition -付款条件
 * @param {string} money_type -货币类别
 * @param {string} total_price -合计金额
 * @param {number} number -合计数量
 * @param {string} remark -备注
 * @param {string} business_department -业务部门
 * @param {string} business_member -业务人员
 * @param {string} company_id -公司id
 * @param {string} admin_id -用户id
 * @param {string} creator -建档人员
 * @return: object
 */
export function addOrder(data) {
  return request({
    url: '/order/custom_orders',
    method: 'post',
    data
  })
}
/**
 * @description: 订单产品列表
 * @param {number} order_id -订单id
 * @return: object
 */
export function getProducts(params) {
  return request({
    url: '/admin/order/custom_order_produces',
    method: 'get',
    params
  })
}
/**
 * @description: 新建订单产品
 * @param {number} order_id -订单id
 * @param {Array} image -图片集
 * @param {string} custom_goods_num -客户货号
 * @param {string} style_name -款式名称
 * @param {number} size -尺码规格
 * @param {string} colour_name -配色名称
 * @param {number} colour_code -配色代码
 * @param {number} factory_goods_num - 工厂货号
 * @param {string} unit -计量单位
 * @param {number} number -数量
 * @param {number} single_price -单价
 * @param {number} money -金额
 * @param {string} remark -备注
 * @return: object
 */
export function addProduct(data) {
  data.image = JSON.stringify(data.image)
  return request({
    url: '/admin/order/custom_order_produces',
    method: 'post',
    data
  })
}
/**
 * @description: 删除订单产品
 * @param {number} id 
 * @return: object
 */
export function deleteProduct(id) {
  return request({
    url: '/order/custom_order_produces/' + id,
    method: 'delete'
  })
}
