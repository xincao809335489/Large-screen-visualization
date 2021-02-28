import request from '../utils/request'
/**
 * POST 方法 与 GET方法  区别
 *
 * post==> data: obj
 * get==>params: obj
 *
 */
// post接口
export function login (obj) {
  return request({
    url: '/login',
    method: 'post',
    data: obj
  })
}
// 获取表格列表
export function userLists (obj) {
  return request({
    url: '/lists',
    method: 'post',
    data: obj
  })
}
// 批量删除表格信息
export function deleteAll (obj) {
  return request({
    url: '/deleteAllData',
    method: 'post',
    data: obj
  })
}
// 编辑表格信息
export function editInfo (obj) {
  return request({
    url: '/editData',
    method: 'post',
    data: obj
  })
}
// 删除单条表格信息
export function deleteInfo (obj) {
  return request({
    url: '/delData',
    method: 'post',
    data: obj
  })
}

// 新增单条表格信息
export function addInfo (obj) {
  return request({
    url: '/handleAddData',
    method: 'post',
    data: obj
  })
}

// get
export function menus () {
  return request({
    url: '/routers',
    method: 'get'
  })
}
// 北京天气指数api
export function airQualities () {
  return request({
    url: '/quality',
    method: 'get'
  })
}
// 获取数据分类
export function categories () {
  return request({
    url: '/category',
    method: 'get'
  })
}
// 获取产品管理列表数据
export function products () {
  return request({
    url: '/product',
    method: 'get'
  })
}

// 新增产品管理列表数据
export function addShop (obj) {
  return request({
    url: '/addShop',
    method: 'post',
    data: obj
  })
}
// 删除对应tag的数据
export function deleteShopTag (obj) {
  return request({
    url: '/deleteTag',
    method: 'post',
    data: obj
  })
}
