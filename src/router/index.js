import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/pages/Login'
import Sign from '@/pages/Sign'
import Information from '@/pages/Information'
import Home from '@/pages/Home'
import {getCookie} from '../util/utils'
import store from '../vuex/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {requireAuth: false}
    },
    {
      path: '/Sign',
      name: 'Sign',
      component: Sign,
      meta: {requireAuth: false}
    },
    {
      path: '/Information',
      name: 'Information',
      component: Information,
      meta: {requireAuth: true}
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {requireAuth: true}
    },
    {path: '*', redirect: '/Login'}
  ]
})
// 登录控制
router.beforeEach((to, from, next) => {
  if (to.name === 'Login') {
    localStorage.clear('vuex-along')
    store.dispatch('changeLocationIdx', 0)
  }
  if (to.meta.requireAuth) {
    if (getCookie('btwccy_cookie')) {
      next()
    } else {
      localStorage.clear()
      next({
        path: '/Login'
      })
    }
  } else {
    next()
  }
})
export default router
