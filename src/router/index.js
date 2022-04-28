import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 配置自己的路由表
const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // }
]

const router = new VueRouter({
  routes
})

export default router
