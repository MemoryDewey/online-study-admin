import request from '@/utils/request'

export function accessApply(params) {
  return request({
    url: '/project/CreateRecord/agreeapply',
    method: 'get',
    params
  })
}

export function rejectApply(params) {
  return request({
    url: '/project/CreateRecord/rejectapply',
    method: 'get',
    params
  })
}
