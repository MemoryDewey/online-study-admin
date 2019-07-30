import request from '@/utils/request'

export function getSystem() {
  return request({
    url: '/course/admin/course-system',
    method: 'get'
  })
}

export function getSystemInfo() {
  return request({
    url: '/course/list/system',
    method: 'get'
  })
}

export function updateSystem(data) {
  return request({
    url: '/course/admin/update-system',
    method: 'post',
    data
  })
}

export function addSystem(data) {
  return request({
    url: '/course/admin/add-system',
    method: 'post',
    data
  })
}

export function getType() {
  return request({
    url: '/course/admin/course-type',
    method: 'get'
  })
}

export function updateType(data) {
  return request({
    url: '/course/admin/update-type',
    method: 'post',
    data
  })
}

export function addType(data) {
  return request({
    url: '/course/admin/add-type',
    method: 'post',
    data
  })
}
