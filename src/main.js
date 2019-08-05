import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import './styles/element-variables.scss'
// import 'element-ui/lib/theme-chalk/index.css'
import * as filters from '@/filters'
import initialize from '@/initialize'
import '@/utils/ui.config.js'

import moment from 'moment'

Vue.prototype.$moment = moment;

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission' // permission control
import '@/styles/ele-btn-primary.scss'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.directive('has', {
  // inserted
  // bind
  inserted: function (el, binding) {
    if (!Vue.prototype.$_has(binding.value)) {
      // console.log('binding.value', binding.value)
      // console.log('el', el)
      // console.log('el.parentNode', el.parentNode)
      el.parentNode && el.parentNode.removeChild(el)
      // el.style.display = 'none'
    }
  }
})

Vue.prototype.$_has = function (val) {
  const hasPermission = store.state.btns.some(role => {
    return val.includes(role)
  })
  return hasPermission
}


Vue.use(ElementUI)

Vue.config.productionTip = false
initialize()


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
