import router from './router'

// 遍历后台返回的路由列表，处理成我们需要的格式，这里的处理是一种理想化状态，非理想化状态的处理，代码多多了
// 有时候后台返回的数据并不会有明确的父子级路由嵌套关系，就只是一个一维数组，我们要根据我们的匹配规则，将其处理成想要的格式
// 这里的 arr 其实就是登录成
const loadView = (viewPath) => {
  // 用字符串模板实现动态 import 从而实现路由懒加载
  return () => import(`@/views/${viewPath}.vue`)
}
export const getAsyncRoutes = arr => {
  // const newArr = []
  arr.forEach(item => {
    if (item.component) {
      item.component = loadView(item.component)
    }
    if (item.children) {
      // getAsyncRoutes(item.children)
      item.redirect = item.children[0].path
      getAsyncRoutes(item.children)
      // newArr = newArr.concat(result)
    }
  })
  return arr
}

export const setAsyncRoutes = menu => {
  const _menu = getAsyncRoutes(menu)
  const allMenus = _menu.filter((item, index) => index !== _menu.length - 1)
  const lastMenu = _menu[_menu.length - 1]
  router.options.routes[1].children = [...allMenus]
  const errorRoute = {
    path: '*',
    name: '404',
    component: loadView('NotFound')
  }
  router.options.routes.push(lastMenu, errorRoute)
  router.$addRoutes(router.options.routes)
  console.log(router.options.routes)
}
