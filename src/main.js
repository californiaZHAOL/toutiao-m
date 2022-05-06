import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 导入动态设置rem基准值的包
import 'amfe-flexible'
// 加载全局样式 里面包含了图标样式
import '@/styles/index.less'
// 加载dayjs
import '@/utils/dayjs'

// 注册vant
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
