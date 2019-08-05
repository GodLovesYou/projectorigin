import request from '@/utils/request'

export const getUser = () => {
  return request({
    method: 'get',
    url: '/business-operate-server/iscSso/getUser'
  })
}


