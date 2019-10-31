// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
import { Loading, Message } from 'element-ui'

//创建axios实例
const Register = axios.create({
  baseURL:'http://47.97.214.92:8080/CloudServer',
  timeout: 5000 //请求超时时间
})

// http请求拦截器
var loadinginstace
Register.interceptors.request.use(config => {
  loadinginstace = Loading.service({ fullscreen: true })
  return config
}, error => {
  Message.error({
    message: '加载超时'
  })
  return Promise.reject(error)
})
// http响应拦截器
Register.interceptors.response.use(config => {// 响应成功关闭loading
  if(config.data.status === 200){
    Message.success({
      message: '注册成功，将在3秒后为您返回登录页',
      center: true
    })
    setTimeout(href,3000)
    function href(){
      window.location.href='http://localhost:8080'
    }
  }

  else if(config.data.status === 401)
    Message.warning({
      message: '该用户名已被注册',
      center: true
    })
  else{}
    /*Message.error({
      message: '注册失败',
      center: true
    })*/
  loadinginstace.close()
  return config
}, error => {
  loadinginstace.close()
  Message.error({
    message: '加载失败'
  })
  return Promise.reject(error)
})

export default Register
