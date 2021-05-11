<template>
  <div class="comment-wrap">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    <van-cell>全部评论</van-cell>
    <CommentItem
      v-for="(item, index) in commentList"
      :key="index"
      :comment='item'
    />
    </van-list>
  </div>
</template>

<script>
import { getComments } from '../../../../api/comment'

import CommentItem from '../CommentItem'
export default {
  props: {
    source: {
      type: [Object, Number, String],
      required: true
    },
    // 评论列表
    commentList: {
      type: Array,
      // ! 注意点，数组 或者 对象 的默认值，必须通过 函数 返回值 进行设置
      default: () => []
    }
  },
  data () {
    return {
      // commentList: [], // 评论数据
      loading: false, // 获取评论的loading提示
      finished: false, // 控制数据是否已经加载完毕
      limit: 10, // 获取评论的数量
      offset: null // 页码
    }
  },
  components: { CommentItem },
  methods: {
    async onLoad () {
      const { data } = await getComments({
        // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        type: 'a',
        // 源id，文章id或评论id
        source: this.source.toString(),
        // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        offset: this.offset,
        // 获取评论的个数
        limit: this.limit
      })
      this.$emit('comment-count', data.total_count)
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
</style>
