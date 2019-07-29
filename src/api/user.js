import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/passport/admin-login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/passport/check-admin',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/passport/exit',
    method: 'post'
  })
}

export function changePsw(data) {
  return request({
    url: '/passport/admin/change-psw',
    method: 'post',
    data
  })
}

export function changeInfo(data) {
  return request({
    url: '/profile/admin/change-info',
    method: 'post',
    data
  })
}
