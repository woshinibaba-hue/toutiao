<template>
  <div>
    <van-nav-bar
      title="修改昵称"
      right-text="完成"
      left-arrow
      @click-left="$emit('close')"
      @click-right='alterName'
    />
    <div class="textarea">
      <van-field
        v-model="message"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { alterUserInfo } from '../../../../api/user'
export default {
  props: {
    userName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      // 输入框内容
      message: this.userName
    }
  },
  methods: {
    // 点击完成修改昵称
    async alterName () {
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true // 禁止背景点击
      })
      try {
        await alterUserInfo({
          name: this.message
        })
        this.$emit('update-name', this.message)
        this.$emit('close')
        this.$toast.success('修改成功')
      } catch (error) {
        this.$toast.fail('昵称重复')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.textarea {
  padding: 10px;
}
/deep/.van-nav-bar__text {
  color: #fff;
}
</style>
