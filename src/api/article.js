// 新闻相关请求

import request from '../utils/request'

// 获取新闻列表信息
export const getArticleList = params => {
  return request({
    url: '/app/v1_1/articles',
    params
  })
}
