// 请求模块
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 请求拦截器
request.interceptors.request.use(config => config)

// 响应拦截器
request.interceptors.response.use(config => config.data)

// 导出
export default request
