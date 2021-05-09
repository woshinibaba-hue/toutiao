import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/Layout/Home')
      },
      {
        path: 'qs',
        name: 'qs',
        component: () => import('@/views/Layout/Qs')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/Layout/Video')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/Layout/My')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  }
]

const router = new VueRouter({
  routes
})

export default router
