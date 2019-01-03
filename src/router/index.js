import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/pages/Login'
import Sign from '@/pages/Sign'
import Information from '@/pages/Information'
import Home from '@/pages/Home'

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
      meta: {requireAuth: false}
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {requireAuth: false}
    },
    {path: '*', redirect: '/Login'}
  ]
})
// 登录控制
router.beforeEach((to, from, next) => {
  next()
})
export default router
