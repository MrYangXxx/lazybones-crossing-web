import request from '@/utils/request'

export function addRecord(data) {
  return request({
    url: '/record',
    method: 'post',
    data
  })
}

export function listRecords(data) {
  return request({
    url: '/record/find',
    method: 'post',
    data
  })
}

export function myRecords(data) {
  return request({
    url: '/record/user',
    method: 'post',
    data
  })
}

export function sendFlower(data) {
  return request({
    url: '/record/flower',
    method: 'post',
    data
  })
}

export function sendEgg(data) {
  return request({
    url: '/record/egg',
    method: 'post',
    data
  })
}
