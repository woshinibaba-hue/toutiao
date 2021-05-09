// 获取频道列表相关数据
import request from '../utils/request'

// 获取全部频道信息
export const getAllChannels = () => {
  return request({
    url: '/app/v1_0/channels',
    method: 'GET'
  })
}

// 添加用户频道信息
export const addUserChannel = data => {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'PATCH',
    data
  })
}

// 添加用户频道信息
export const deleteUserChannel = channelId => {
  return request({
    url: `/app/v1_0/user/channels/${channelId}`,
    method: 'DELETE'
  })
}
