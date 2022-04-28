import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 配置自己的路由表
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    // 路由懒加载
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  routes
})

export default router
