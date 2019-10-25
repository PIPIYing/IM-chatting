import axios from 'axios'

axios.defaults.baseURL = 'http://47.97.214.92:8080/CloudServer/user'

//设置请求拦截器
axios.interceptors.request.use(config =>{
  //可在这里加请求数据的动效loading
  console.log("请求拦截")
  return config;
},error => {
  console.log(error)
  return new Promise.reject(error)
})

//设置响应拦截器
axios.interceptors.response.use(config =>{
  //在这里取消请求数据的动效loading
  console.log("响应拦截")
  return config
},error =>{
  //在这里取消请求数据的动效loading
  console.log(error)
  return Promise.reject(error)
})
