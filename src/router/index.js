import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 配置自己的路由表
const routes = [
  {
    path: '/',
    // 路由懒加载
    component: () => import('@/views/layout'),
    // 四个子路由页面
    children: [
      // 默认子路由
      {
        path: '',
        component: () => import('@/views/home')
      },
      // {
      //   path: 'home',
      //   name: 'home',
      //   component: () => import('@/views/home')
      // },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    // 路由懒加载
    component: () => import('@/views/login')
  },
  {
    path: '/search',
    name: 'search',
    // 路由懒加载
    component: () => import('@/views/search')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    // 把路由参数映射到组件中
    props: true,
    // 路由懒加载
    component: () => import('@/views/article')
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    // 路由懒加载
    component: () => import('@/views/user-profile')
  }
]

const router = new VueRouter({
  routes
})

export default router
