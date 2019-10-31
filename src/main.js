import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

//引用API和 axios 文件
/*import api from './api/index.js'*/
import VueAxios from 'vue-axios'
import axios from 'axios'
import qs from 'qs'    //json数据转化

axios.defaults.baseURL = "http://47.97.214.92:8080/CloudServer"

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

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

