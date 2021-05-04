import axios from 'axios'
import Vue from 'vue'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 请求拦截器

// 响应拦截器

// 导出
export default request

// 挂载到vue原型上
Vue.prototype.$request = request
