// ! 首页模块

<template>
  <div class="home-container">
    <!-- 导航栏按钮区域 -->
    <van-nav-bar>
      <van-button slot="title" class="search-btn" icon="search" round
        >搜索</van-button>
    </van-nav-bar>
    <!-- 文章频道列表 -->
    <van-tabs v-model="active" swipeable animated>
      <van-tab v-for="item in userChannels" :key="item.id" :title="item.name">
        <ArticleList :channel='item' class="article-list"/>
      </van-tab>
      <!-- 由于图标按钮时固定定位，会脱离文档流，这样就导致会覆盖一部分内容，这时就可以使用一个占位的盒子，让这个盒子的宽度与图标宽度一致就可以解决了 -->
      <div slot="nav-right" class="placeholder"></div>
      <!-- 展开文章频道列表按钮 -->
      <div slot="nav-right" class="popup">
        <van-icon name="wap-nav" @click="isPopup = true" />
      </div>
    </van-tabs>

    <!-- 频道列表弹出层-->
    <van-popup
      closeable
      :overlay='false'
      v-model="isPopup"
      position="bottom"
      close-icon="close"
      close-icon-position="top-left"
      get-container="body"
      style="height: 100%">
      <!--
          //! 在原生事件中，$event是事件对象
          //! 在自定义事件中，$event是传递过来的数据
      -->
      <!-- 频道列表模块 -->
      <ChannelEdit
        :userChannels='userChannels'
        @close='isPopup = false'
        @toggle-channel='active = $event'
        :active='active' />
    </van-popup>
  </div>
</template>

<script>
import { getChannels } from '../../../api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '../../../utils/storage'
export default {
  data () {
    return {
      active: 0,
      userChannels: [], // 用户频道信息
      isPopup: true
    }
  },
  computed: {
    // 将vuex中的state状态映射到计算属性当中
    ...mapState(['userInfo'])
  },
  components: { ArticleList, ChannelEdit },
  created () {
    this.getUserChannel()
  },
  methods: {
    // 获取用户频道信息
    async getUserChannel () {
      let userChannel = []
      if (this.userInfo) {
        // 用户已登录
        const { data } = await getChannels()
        userChannel = data.channels
      } else {
        // 用户未已登录

        // 获取本地存储的频道信息
        const Stochannel = getItem('user-channel')
        // 判断本地存储是否存在频道信息
        if (Stochannel) {
          // 存在
          userChannel = Stochannel
        } else {
          // 不存在
          const { data } = await getChannels()
          userChannel = data.channels
        }
      }
      // 将获取的数据存入data当中
      this.userChannels = userChannel
    }
  }
}
</script>
<style lang="less" scoped>
.home-container {
  overflow: hidden;
  .van-nav-bar {
    position: fixed;
    left: 0;
    right: 0;
    /deep/.van-nav-bar__title {
      max-width: none;
    }
    .search-btn {
      width: 277px;
      height: 32px;
      background-color: #5babfb;
      border: 0;
      color: #fff;
      font-size: 13px;
      .van-icon {
        font-size: 16px;
      }
    }
  }
  /deep/.van-tabs__wrap {
    position: fixed;
    top: 45px;
    left: 0;
    right: 0;
    z-index: 1;
    .van-tabs__line {
      width: 15px;
      height: 3px;
      background-color: #3296fa;
      bottom: 20px;
    }
    .placeholder {
      width: 33px;
      // 由于tab栏默认给了flex布局，并且里面所有的元素已经平分了父元素的宽度，如果这个元素不想参与平分，可以设置 flex-shrink: 0; 就可以了
      flex-shrink: 0;
    }
    .popup {
      position: fixed;
      right: 0;
      height: 44px;
      width: 40px;
      background-color: rgba(255, 255, 255, .9);
      display: flex;
      justify-content: center;
      align-items: center;
      .van-icon-wap-nav {
        font-size: 24px;
      }
      &::before {
        content: '';
        background: url('./line.png') no-repeat;
        width: 1px;
        height: 40px;
        margin: 7px 5px 0 0;
      }
    }
  }
  /deep/.van-tabs__content {
    margin-top: 90px;
    margin-bottom: 50px;
  }
}
</style>
