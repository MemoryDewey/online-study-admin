import request from '@/utils/request'

export function getCashIn(params) {
  return request({
    url: '/admin/user/cash/in',
    method: 'get',
    params
  })
}

export function OpCashIn(data) {
  return request({
    url: '/admin/user/cash/in',
    method: 'post',
    data
  })
}

export function getCashOut(params) {
  return request({
    url: '/admin/user/cash/out',
    method: 'get',
    params
  })
}

export function OpCashOut(data) {
  return request({
    url: '/admin/user/cash/out',
    method: 'post',
    data
  })
}
