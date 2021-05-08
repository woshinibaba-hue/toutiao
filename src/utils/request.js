// 请求模块
import axios from 'axios'

// 导入store
import store from '../store/index'

// 创建axios实例对象
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
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
