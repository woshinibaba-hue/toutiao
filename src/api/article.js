// 新闻相关请求

import request from '../utils/request'

// 获取新闻列表信息
export const getArticleList = params => {
  return request({
    url: '/app/v1_1/articles',
    params
  })
}

// 获取新闻文章详情
export const getArticleDetail = id => {
  return request({
    url: `/app/v1_0/articles/${id}`
  })
}
