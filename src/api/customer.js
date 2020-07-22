import request from '@/utils/request'

// 企业客户 列表
export function customs(params) {
    return request({
        url: '/customs',
        method: 'get',
        params
    })
}

// 联系人列表
export function custom_linkers(params) {
    return request({
        url: '/custom_linkers',
        method: 'get',
        params
    })
}

// 联系人增加
export function custom_linkers_add(data) {
    return request({
        url: '/custom_linkers',
        method: 'post',
        data
    })
}

// 联系人删除
export function custom_linkers_del(id) {
    return request({
        url: '/custom_linkers/'+id,
        method: 'DELETE'
    })
}

// 客户修改
export function customs_put(data,id) {
    return request({
        url: '/customs/'+ id,
        method: 'put',
        data
    })
}

// 客户添加
export function customs_add(data) {
    return request({
        url: '/customs',
        method: 'post',
        data
    })
}


// 客户删除
export function customs_del(id) {
    return request({
        url: '/customs/'+id,
        method: 'DELETE'
    })
}
