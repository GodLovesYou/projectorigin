import axios from 'axios'
import { MessageBox, Message } from 'element-ui'

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.params = {
      ...config.params,
      t: new Date().getTime()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    // 导出接口返回的数据格式和别的不一样，另外做处理
    if (response.headers['content-type'] === 'application/vnd.ms-excel;charset=utf-8' && (response.config.url.indexOf('file/exportFile') !== -1 || response.config.url.indexOf("exportProjectMilepostExcel") !== -1 || response.config.url.indexOf("exportFile") !== -1)) {
      return res
    }
    if (!res.success) {
      if (res.errorMsg && res.errorMsg.indexOf('重复报错') !== -1) {
        res.errorMsg = res.errorMsg.replace('重复报错<br>', '')
        MessageBox.alert(
          res.errorMsg, '重复报错', {
            dangerouslyUseHTMLString: true
          }
        )
      } else {
        Message({
          message: res.errorMsg,
          type: 'error',
          duration: 2000
        })
      }
      return Promise.reject(res.errorMsg || `error`)
    }
    return res
  },
  error => {
    const err = error.response
    if (error.code === 'ECONNABORTED') {
      Message({
        message: '接口请求超时',
        type: 'error',
        duration: 2000
      })
      return Promise.reject({ message: '接口请求超时' })
    }

    if (!(err && err.status)) {
      err.message = '接口请求出错'
      Message({
        message: err.message,
        type: 'error',
        duration: 2000
      })
      return Promise.reject({ message: '接口请求出错' })
    }

    switch (err.status) {
      case 404:
        err.message = '接口地址不正确';
        break;
      case 400:
        err.message = '请求参数有误';
        break;
      case 401:
        err.message = '没有权限';
        break;
      case 500:
        err.message = '服务器异常';
        break;
      default:
        err.message = '请求出错'
    }

    Message({
      message: err.message,
      type: 'error',
      duration: 2000
    })
    return Promise.reject(err)
  }
)

export default service
