import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import ComboBox from '@/components/Comb0box'
import ZxSearch from '@/components/ZxSearch'

// 获得token加入请求头
// element-ui文件上传用的是自带的请求库,axios拦截器无法拦截
import { getToken } from '@/utils/auth'

const token = getToken()
Vue.mixin({
  computed: {
    uploadUrl() {
      return 'http://www.bagorders.com/api/admin/image_upload'
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ` + token
      }
    }
  }
})
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.component('combo-box', ComboBox)
Vue.component('zx-search', ZxSearch)

Vue.config.productionTip = false
import utils from '@/utils/utils.js'
Vue.prototype.$api = utils
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
