import router from './router'

// 遍历后台返回的路由列表，处理成我们需要的格式，这里的处理是一种理想化状态，非理想化状态的处理，代码多多了
// 有时候后台返回的数据并不会有明确的父子级路由嵌套关系，就只是一个一维数组，我们要根据我们的匹配规则，将其处理成想要的格式
// 这里的 arr 其实就是登录成
const loadView = (viewPath) => {
  // 用字符串模板实现动态 import 从而实现路由懒加载
  return () => import(`@/views/${viewPath}.vue`)
}
export const getAsyncRoutes = arr => {
  arr.forEach(item => {
    if (item.children) {
      item.children.forEach(child => {
        child.component = loadView(child.component)
      })
      router.options.routes[3].children = [...item.children]
    } else {
      item.component = loadView(item.component)
      if (item.id === 0) {
        router.options.routes[1].children.push(item)
      } else if (item.id === 1) {
        router.options.routes[2].children.push(item)
      } else if (item.id === 3) {
        router.options.routes[4].children.push(item)
      }
    }
  })
}

export const setAsyncRoutes = menu => {
  getAsyncRoutes(menu)
  const errorRoute = {
    path: '*',
    name: '404',
    component: loadView('NotFound')
  }
  router.options.routes.push(errorRoute)
  router.$addRoutes(router.options.routes)
  console.log(router.options.routes)
}
