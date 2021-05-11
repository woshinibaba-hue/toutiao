<template>
  <div>
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell title="头像" is-link center>
      <van-image
        width="100"
        height="100"
        round
        fit="cover"
        :src="user.photo"
      />
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="user.name"
      @click="isAlterShow = true"
    />
    <van-cell
      title="性别"
      is-link
      value="男"
    />
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
    />

    <!-- 修改昵称弹出层 -->
    <van-popup
      v-model="isAlterShow"
      position="right"
    >
      <UpdateName
        @close='isAlterShow = false'
        :userName='user.name'
        @update-name='user.name = $event'
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserInfo } from '../../api/user'

import UpdateName from './components/UpdateName'
export default {
  data () {
    return {
      // 控制修改昵称弹出框
      isAlterShow: false,
      user: {} // 用户信息
    }
  },
  created () {
    this.getUserInfo()
  },
  components: {
    UpdateName
  },
  methods: {
    // 获取用户详细资料
    async getUserInfo () {
      const { data } = await getUserInfo()
      this.user = data
    }
  }
}
</script>

<style lang="less" scoped>
.van-popup {
  width: 100%;
  height: 100%;
  background-color: #f5f7f9;
}
</style>
