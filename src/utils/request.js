// 请求模块
import axios from 'axios'

import jsonBig from 'json-bigint'

// 导入store
import store from '../store/index'

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
})

// 响应拦截器
request.interceptors.response.use(config => config.data)

// 导出
export default request
