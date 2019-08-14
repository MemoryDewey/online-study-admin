import request from '@/utils/request'

export function getSystem() {
  return request({
    url: '/admin/system',
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
    url: '/admin/system/update',
    method: 'post',
    data
  })
}

export function addSystem(data) {
  return request({
    url: '/admin/system/add',
    method: 'post',
    data
  })
}

export function getType() {
  return request({
    url: '/admin/type',
    method: 'get'
  })
}

export function updateType(data) {
  return request({
    url: '/admin/type/update',
    method: 'post',
    data
  })
}

export function addType(data) {
  return request({
    url: '/admin/type/add',
    method: 'post',
    data
  })
}
