// ! 我的页面模块

<template>
  <div class="my-wrap">

    <!-- //! 登录状态下的头部 -->

    <van-cell-group class="user-info" v-if="userInfo">
      <van-cell center :border="false">
        <!-- //! 头像区域 -->
        <van-image
          class="avatar"
          slot="icon"
          fit="cover"
          lazy-load
          round
          :src="currentUser.photo"
        />
        <div slot="title" class="name">{{ currentUser.name }}</div>
        <van-button
          round
          size="mini"
          class="class-fy"
          to="/user/alter"
        >
          编辑资料
        </van-button>
      </van-cell>
      <van-grid :border="false">
        <van-grid-item text="头条" class="item">
          <span slot="icon">{{ currentUser.art_count }}</span>
        </van-grid-item>
        <van-grid-item text="关注">
          <span slot="icon">{{ currentUser.follow_count }}</span>
        </van-grid-item>
        <van-grid-item text="粉丝">
          <span slot="icon">{{ currentUser.fans_count }}</span>
        </van-grid-item>
        <van-grid-item text="获赞">
          <span slot="icon">{{ currentUser.like_count }}</span>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <!-- //! 未登录下的头部 -->

    <div class="not-login" v-else>
      <div class="img" @click="$router.push('/login?redirect=/my')">
        <img src="./img/未登录.png" alt="" />
      </div>
      <div class="text">
        <span>登录 / 注册</span>
      </div>
    </div>

    <van-grid :column-num="2" class="mb-4">
      <van-grid-item
        class="iconfont"
        icon-prefix="icon"
        icon="shoucang1"
        text="收藏"
      />
      <van-grid-item
        class="iconfont"
        icon-prefix="icon"
        icon="history"
        text="历史"
      />
    </van-grid>
    <van-cell title="消息通知" is-link to="/" />
    <van-cell title="小智同学" is-link to="/user/cart" class="mb-4" />
    <van-button block class="out-btn" v-if="userInfo" @click="outLogin"
      >退出登录</van-button
    >
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '../../../api/user'

export default {
  name: 'My',
  data () {
    return {
      currentUser: {} // 当前用户信息
    }
  },
  computed: {
    // 将vuex中的state状态，映射到组件内部
    ...mapState(['userInfo'])
  },
  created () {
    // 调用获取用户信息接口直接，需要进行判断
    // 当 userInfo 不为空时，也就是 userInfo 有token时，才需要去调用接口获取用户信息
    this.userInfo && this.getUserInfo()
  },
  methods: {
    // 点击退出登录
    outLogin () {
      this.$dialog
        .confirm({
          title: '退出登录',
          message: '您确定退出登录吗？'
        })
        .then(() => {
          // 点击确定进入then，取消进入catch
          this.$store.commit('setUserInfo', null)
          this.$toast('退出登录成功！！！')
        })
        .catch(() => {
          this.$toast('您取消了退出登录！！！')
        })
    },
    // 获取用户信息
    async getUserInfo () {
      const { data } = await getCurrentUser()
      this.currentUser = data
    }
  }
}
</script>
<style lang="less" scoped>
.my-wrap {
  .user-info {
    background: url("./img/banner.png") no-repeat;
    background-size: cover;
    .van-cell {
      background-color: unset;
      height: 115px;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 13px;
      }
      .name {
        color: #fff;
        font-size: 15px;
      }
      .class-fy {
        font-size: 10px;
        color: #666;
      }
    }
    .van-grid {
      color: #fff;
      font-size: 18px;
      .van-grid-item {
        /deep/ .van-grid-item__text {
          margin-top: 5px;
          color: #fff;
          font-size: 12px;
        }
      }
    }
    /deep/ .van-grid-item__content {
      background-color: transparent;
    }
  }
  .not-login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 180px;
    background: url("./img/banner.png") no-repeat;
    background-size: cover;
    .img {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 56px;
        height: 56px;
      }
    }
    .text {
      color: #fff;
      font-size: 16px;
      margin-top: 10px;
    }
  }
  /deep/.van-grid {
    .van-grid-item {
      height: 70px;
      .van-grid-item__icon {
        font-size: 20px;
      }
      .icon-shoucang1 {
        color: #eb5253;
      }
      .icon-history {
        color: #ffa023;
      }
      .van-grid-item__text {
        font-size: 13px;
        color: #333;
      }
    }
  }
  .out-btn {
    border: 0;
    color: #d86262;
  }
  .mb-4 {
    margin-bottom: 4px;
  }
}
</style>
