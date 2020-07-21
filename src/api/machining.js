import request from '@/utils/request'

// 企业客户 列表
export function manufacturers(params) {
    return request({
        url: '/manufacturers',
        method: 'get',
        params
    })
}

// 联系人列表
export function manufacturer_linkers (params) {
    return request({
        url: '/manufacturer_linkers',
        method: 'get',
        params
    })
}

// 联系人增加
export function manufacturer_linkers_add(data) {
    return request({
        url: '/manufacturer_linkers',
        method: 'post',
        data
    })
}

// 联系人删除
export function manufacturer_linkers_del(id) {
    return request({
        url: '/manufacturer_linkers/'+id,
        method: 'DELETE'
    })
}

// 客户修改
export function manufacturers_put(data,id) {
    return request({
        url: '/manufacturers/'+ id,
        method: 'put',
        data
    })
}

// 客户添加
export function manufacturers_add(data) {
    return request({
        url: '/manufacturers',
        method: 'post',
        data
    })
}


// 客户删除
export function manufacturers_del(id) {
    return request({
        url: '/manufacturers/'+id,
        method: 'DELETE'
    })
}
