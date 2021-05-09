// ! 文章列表模块

<template>
  <van-cell
    class="article-item"
    :to="{
      name : 'Article',
      params : {
        articleId: article.art_id
      }
    }"
  >
    <div class="title van-multi-ellipsis--l3" slot="title">{{ article.title }}</div>
    <div slot="label">
      <div class="cover-wrap" v-if="article.cover.images.length === 3">
        <van-image
          fit='cover'
          v-for="(item,i) in article.cover.images" :key="i"
          :src="item"
        />
      </div>
      <div class="article-text" :class="{'textTop' : article.cover.images.length === 1}">
        <span class="name">{{article.aut_name}}</span>
        <span class="comm_count">{{article.comm_count}}条评论</span>
        <span class="pubdate">{{article.pubdate | relativeTime}}</span>
      </div>
    </div>
    <van-image
      fit='cover'
      class="right-cover"
      v-if="article.cover.images.length === 1"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  props: {
    // 接受的文章列表数据
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
  .article-item {
    .title {
      font-size: 16px;
      color: #3a3a3a;
    }
    .cover-wrap {
      display: flex;
      padding: 15px 0;
      .van-image {
        flex: 1;
        width: 100%;
        height: 74px;
        &:not(:last-child) {
          padding-right: 5px;
        }
      }
    }
    .article-text {
      .comm_count {
        padding: 0 12px;
      }
    }
    /deep/.van-cell__value {
      flex: unset;
      margin-left: 12px;
    }
    .right-cover {
      width: 117px;
      height: 74px;
    }
  }
  .textTop {
    padding-top: 30px;
  }
</style>
