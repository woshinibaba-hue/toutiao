import Vue from 'vue'
// 用于处理相对时间
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'

// 导入处理相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置处理相对时间插件
dayjs.extend(relativeTime)

// 配置中文语言包    全局使用
dayjs.locale('zh-cn')

// 创建一个处理相对时间的过滤器
Vue.filter('relativeTime', date => {
  // 获取当前时间指定时间的相对时间
  return dayjs().to(dayjs(date))
})
