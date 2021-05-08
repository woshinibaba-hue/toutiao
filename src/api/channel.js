// 获取频道列表相关数据
import request from '../utils/request'

// 获取全部频道信息
export const getAllChannels = () => {
  return request({
    url: '/app/v1_0/channels',
    method: 'GET'
  })
}
