import ElementUI from 'element-ui'
import {
  loadingConfig
} from './index' // 全局引入一个基本的配置参数
let loading = null
// 显示loading
const loadingShow = () => {
  loading = ElementUI.Loading.service(loadingConfig)
}
// 隐藏loading
const loadingHide = () => {
  loading.close()
}

const loadingObj = {
  loadingShow,
  loadingHide
}

export default loadingObj
