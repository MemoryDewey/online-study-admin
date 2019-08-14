import request from '@/utils/request'

export function getProjectApply() {
  return request({
    url: '/project/query/getCreateRecord',
    method: 'get'
  })
}
export function getUserInfo(data) {
  return request({
    url: '/admin/user',
    method: 'post',
    data
  })
}
export function getIndex() {
  return request({
    url: '/admin',
    type: 'get'
  })
}
