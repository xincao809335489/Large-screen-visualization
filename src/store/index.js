import Vue from 'vue'
import Vuex from 'vuex'
import { setAsyncRoutes } from '../promission.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem('token') || '',
    username: sessionStorage.getItem('username') || '',
    addRoutes: [], // 动态匹配的路由
    isCollapse: false, // 折叠菜单变量
    crumbList: [] // 顶部导航菜单
  },
  mutations: {
    setMenus (state, data) {
      sessionStorage.setItem('menus', JSON.stringify(data))
      setAsyncRoutes(data)
      // 将路由存储在 store 中
      state.addRoutes = data
    },
    setUsername (state, name) {
      state.username = name
      sessionStorage.setItem('username', name)
    },
    setToken (state, token) {
      state.token = token
      sessionStorage.setItem('token', token)
    },
    toggleCollapse (state) {
      state.isCollapse = !state.isCollapse
    },
    setCrumbList (state, list) {
      state.crumbList = list
    },
    deleteRouter (state, id) {
      state.crumbList.splice(id, 1)
    }
  },
  actions: {
  },
  modules: {
  }
})
