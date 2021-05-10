<template>
  <div class="comment-wrap">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    <van-cell>全部评论</van-cell>
      <van-cell
        v-for="(item, index) in commentList"
        :key="index"
        :title="item.content"
      />
    </van-list>
  </div>
</template>

<script>
import { getComments } from '../../api/comment'
export default {
  props: {
    source: {
      type: [Object, Number, String],
      required: true
    }
  },
  data () {
    return {
      commentList: [], // 评论数据
      loading: false, // 获取评论的loading提示
      finished: false, // 控制数据是否已经加载完毕
      limit: 10, // 获取评论的数量
      offset: null // 页码
    }
  },
  methods: {
    async onLoad () {
      const { data } = await getComments({
        // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        type: 'a',
        // 源id，文章id或评论id
        source: this.source,
        // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        offset: this.offset,
        // 获取评论的个数
        limit: this.limit
      })
      // 将本次请求的数组保存到 data 当中
      this.commentList.push(...data.results)
      // 将本次请求loading关闭
      this.loading = false
      // 判断评论是否加载完毕
      if (data.results.length) {
        // 将获取下一页评论的凭证赋值给offset
        this.offset = data.last_id
      } else {
        // 评论加载完毕
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment-wrap {
  .van-list {
    /deep/.van-list__finished-text {
      font-size: 6px;
    }
  }
}
</style>
