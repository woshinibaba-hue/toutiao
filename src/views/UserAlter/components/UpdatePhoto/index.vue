<template>
  <div>
    <van-nav-bar
      title="修改头像"
      left-text="取消"
      right-text="确认"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <img :src="imgUrl" ref="image" />
  </div>
</template>

<script>
import { editPhoto } from '../../../../api/user'
// 引入头像裁切的样式
import 'cropperjs/dist/cropper.css'
// 引入头像裁切的主函数
import Cropper from 'cropperjs'
export default {
  props: {
    // 接受父组件传递的 file 头像对象
    file: {
      type: Object.file,
      required: true
    }
  },
  data () {
    return {
      // ! 在使用的时候，需要将 file 对象转换为 blob 才能进行使用
      imgUrl: window.URL.createObjectURL(this.file),
      cropper: null // 图像裁剪实例
    }
  },
  created () {
    this.$nextTick(() => {
      const image = this.$refs.image
      // 将图像裁剪实例保存至data当中
      this.cropper = new Cropper(image, {
        viewMode: 1,
        dragMode: 'move',
        aspectRatio: 1,
        autoCropArea: 1,
        cropBoxMovable: false,
        cropBoxResizable: false,
        background: false,
        movable: true
      })
    })
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
      // fd.append('photo', this.file)

      // cropper 默认返回的是 file 对象  使用的时候需要进行转换才可以
      // 获取裁剪之后的图片
      const file = await this.getCroppedCanvas()

      // 此时就将裁剪之后的图片发送给后端
      fd.append('photo', file)

      //! 此时就将fromdata对象传递过去
      await editPhoto(fd)

      // this.$emit('updata-photo', this.imgUrl)

      // 发送给父组件的就是裁剪之后的图片了
      this.$emit('updata-photo', window.URL.createObjectURL(file))

      // 关闭弹出层
      this.$emit('close')

      // 提示用户
      this.$toast.success('修改成功')
    },
    // 获取裁剪之后的头像
    getCroppedCanvas () {
      // 返回一个 promise 对象
      return new Promise(resolve => {
        // 由于 cropper 这个它不支持promise，最好就是使用promise包装一下
        this.cropper.getCroppedCanvas().toBlob(blob => {
          resolve(blob)
        })
      })
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
/deep/.cropper-container {
  margin-top: 50%;
}
/deep/ .cropper-wrap-box {
  overflow: unset;
}
</style>
