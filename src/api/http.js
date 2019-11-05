// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
import { Loading, Message } from 'element-ui'
import qs from 'qs'
import router from 'vue-router'

//axios配置
axios.defaults.timeout = 50000  //设置接口响应时间
//公共接口url
axios.defaults.baseURL = 'http://47.97.214.92:8080/CloudServer'

// http请求拦截器
var loadinginstace
axios.interceptors.request.use(config => {
  // element ui Loading方法
  loadinginstace = Loading.service({ fullscreen: true })
  return config
}, error => {
  Message.error({
    message: '加载超时'
  })
  return Promise.reject(error)
})

// http响应拦截器
axios.interceptors.response.use(config => {
  // 响应成功关闭loading
  loadinginstace.close()
  return config
}, error => {
  loadinginstace.close()
  Message.error({
    message: '加载失败'
  })
  return Promise.reject(error)
})

export default axios
