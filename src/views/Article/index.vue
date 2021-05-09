// ! 文章详情模块

<template>
  <div class="article-wrap">
    <van-nav-bar title="文章详情" left-arrow @click-left="$router.back()" />
    <h1 class="title">{{aryicleDetail.title}}</h1>
    <van-cell center>
      <van-image
        class="avatar"
        slot="icon"
        round
        fit='cover'
        :src="aryicleDetail && aryicleDetail.aut_photo"
      />
      <div slot="title" class="name">{{aryicleDetail.aut_name}}</div>
      <div slot="label" class="pubDate">{{aryicleDetail.pubdate | relativeTime}}</div>
      <van-button
        class="concern-btn"
        :type="aryicleDetail.is_followed ? 'warning' : 'info'"
        size="small"
        :icon='aryicleDetail.is_followed ? "" : "plus"'
        round
      >{{aryicleDetail.is_followed ? '已关注' : '关注'}}</van-button>
    </van-cell>
    <div class="markdown-body" v-html="aryicleDetail.content"></div>
  </div>
</template>

<script>
import '../../styles/mackdown.css'

import { getArticleDetail } from '../../api/article'
export default {
  props: {
    // 通过动态路由映射过来的 props 参数
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      aryicleDetail: {} // 文章详情数据
    }
  },
  created () {
    this.getArticle()
  },
  methods: {
    // 获取文章详情
    async getArticle () {
      const { data } = await getArticleDetail(this.articleId)
      this.aryicleDetail = data
    }
  }
}
</script>

<style lang="less" scoped>
.article-wrap {
  .title {
    font-size: 18px;
    color: #3a3a3a;
    background-color: #fff;
    padding: 12px;
    margin: 0;
  }
  .van-cell {
    .avatar {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
    .name {
      font-size: 14px;
      color: #333;
    }
    .pubDate {
      font-size: 12px;
    }
    .concern-btn {
      width: 85px;
      height: 29px;
      .van-button__text {
        font-size: 14px;
      }
      .van-icon-puls {
        font-size: 14px;
      }
    }
  }
  .markdown-body {
    padding: 14px;
    background-color: #fff;
  }
}
</style>
