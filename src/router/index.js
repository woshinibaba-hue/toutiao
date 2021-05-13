import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'

import { Dialog } from 'vant'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
    meta: { requiredLogin: false } // 设置路由元信息，用于控制该页面的访问权限
  },
  {
    path: '/',
    component: () => import('@/views/Layout'),
    meta: { requiredLogin: false },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/Layout/Home'),
        meta: { requiredLogin: false }
      },
      {
        path: 'qs',
        name: 'qs',
        component: () => import('@/views/Layout/Qs'),
        meta: { requiredLogin: false }
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/Layout/Video'),
        meta: { requiredLogin: false }
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/Layout/My'),
        meta: { requiredLogin: false }
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/Search'),
    meta: { requiredLogin: true }
  },
  {
    path: '/article/:articleId',
    name: 'Article',
    component: () => import('@/views/Article'),
    // 设置为 true，就会将 动态路由参数映射到组件props属性当中
    props: true,
    meta: { requiredLogin: true }
  },
  {
    path: '/user/alter',
    name: 'UserAlter',
    component: () => import('@/views/UserAlter'),
    meta: { requiredLogin: false }
  },
  {
    path: '/user/cart',
    name: 'UserCart',
    component: () => import('@/views/User-cart'),
    meta: { requiredLogin: true }
  }
]

const router = new VueRouter({
  routes
})

// 添加全局路由前置导航守卫，用于控制路由访问权限
// ! to 表示去哪个页面  from 表示从哪个页面来   next 就是放行的意思
router.beforeEach((to, _, next) => {
  // 判断用户是否已经登录
  if (store.state.userInfo) {
    // 已经登录，直接放行, 并且阻止代码向下继续执行
    return next()
  }

  // 通过路由元信息判断，哪些页面需要登录才能访问
  if (to.meta.requiredLogin) {
    // 需要登录才能访问

    // 提示用户
    Dialog.confirm({
      title: '登录权限',
      message: '该页面需要登录才能访问，确认登录吗？'
    })
      .then(() => { // 当点击确认进入这里
        router.replace({
          name: 'login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      })
      .catch(() => { // 点击取消进入这里
        // 点击取消，直接中断路由访问
        // 这是直接中断当前路由导航
        next(false)
      })
  } else {
    // 不需要登录就可以访问，直接放行
    next()
  }
})

export default router
