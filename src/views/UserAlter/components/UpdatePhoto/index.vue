<template>
  <div>
    <van-nav-bar
      title="修改头像"
      left-text="取消"
      right-text="确认"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <img :src="imgUrl" alt="">
  </div>
</template>

<script>
import { editPhoto } from '../../../../api/user'
export default {
  props: {
    file: {
      type: Object.file,
      required: true
    }
  },
  data () {
    return {
      // ! 在使用的时候，需要将 file 对象转换为 blob 才能进行使用
      imgUrl: window.URL.createObjectURL(this.file)
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '上传中...',
        forbidClick: true
      })

      // ! 由于后端需要传递这样的一个类型的数据  Content-Type multipart/form-data  此时就不能传递一个普通的对象 {} 了
      // ! 就需要传递一个 FromData 对象了
      // ! 创建一个 fromdata 对象
      const fd = new FormData()

      // ! 向 fromdata 实例添加需要传递的数据
      // ! fd.append(属性名，属性值), 此时就需要传递一个 file 对象才可以
      fd.append('photo', this.file)

      //! 此时就将fromdata对象传递过去
      await editPhoto(fd)

      this.$emit('updata-photo', this.imgUrl)

      // 关闭弹出层
      this.$emit('close')

      // 提示用户
      this.$toast.success('修改成功')
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  /deep/.van-nav-bar__text {
    color: #fff;
  }
}
img{
  margin-top: 46px;
}
</style>
