// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
import { Loading, Message } from 'element-ui'

//创建axios实例
const Login = axios.create({
  baseURL: 'http://47.97.214.92:8080/CloudServer',
  timeout: 5000 //请求超时时间
})

// http请求拦截器
var loadinginstace
Login.interceptors.request.use(config => {
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
Login.interceptors.response.use(config => {// 响应成功关闭loading
  if(config.data.status === 200){
    /*if(store.state.token){
      //判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `token${store.state.token}`
    }*/
    Message.success({
      message: '登录成功',
      center: true
    })
   /* window.location.href='http://localhost:8080/content'*/
  }
  else if(config.data.status === 404)
    Message.warning({
      message: '用户名未注册或用户名与密码不匹配，请重新输入',
      center: true
    })
  else{}  //状态码不完整，待填充
   /* Message.error({
      message: '登录失败',
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

export default Login
