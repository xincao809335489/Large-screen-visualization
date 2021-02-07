/* eslint-disable no-unused-expressions */
import axios from 'axios'
import store from '../store'
// 引入loading的相关配置
import gloLoading from './loading/loading' // loading组件的简单封装
import {
  apiLoading
} from './loading/index' // 全局loading是否启用
// 创建实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 1000
})

// 拦截器
service.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  apiLoading ? gloLoading.loadingShow() : '' // 全局loading是否启用
  config.headers['Content-Type'] = 'application/json;charset=UTF-8'
  config.headers.Accept = 'application/json'
  config.headers['Request-From'] = 'mobile'
  const token = store.state.token || null
  if (token) {
    config.headers.Token = token
  }
  return config
},
error => {
  return Promise.reject(error)
}
)

// 响应拦截器
service.interceptors.response.use(response => {
  const res = response.data
  // 届时根据后端返回success或者code值判断
  apiLoading ? gloLoading.loadingHide() : '' // 全局loading是否启用
  return res
},
err => {
  // 响应错误
  apiLoading ? gloLoading.loadingHide() : ''
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求出错'
        break
      case 401:
        this.$message.warning({
          message: '授权失败，请重新登录'
        })
        store.commit('LOGIN_OUT')
        setTimeout(() => {
          window.location.reload()
        }, 1000)

        return
      case 403:
        err.message = '拒绝访问'
        break
      case 404:
        err.message = '请求错误,未找到该资源'
        break
      case 500:
        err.message = '服务器端出错'
        break
    }
  } else {
    err.message = '连接服务器失败'
  }
  this.$message.error({
    message: err.message
  })
  return Promise.reject(err.response)
})

export default service
