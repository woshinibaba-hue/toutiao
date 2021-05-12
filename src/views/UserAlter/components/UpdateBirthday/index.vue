<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      item-height='1.173333rem'
      type="date"
      title="请选择年月日"
      :min-date="minDate"
      :max-date='maxDate'
      @cancel='$emit("close")'
      @confirm='editBirthday'
    />
  </div>
</template>

<script>
import { alterUserInfo } from '@/api/user'
// 引入 dayjs 用于处理日期格式
import dayjs from 'dayjs'
export default {
  props: {
    // 接受 v-model 默认绑定的 value props参数
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1975, 0, 1), // 最小选择时间
      maxDate: new Date(), // 最大选择时间
      currentDate: new Date(this.value) // 选择的时间
    }
  },
  methods: {
    // 点击完成时触发
    async editBirthday () {
      // 开启修改 loading 提示
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      // 将日期格式转换为后端指定格式
      const birthday = dayjs(this.currentDate).format('YYYY-MM-DD')
      await alterUserInfo({
        birthday
      })
      // 关闭弹出层
      this.$emit('close')
      // 给父组件的 v-model 发射 input 事件
      this.$emit('input', birthday)
      // 提示用户修改成功
      this.$toast.success('修改成功')
    }
  }
}
</script>
