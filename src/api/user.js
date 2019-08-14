import request from '@/utils/request'

export function login(data) {
  data.verify = 'Baas1234'
  return request({
    url: '/passport/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/check-info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/passport/logout',
    method: 'get'
  })
}

export function changePsw(data) {
  return request({
    url: '/admin/user/change-psw',
    method: 'post',
    data
  })
}

export function changeBanTime(data) {
  return request({
    url: '/admin/user/ban-time',
    method: 'post',
    data
  })
}

export function changeInfo(data) {
  return request({
    url: '/admin/user/update',
    method: 'post',
    data
  })
}
