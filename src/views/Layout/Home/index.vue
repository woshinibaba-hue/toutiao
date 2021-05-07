<template>
  <div class="home-container">
    <!-- 导航栏按钮区域 -->
    <van-nav-bar>
      <van-button slot="title" class="search-btn" icon="search" round
        >搜索</van-button>
    </van-nav-bar>
    <!-- 文章频道列表 -->
    <van-tabs v-model="active">
      <van-tab v-for="item in userChannels" :key="item.id" :title="item.name">
        <ArticleList :channel='item' class="article-list"/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getChannels } from '../../../api/user'
import ArticleList from './components/article-list'
export default {
  data () {
    return {
      active: 0,
      userChannels: [] // 用户频道信息
    }
  },
  components: { ArticleList },
  created () {
    this.getUserChannel()
  },
  methods: {
    // 获取用户频道信息
    async getUserChannel () {
      const { data } = await getChannels()
      this.userChannels = data.channels
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
  }
  /deep/.van-tabs__content {
  margin-top: 90px;
  margin-bottom: 50px;
}
}
</style>
