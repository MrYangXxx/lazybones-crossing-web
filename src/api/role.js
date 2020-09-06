import request from '@/utils/request'

export function getRoles(data={}) {
  return request({
    url: '/role/all',
    method: 'post',
    data
  })
}

export function addRole(data) {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/role/id/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/role/id/${id}`,
    method: 'delete'
  })
}

export function setPermission(data) {
  return request({
    url: `/role/setPermission`,
    method: 'post',
    data
  })
}

export function getPermission(data) {
  return request({
    url: `/role/permission`,
    method: 'post',
    data
  })
}
