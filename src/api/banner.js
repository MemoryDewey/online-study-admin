import request from '@/utils/request'

export function getBanner() {
  return request({
    url: '/course/list/banner',
    method: 'get'
  })
}

export function deleteBanner(params) {
  return request({
    url: '/admin/user/banner',
    method: 'delete',
    params
  })
}
