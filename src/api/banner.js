import request from '@/utils/request'

export function getBanner() {
  return request({
    url: '/course/list/banner',
    method: 'get'
  })
}

export function deleteBanner(data) {
  return request({
    url: '/admin/user/banner/delete',
    method: 'post',
    data
  })
}
