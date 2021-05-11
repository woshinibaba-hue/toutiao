<template>
  <div class="popComment">
    <van-field
      v-model="message"
      autosize
      type="textarea"
      maxlength="100"
      placeholder="请输入评论内容"
      show-word-limit
    />
    <van-button
      type="info"
      round
      size="mini"
      :disabled='!message'
      @click="onPop"
    >发布</van-button>
  </div>
</template>

<script>
import { addComment } from '../../../../api/article'
export default {
  props: {
    // 评论的目标id，评论文章就是文章id，回复评论就是评论id
    target: {
      type: [Number, Object, String],
      required: true
    },
    // 文章id，如果是对评论内容进行回复则需要传递此参数，如果是对文章进行评论，则不需要传递
    articleId: {
      type: [Number, Object, String],
      default: null
    }
  },
  data () {
    return {
      message: '' // 输入框中的内容
    }
  },
  methods: {
    // 发布评论
    async onPop () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      const { data } = await addComment({
        target: this.target.toString(), // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
        content: this.message, // 评论内容
        art_id: this.articleId ? this.articleId.toString() : null // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
      })
      this.$toast.success('评论成功')
      // 向父组件发射事件
      this.$emit('pop-success', data.new_obj)
      // 清空评论内容
      this.message = ''
    }
  }
}
</script>

<style lang="less" scoped>
.popComment {
  display: flex;
  align-items: center;
  .van-button {
    width: 50px;
    margin-right: 10px;
  }
}
</style>
