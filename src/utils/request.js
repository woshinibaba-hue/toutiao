// 请求模块
import axios from 'axios'

import jsonBig from 'json-bigint'

// 导入store
import store from '../store/index'

import { Toast } from 'vant'

import router from '../router'

// 创建axios实例，用于刷新用户 token
const refreshTokenReq = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations'
})

// 创建axios实例对象
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',

  // transformResponse 允许自定义原始的响应数据（字符串）
  transformResponse: [function (data) {
    try {
      // 如果转换成功则返回转换的数据结果
      return jsonBig.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return {
        data
      }
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(config => {
  const { userInfo } = store.state
  if (userInfo) {
    config.headers.Authorization = `Bearer ${userInfo.token}`
  }
  return config
}, (err) => {
  console.log(err)
})

// 响应拦截器
request.interceptors.response.use(config => config.data,
  // 在此处统一处理响应错误
  async err => {
    console.dir(err)
    const status = err.response.status
    if (status === 400) {
      // 客户端参数错误
      Toast.fail('请求参数错误')
    } else if (status === 401) {
      // token 失效
      const userInfoToken = store.state.userInfo
      if (!userInfoToken || !userInfoToken.refresh_token) {
        // 判断是否存在 refresh_token 如果不存在，直接跳转登录页面
        redirectLogin()
      } else {
        try {
          // 如果存在，就发送请求获取最新的token
          const { data } = await refreshTokenReq({
            headers: {
              Authorization: `Bearer ${store.state.userInfo.refresh_token}`
            },
            method: 'PUT'
          })
          // 将重新获取的 token 设置回 userInfoToken
          userInfoToken.token = data.data.token
          // 通过提交 mutations 来更新token
          store.commit('setUserInfo', userInfoToken)
          // 此处需要重新调用 request 发送请求，因为此时token已经更新为最新的了，就上次失败的config作为请求参数传递
          return request(err.config)
        } catch (error) {
          // 此处就说明 refresh_token 已经失效了，那么需要重新登录了
          redirectLogin()
        }
      }
    } else if (status === 403) {
      // 没有权限
      Toast.fail('没有权限')
    } else if (status >= 500) {
      // 服务器端异常
      Toast.fail('服务器端异常，请稍后重试')
    }
  }
)

// 跳转至登录也
function redirectLogin () {
  const currentPath = router.currentRoute.fullPath
  router.replace(`/login?redirect=${currentPath}`)
}

// 导出
export default request
