// 请求模块
import axios from 'axios'

import jsonBig from 'json-bigint'

// 导入store
import store from '../store/index'

import { Toast } from 'vant'

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
  err => {
    console.dir(err)
    const status = err.response.status
    if (status === 400) {
      // 客户端参数错误
      Toast.fail('请求参数错误')
    } else if (status === 401) {
      // token 错误
    } else if (status === 403) {
      // 没有权限
      Toast.fail('没有权限')
    } else if (status >= 500) {
      // 服务器端异常
      Toast.fail('服务器端异常，请稍后重试')
    }
  }
)

// 导出
export default request
