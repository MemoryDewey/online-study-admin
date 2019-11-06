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

export function getFeedback() {
  return request({
    url: '/admin/feedback',
    method: 'get'
  })
}

export function getFeedbackType() {
  return request({
    url: '/profile/personal/feedback-type',
    method: 'get'
  })
}

