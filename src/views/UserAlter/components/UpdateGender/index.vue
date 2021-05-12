<template>
  <div>
    <van-picker
      title="修改性别"
      show-toolbar
      :columns="gender"
      item-height='1.173333rem'
      :default-index='defalutIndex'
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onGenderChange"
    />
  </div>
</template>

<script>
import { alterUserInfo } from '@/api/user'

export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      gender: ['男', '女'],
      defalutIndex: this.value // 默认选择项
    }
  },
  methods: {
    // 修改性别
    async onConfirm () {
      // 开启loading提示
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true // 禁止背景点击
      })
      await alterUserInfo({
        gender: this.defalutIndex
      })
      // 发射事件关闭，弹出层
      this.$emit('close')
      this.$emit('input', this.defalutIndex)
      this.$toast.success('修改成功')
    },
    // 当选项发送改变的时候触发
    // picker 该组件实例，value选择的值，index选中项索引
    onGenderChange (picker, value, index) {
      this.defalutIndex = index
    }
  }
}
</script>
