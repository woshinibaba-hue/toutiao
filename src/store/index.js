import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '../utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户登录信息
    userInfo: getItem('userInfo')
    // userInfo: JSON.parse(window.localStorage.getItem('userInfo'))
  },
  mutations: {
    setUserInfo (state, data) {
      state.userInfo = data
      // 将用户登录信息保存至本地存储当中，为了持久化数据, 因为本地存储只能存储字符串，所以需要转换为字符串
      setItem('userInfo', data)
      // window.localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    }
  },
  actions: {
  },
  modules: {
  }
})
