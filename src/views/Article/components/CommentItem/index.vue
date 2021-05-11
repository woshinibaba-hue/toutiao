<template>
  <div class="comment-item">
    <van-cell>
      <div slot="icon" class="avatar">
        <!-- 评论人头像 -->
        <van-image
          round
          :src="comment.aut_photo"
        />
      </div>
      <div slot="title">
        <div class="name-wrap">
          <!-- 评论人昵称 -->
          <div class="name">{{comment.aut_name}}</div>
          <!-- 点赞区域 -->
          <div class="like" @click="onLike">
            <van-icon
            class="like-icon"
              :name="comment.is_liking ? 'good-job' : 'good-job-o'"
            />
            <span>{{comment.like_count}}</span>
          </div>
        </div>
        <!-- 评论内容 -->
        <div class="content">{{comment.content}}</div>
        <div>
          <!-- 评论时间 -->
          <span class="pubdate">{{comment.pubdate | dataTime}}</span>
          <!-- 回复按钮 -->
          <van-button
            class="reply-btn"
            size="mini"
            round
          >{{comment.reply_count}} 回复</van-button>
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
import { addLike, deleteLike } from '../../../../api/comment'
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 点赞触发
    async onLike () {
      const commentId = this.comment.com_id.toString()
      if (this.comment.is_liking) {
        // 已经点赞，取消点赞
        await deleteLike(commentId)
        this.comment.is_liking = false
        this.comment.like_count--
      } else {
        // 未点赞，点赞
        await addLike(commentId)
        this.comment.is_liking = true
        this.comment.like_count++
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment-item {
  .van-cell {
    .avatar {
      /deep/.van-image {
        width: 36px;
        height: 36px;
        margin-right: 10px;
      }
    }
    .name-wrap {
      display: flex;
      justify-content: space-between;
      .name {
        font-size: 14px;
        color: #45699c;
      }
      .like {
        .like-icon {
          vertical-align: text-top;
          margin-right: 5px;
        }
      }
    }
    .content {
      font-size: 14px;
      color: #333;
    }
    .pubdate {
      font-size: 12px;
      color: #222;
    }
    .reply-btn {
      width: 50px;
      height: 24px;
      vertical-align: middle;
      background-color: #f4f5f6;
      margin-left: 10px;
    }
  }
}
</style>
