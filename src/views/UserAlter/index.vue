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
      :value="user.gender ? '女' : '男'"
      @click="isGenderShow = true"
    />
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
      @click="isBirthdayShow = true"
    />

    <!-- 修改昵称弹出层 -->
    <van-popup
      v-model="isAlterShow"
      position="right"
      style="height : 100%"
    >
  <!--  //!  不使用 v-model 写法   :userName='user.name'   @update-name='user.name = $event' -->
  <!-- //!   如果以后需要向子组件传递参数，并且子组件需要对参数进行修改，那么就可以使用 v-model  -->
  <!-- //!  组件中使用  v-model  相当于写了   默认绑定的是  value :value='this.name'  默认监听的是 input 事件  @input='user.name = $event'
      //!  本质上还是 父子组件通信，仅仅只是简化了父子组件通信的写法  -->
  <!-- // !  v-model 只能在同一组件下使用一次 如果需要绑定多个那么就可以使用   .sync修饰符 -->
  <!-- //! .sync 语法   :name.sync = 'user.name'   相当于写了  :name = 'user.name'  @update:name = 'user.name = $event'   -->
  <!-- //!  子组件监听  this.$emit('update:name', 123)  此外子组件也需要在 props 进行接收   update 这个是固定的写法 : 后面是绑定的属性名称-->
      <UpdateName
        v-model="user.name"
        @close='isAlterShow = false'
        v-if="isAlterShow"
      />
    </van-popup>

    <!-- 修改性别弹出层 -->
    <van-popup
      v-model="isGenderShow"
      position="bottom"
      round
    >
      <UpdateGender
        @close='isGenderShow = false'
        v-model="user.gender"
      />
    </van-popup>

    <!-- 修改生日弹出层 -->
    <van-popup
      v-model="isBirthdayShow"
      position="bottom"
      round
    >
    <UpdateBirthday
      v-model="user.birthday"
      @close='isBirthdayShow = false'
    />
    </van-popup>
  </div>
</template>

<script>
import { getUserInfo } from '../../api/user'

import UpdateName from './components/UpdateName'
import UpdateGender from './components/UpdateGender'
import UpdateBirthday from './components/UpdateBirthday'
export default {
  data () {
    return {
      // 控制修改昵称弹出框
      isAlterShow: false,
      isGenderShow: false, // 控制性别修改弹出层
      isBirthdayShow: false, // 控制生日修改弹出层
      user: {} // 用户信息
    }
  },
  created () {
    this.getUserInfo()
  },
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday
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
  background-color: #f5f7f9;
}
</style>
