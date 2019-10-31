import Vue from 'vue' //引入vue
import Vuex from 'vuex'  //引入vuex

//使用vuex
Vue.use(Vuex);

//创建vuex实例
const store = new Vuex.Store({
  state:{
    token: ''
  }
})

export default store  //导出store
