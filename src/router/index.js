/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import store from '../store/index'
import Layout from '@/views/Layout.vue'
// 引入loading的相关配置
import gloLoading from '../utils/loading/loading' // loading组件的简单封装
import {
  routerLoading
} from '../utils/loading/index' // 全局的页面跳转loading是否启用

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

/**
 * 静态路由
 */
export const constantRouterMap = [{
  path: '/login',
  component: Login
},
{
  path: '/',
  component: Layout,
  name: '首页',
  redirect: '/home',
  children: []
}
]
export const createRouter = () => new VueRouter({
  routes: constantRouterMap
})
// 重置上一次的matcher,用户退出后不刷新页面，重置router里的routes
const router = createRouter()
router.beforeEach((to, from, next) => {
  routerLoading ? gloLoading.loadingShow() : '' // 如果全局启用页面跳转则加载loading
  if (to.path === '/login') {
    next()
  } else {
    const hasRoles = store.state.addRoutes
    if (store.state.token && hasRoles.length <= 0) {
      const menus = JSON.parse(sessionStorage.getItem('menus'))
      store.commit('setMenus', menus)
      next({
        ...to,
        replace: true
      })
    } else if (store.state.token && hasRoles.length > 0) {
      next()
    } else {
      next('/login')
    }
  }
  routerLoading ? gloLoading.loadingHide() : ''// 关闭loading层
})
router.$addRoutes = (params) => {
  router.matcher = new VueRouter({
    mode: 'hash'
  }).matcher
  router.addRoutes(params)
}
export default router
