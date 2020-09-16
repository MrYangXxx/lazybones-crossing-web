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

export function updateUser(id, data) {
  return request({
    url: `/user/id/${id}`,
    method: 'put',
    data
  })
}

export function registry(data) {
  return request({
    url: `/user/registry`,
    method: 'post',
    data
  })
}

export function leaderboard(data) {
  return request({
    url: `/user/leaderboard`,
    method: 'post',
    data
  })
}
