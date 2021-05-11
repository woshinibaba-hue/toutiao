// 用于处理用户相关请求
import request from '../utils/request'

// 用户登录请求
export const login = (data) => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data
  })
}

// 发送短信
export const send = (mobile) => {
  return request({
    url: `/app/v1_0/sms/codes/${mobile}`,
    method: 'get'
  })
}

// 获取用户信息
export const getCurrentUser = () => {
  return request({
    url: '/app/v1_0/user',
    method: 'get'
  })
}

// 获取用户频道信息
export const getChannels = () => {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'get'
  })
}

// 获取用户详细资料
export const getUserInfo = () => {
  return request({
    url: '/app/v1_0/user/profile'
  })
}

// 编辑用户个人资料
export const alterUserInfo = data => {
  return request({
    url: '/app/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}
