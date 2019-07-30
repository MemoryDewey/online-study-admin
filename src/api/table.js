import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}
export function getProjectApply() {
  return request({
    url: '/project/query/getCreateRecord',
    method: 'get'
  })
}
export function getUserInfo(data) {
  return request({
    url: '/profile/admin/user',
    method: 'post',
    data
  })
}
export function getIndex() {
  return request({
    url: '/course/admin/get-index',
    type: 'get'
  })
}
