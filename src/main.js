import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 按需引入elementui组件
import './plugins/element.js'
// 引入基本样式文件
import '../src/assets/css/index.less'
// 引入动态设置的路由router
import './promission.js'
// 引入echarts
import echarts from 'echarts'
// 引入dataV
import dataV from '@jiaminghi/data-view'
// 引入swiper轮播图
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
Vue.use(VueAwesomeSwiper /* { default options with global component } */)
// 将自动注册所有组件为全局组件
Vue.prototype.$echarts = echarts
Vue.use(dataV)
Vue.config.productionTip = false
export const crumbList = data => {
  const crumbData = []
  data.forEach(item => {
    const path = item.path
    switch (path) {
      case '/login':
        item.name = '登录'
        break
      case '/production':
        item.name = '产品管理'
        break
      case '/home':
        item.name = '根首页'
        break
      case '':
        item.name = '首页'
        break
      case '/echarts':
        item.name = '大屏可视化'
        break
      case '/user':
        item.name = '用户列表'
        break
      case '/product':
        item.name = '产品管理'
        break
      case '/product/proList':
        item.name = '产品列表'
        break
      case '/product/proCategories':
        item.name = '产品分类'
        break
      default:
        item.name = '首页'
    }
    crumbData.push(item)
  })
  const isExit = crumbData.some(item => {
    if (item.name === '根首页') {
      return true
    }
  })
  if (isExit) {
    const index = crumbData.findIndex(item => item.name === '根首页')
    crumbData.splice(index, 1)
  }
  return crumbData
}
router.afterEach((to, from, next) => {
  var routerList = to.matched
  console.log(routerList)
  var crumbData = crumbList(routerList)
  store.commit('setCrumbList', crumbData)
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
