// 获取评论相关的模块

import request from '../utils/request'

// 获取新闻列表信息
export const getComments = params => {
  return request({
    url: '/app/v1_0/comments',
    params
  })
}
