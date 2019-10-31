import Vue from 'vue'  //node_modules
import Router from 'vue-router'
import Login from '../components/login'   //自己编写的vue
import Content from '../components/container'
import Register from '../components/register'
import Repair from '../components/repair'

Vue.use(Router)  //运用组件

export default new Router({
  routes: [
    {
      path: '/',
      redirect:  '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/content',
      component: Content
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/repair',
      component: Repair
    }
  ],
  mode: "history"
})
