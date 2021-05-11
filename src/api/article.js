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

// 获取新闻文章作者关注
export const addFollow = userId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

// 获取新闻文章作者取消关注
export const DeleteFollow = userId => {
  return request({
    url: `/app/v1_0/user/followings/${userId}`,
    method: 'DELETE'
  })
}

// 点赞作品
export const addLike = articleId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target: articleId
    }
  })
}

// 取消点赞作品
export const DeleteLike = articleId => {
  return request({
    url: `/app/v1_0/article/likings/${articleId}`,
    method: 'DELETE'
  })
}

// 收藏作品
export const addCollect = articleId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target: articleId
    }
  })
}

// 取消收藏作品
export const DeleteCollect = articleId => {
  return request({
    url: `/app/v1_0/article/collections/${articleId}`,
    method: 'DELETE'
  })
}

// 对文章进行评论
export const addComment = data => {
  return request({
    url: ' /app/v1_0/comments',
    method: 'POST',
    data
  })
}
