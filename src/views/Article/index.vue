// ! 文章详情模块

<template>
  <div class="article-wrap">
    <van-nav-bar title="文章详情" left-arrow @click-left="$router.back()" />

    <!-- 文章主体部分 -->
    <div class="article-details">
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
          :loading = 'isLoading'
          @click="onFollow"
        >{{aryicleDetail.is_followed ? '已关注' : '关注'}}</van-button>
      </van-cell>
      <div
        ref="article-concent"
        class="markdown-body"
        v-html="aryicleDetail.content"
      ></div>

      <van-divider>正文结束</van-divider>

      <!-- 评论区域 -->
      <CommentList :source='articleId' />
    </div>

    <!-- 底部区域 -->
    <van-tabbar>
      <van-tabbar-item>
        <van-button round @click="isCommentPopShow = true">写评论</van-button>
      </van-tabbar-item>
      <van-tabbar-item
        :icon="aryicleDetail.attitude === 1 ? 'good-job' : 'good-job-o'"
        :color="aryicleDetail.attitude === 1 ? 'orange' : '#777'"
        @click="onLike"
      ></van-tabbar-item>
      <van-tabbar-item icon="chat-o"  badge="99+"></van-tabbar-item>
      <van-tabbar-item
        :icon="aryicleDetail.is_collected ? 'star' : 'star-o'"
        color="#777"
        @click="onCollect"
      ></van-tabbar-item>
      <van-tabbar-item icon="share-o" color="#777"></van-tabbar-item>
    </van-tabbar>

    <!-- 弹出层部分 -->
    <van-popup v-model="isCommentPopShow" position="bottom">
      <PopComment />
    </van-popup>
  </div>
</template>

<script>
import '../../styles/mackdown.css'

import {
  getArticleDetail,
  addFollow,
  DeleteFollow,
  addLike,
  DeleteLike,
  addCollect,
  DeleteCollect
} from '../../api/article'

//  引入 ImagePreview 用于函数式调用预览图片
import { ImagePreview } from 'vant'

import CommentList from './components/CommentList'

import PopComment from './components/Pop-Comment'

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
      aryicleDetail: {}, // 文章详情数据
      isLoading: false, // 关注按钮loading状态
      isCommentPopShow: false // 控制评论弹出层
    }
  },
  created () {
    this.getArticle()
  },
  components: { CommentList, PopComment },
  methods: {
    // 获取文章详情
    async getArticle () {
      const { data } = await getArticleDetail(this.articleId)
      this.aryicleDetail = data

      // ! 由于vue的视图更新是异步操作，如果需要在更新完成之后，获取 Dom 节点的话，直接获取是无法获取成功的
      // ! 必须借助与 $nextTick 方法，该方法会在延迟到下次 dom 更新结束之后再调用
      // ! 此时就可以获取到所有的img标签
      this.$nextTick(() => {
        // 调用图片预览函数
        this.PreviewImg()
      })
    },
    // 用于预览图片
    PreviewImg () {
      // 获取文章详情容器
      const articleConcent = this.$refs['article-concent']
      // 获取当前容器里面所有的img标签
      const imgs = articleConcent.querySelectorAll('img')
      // 用于存储图片路径
      const imgPath = []
      imgs.forEach((img, i) => {
        imgPath.push(img.src)
        // 给imgs绑定点击事件
        img.onclick = () => {
          // 调用预览图片函数
          ImagePreview({
            images: imgPath,
            startPosition: i
          })
        }
      })
    },
    // 关注与取消关注
    async onFollow () {
      this.isLoading = true
      // 判断当前是否已经关注该用户
      if (this.aryicleDetail.is_followed) {
        // 已经关注，调用取消关注接口
        await DeleteFollow(this.aryicleDetail.aut_id)
      } else {
        // 没有关注，调用关注接口
        await addFollow(this.aryicleDetail.aut_id)
      }
      this.aryicleDetail.is_followed = !this.aryicleDetail.is_followed
      this.isLoading = false
    },
    // 给文章点赞
    async onLike () {
      // 判断当前是否已经点赞该评论
      // attitude 为 1 就说明已经点赞  否则就是没有点赞
      if (this.aryicleDetail.attitude === 1) {
        // 已经点赞，调用取消点赞接口
        await DeleteLike(this.articleId)
        this.aryicleDetail.attitude = -1
        this.$toast('取消点赞成功')
      } else {
        // 没有点赞，调用点赞接口
        await addLike(this.articleId)
        this.aryicleDetail.attitude = 1
        this.$toast('点赞成功')
      }
    },
    // 收藏文章
    async onCollect () {
      // 判断当前是否已经收藏该文章
      if (this.aryicleDetail.is_collected) {
        // 已经收藏，调用取消收藏接口
        await DeleteCollect(this.articleId)
        this.$toast('取消收藏成功')
      } else {
        // 没有收藏，调用收藏接口
        await addCollect(this.articleId)
        this.$toast('收藏成功')
      }
      this.aryicleDetail.is_collected = !this.aryicleDetail.is_collected
    }
  }
}
</script>

<style lang="less" scoped>
.article-wrap {
  .article-details {
    position: fixed;
    left: 0;
    right: 0;
    top: 45px;
    bottom: 50px;
    overflow-y: auto;
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
    .van-divider {
      background-color: #fff;
      margin: 0;
    }
  }
  .van-tabbar {
    .van-tabbar-item {
      .van-button {
        width: 200px;
        height: 35px;
        margin-left: 15px;
        text-align: left;
        .van-button__content {
          .van-button__text {
            font-size: 15px;
            color: #a7a7a7;
          }
        }
      }
    }
  }
}
</style>
