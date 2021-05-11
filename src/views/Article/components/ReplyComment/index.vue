<template>
  <div>
    <!-- 评论头部区域 -->
    <van-nav-bar
      :title="`${comment.reply_count}条回复`"
      left-arrow
      @click-left="$emit('close')"
    >
      <van-icon slot="left" name="close" />
    </van-nav-bar>

    <!-- 展示需要回复的评论 -->
    <CommentItem :comment='comment' />
    <CommentList
      :source='comment.aut_id'
      type='c'
      :commentList='commentList'
    />
    <!-- 底部区域 -->
    <van-tabbar>
      <van-tabbar-item>
        <van-button
          round
          @click="isReplyShow = true"
        >回复</van-button>
      </van-tabbar-item>
    </van-tabbar>

    <!-- 回复评论弹出层 -->
    <van-popup
      round
      v-model="isReplyShow"
      position="bottom"
    >
      <PopComment
        :target='comment.aut_id'
        :articleId='articleId'
        @pop-success='replySuccess'
      />
    </van-popup>
  </div>
</template>

<script>
import CommentItem from '../CommentItem'
import CommentList from '../CommentList'
import PopComment from '../Pop-Comment'
export default {
  props: {
    comment: {
      type: Object,
      required: true
    },
    // 文章id
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      // 控制回复弹出层显示隐藏
      isReplyShow: false,
      commentList: [] // 回复评论列表
    }
  },
  components: {
    CommentItem,
    CommentList,
    PopComment
  },
  methods: {
    // 当评论成功时
    replySuccess (comment) {
      this.isReplyShow = false
      this.comment.reply_count++
      this.commentList.unshift(comment)
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: unset;
  /deep/.van-nav-bar__title {
    color: #333;
  }
  /deep/.van-icon-close {
    color: #2892ff;
    font-size: 18px;
  }
}
.van-tabbar {
  .van-tabbar-item {
    .van-button {
      width: 200px;
      height: 40px;
      background-color: #2892ff;
      .van-button__text {
        color: #fff;
      }
    }
  }
}
</style>
