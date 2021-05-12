<template>
  <div>
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right='alterName'
    />
    <div class="textarea">
      <van-field
        v-model="message"
        autosize
        clearable
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { alterUserInfo } from '@/api/user'
export default {
  props: {
    // 接受父组件使用 v-model 传递过来的 value 数据
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      // 输入框内容
      message: this.value
    }
  },
  methods: {
    // 点击完成修改昵称
    async alterName () {
      // 开启loading提示
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true // 禁止背景点击
      })
      try {
        await alterUserInfo({
          name: this.message
        })
        //! 由于父组件使用 v-model 绑定的数据，那么此时如果需要修改，则需要发射一个 input 事件，因为v-model 默认监听的是input事件
        this.$emit('input', this.message)
        // 关闭修改昵称页面
        this.$emit('close')
        // 提示用户修改成功
        this.$toast.success('修改成功')
      } catch (error) {
        if (error && error.response && error.response.status === 409) {
          this.$toast.fail('昵称重复')
        } else {
          console.log('未知错误')
        }
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
