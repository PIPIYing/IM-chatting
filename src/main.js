import Vue from 'vue'
import App from './App'
import router from './router'
import Cookie from 'js-cookie'
/*import ElementUI, {Loading} from 'element-ui'*/
import ElementUI, {Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

//引用API和 axios 文件
/*import api from './api/index.js'*/
import VueAxios from 'vue-axios'
import axios from 'axios'
import qs from 'qs'    //json数据转化

axios.defaults.baseURL = "http://47.97.214.92:8080/CloudServer"

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.common['token'] = Cookie.get('token')

//将API方法绑定到全局
/*Vue.prototype.$api = api;*/
Vue.prototype.$axios = axios;
Vue.prototype.qs = qs;

Vue.use(VueAxios,axios)  //运用组件
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})


// 添加请求拦截器
/*var loadinginstace*/
axios.interceptors.request.use(config => {
// 在发送请求之前做些什么
//加载过渡
/*  loadinginstace = Loading.service({ fullscreen: true })*/
/*  if (Cookie.get('token') === undefined || Cookie.get('token') === "") {
    Cookie.set('token',"")
  }*/
/*  var token = Cookie.get('token')
  if(token === undefined || token === null) {
    //前端判断
    Cookie.set('token',"")
    Message.warning({
      message: '登录验证失败！请重新登录',
      center: true
    })  //无法排除登录和注册的请求
    this.$router.push('/login')
  }*/
const token = Cookie.get('token')
  token?config.headers.token = token:null  //token非空就赋值到 headers ;空就置空
  if(token === null || token === undefined){
    if(config.data.status === 401){
     Message.warning({
      message: '登录验证失败！请重新登录',
      center: true
     })
    router.replace('/login')}  //注册时token undefined
  }
  return config;
}, error => {
// 对请求错误做些什么
  return Promise.reject(error);
});

// http response 拦截器
axios.interceptors.response.use(
  response => {
/*    loadinginstace.close()*/
    return response;
},
  error => {
    return Promise.reject(error)
});
