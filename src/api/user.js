import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function getUsers(data) {
  return request({
    url: '/user/all',
    method: 'post',
    data
  })
}

export function addUser(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

export function updateUser(id, data) {
  return request({
    url: `/user/id/${id}`,
    method: 'put',
    data
  })
}

export function deleteUser(id) {
  return request({
    url: `/user/id/${id}`,
    method: 'delete'
  })
}

export function setRole(data) {
  return request({
    url: '/user/setRole',
    method: 'post',
    data
  })
}

export function getRole(data) {
  return request({
    url: '/user/role',
    method: 'post',
    data
  })
}
