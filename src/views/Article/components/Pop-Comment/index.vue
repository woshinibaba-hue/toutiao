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
    <van-button type="info" round size="mini">发布</van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: '' // 输入框中的内容
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
