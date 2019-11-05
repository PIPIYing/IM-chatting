import Vue from 'vue' //引入vue
import Vuex from 'vuex'  //引入vuex
/*import Cookies from 'js-cookie'   //引入cookies*/

//使用vuex
Vue.use(Vuex);

//创建vuex实例
const store = new Vuex.Store({
  state:{
    token: ''
  },
  mutations: {
    set_token(state,token) {
      state.token = token
      localStorage.token = token
      sessionStorage.token = token
    },
    del_token(state) {
      state.token = ''
      sessionStorage.removeItem('token')
    }
  }
})

export default store  //导出store
