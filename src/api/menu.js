import request from '@/utils/request'

export function addMenu(data) {
  return request({
    url: '/menu',
    method: 'post',
    data
  })
}

export function updateMenu(id, data) {
  return request({
    url: `/menu/id/${id}`,
    method: 'put',
    data
  })
}

export function deleteMenu(id) {
  return request({
    url: `/menu/id/${id}`,
    method: 'delete'
  })
}

export function getTree() {
  return request({
    url: `/menu/tree`,
    method: 'get'
  })
}

