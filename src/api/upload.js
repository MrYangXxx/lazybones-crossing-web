import request from '@/utils/request'

export function addFile(data) {
  return request({
    url: '/upload',
    method: 'post',
    data
  })
}

export function deleteFile(data) {
  return request({
    url: '/upload/remove',
    method: 'post',
    data
  })
}
