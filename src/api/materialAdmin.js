import request from '@/utils/request'

// 企业客户 列表
export function materials (params) {
    return request({
        url: '/materials',
        method: 'get',
        params
    })
}

// 材料群组列表 列表
export function materialsTypeList (params) {
    return request({
        url: '/materials_group_configs',
        method: 'get',
        params
    })
}


// 材料群组 增加
export function materialsTypeadd(data) {
    return request({
        url: '/materials_group_configs',
        method: 'post',
        data
    })
}


// 材料群组 删除
export function materialsTypeadel(id) {
    return request({
        url: '/materials_group_configs/'+id,
        method: 'DELETE'
    })
}

// 材料群组 删除
export function materialsdel(id) {
    return request({
        url: '/materials/'+id,
        method: 'DELETE'
    })
}

// 材料 增加
export function materialsadd(data) {
    return request({
        url: '/materials',
        method: 'post',
        data
    })
}


// 获取材料计算公式 列表
export function getEquation (params) {
    return request({
        url: '/materials_equation_title',
        method: 'get',
        params
    })
}
