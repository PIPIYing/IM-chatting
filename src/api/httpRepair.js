// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
import { Loading, Message } from 'element-ui'

//创建axios实例
const Repair = axios.create({
  baseURL: 'http://47.97.214.92:8080/CloudServer',
  timeout: 5000 //请求超时时间
})

// http请求拦截器
var loadinginstace
Repair.interceptors.request.use(config => {
  // element ui Loading方法
  console.log("请求拦截")
  loadinginstace = Loading.service({ fullscreen: true })
  return config
}, error => {
  Message.error({
    message: '加载超时'
  })
  return Promise.reject(error)
})
// http响应拦截器
Repair.interceptors.response.use(config => {
  // 响应成功关闭loading
  console.log("响应拦截")
  if(config.data.status === 200){
    Message.success({
      message: '修改成功，将在3秒后为您返回首页',
      center: true
    })
    setTimeout(href,3000)
    function href(){
      window.location.href='http://localhost:8080'
    }
  }
  else if(config.data.status === 404)
    Message.warning({
      message: '旧用户或旧密码不存在',
      center: true
    })
  else{}  //状态码不完整，待填充
   /* Message.error({
      message: '修改失败',
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

export default Repair
