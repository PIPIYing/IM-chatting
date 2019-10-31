import axios from 'axios'
import router from 'vue-router'

axios.defaults.baseURL = 'http://47.97.214.92:8080/CloudServer/user'

//设置请求拦截器
axios.interceptors.request.use(config =>{
  //在发送请求之前做些什么
  console.log("请求拦截")
  return config;
},error => {
  //在请求错误的时候做些什么
  console.log(error)
  return Promise.reject(error)
})

//设置响应拦截器
axios.interceptors.response.use(config =>{
  //在响应数据之前做些什么
  console.log("响应拦截")
  return config
},error =>{
  //在响应数据出错之前做些什么
  console.log(error)
  return Promise.reject(error)
})
