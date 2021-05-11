// 获取评论相关的模块

import request from '../utils/request'

// 获取新闻评论列表信息
export const getComments = params => {
  return request({
    url: '/app/v1_0/comments',
    params
  })
}

// 点赞评论
export const addLike = target => {
  return request({
    url: '/app/v1_0/comment/likings',
    data: {
      target // 评论id
    },
    method: 'POST'
  })
}

// 取消点赞评论
export const deleteLike = commentId => {
  return request({
    url: `/app/v1_0/comment/likings/${commentId}`,
    method: 'DELETE'
  })
}
