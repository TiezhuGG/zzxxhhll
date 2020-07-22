import request from '@/utils/request'

// 企业客户 列表
export function logistics_suppliers(params) {
    return request({
        url: '/logistics_suppliers',
        method: 'get',
        params
    })
}

// 联系人列表
export function logistics_supplier_linkers (params) {
    return request({
        url: '/logistics_supplier_linkers',
        method: 'get',
        params
    })
}

// 联系人增加
export function logistics_supplier_linkers_add(data) {
    return request({
        url: '/logistics_supplier_linkers',
        method: 'post',
        data
    })
}

// 联系人删除
export function logistics_supplier_linkers_del(id) {
    return request({
        url: '/logistics_supplier_linkers/'+id,
        method: 'DELETE'
    })
}

// 客户修改
export function logistics_suppliers_put(data,id) {
    return request({
        url: '/logistics_suppliers/'+ id,
        method: 'put',
        data
    })
}

// 客户添加
export function logistics_suppliers_add(data) {
    return request({
        url: '/logistics_suppliers',
        method: 'post',
        data
    })
}


// 客户删除
export function logistics_suppliers_del(id) {
    return request({
        url: '/logistics_suppliers/'+id,
        method: 'DELETE'
    })
}


