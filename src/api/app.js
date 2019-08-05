
import request from '@/utils/request'
import Config from '@/config'

// http://192.168.1.6:8081/dictionary-server/dictionary/findDictionaryByParentValue?parentValue=project_typeid&sysCode=project_manage
export const findDictionaryByParentValue = (params) => {
  return request({
    method: 'get',
    url: '/api/dictionary-server/dictionary/findDictionaryByParentValue',
    params
  })
}

// iscSso/getMenu 

export const getMenu = (params) => {
  return request({
    url: `${Config.BACKEND_URL_PROJECT_INFO}/iscSso/getMenu`,
    // url: 'http://192.168.5.236/project-info-manage-server/iscSso/getMenu',
    params
  })
}

export const logOut = () => {
  return request({
    method: 'get',
    url: Config.BACKEND_URL_PROJECT_MICROAPP + '/iscSso/loginOut'
  })
}

export const getUser = () => {
  return request({
    method: 'get',
    url: Config.BACKEND_URL_PROJECT_INFO + '/iscSso/getUser'
  })
}


