<template>
  <div>
    <!-- 头部区域 -->
    <van-nav-bar
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 展示消息列表区域 -->
    <van-cell-group class="message-list">
      <van-cell title="打扰了，接口用不了" v-for="item in 20" :key="item"/>
    </van-cell-group>

    <!-- 底部输入消息区域 -->
    <van-tabbar>

      <!-- 输入框区域 -->
      <van-tabbar-item class="send-inp">
        <van-field
          v-model="message"
          placeholder="请输入消息内容"
        />
      </van-tabbar-item>

      <!-- 发送消息按钮区域 -->
      <van-tabbar-item class="send-btn">
        <van-button
          type="info"
          size="small"
        >
          发送
        </van-button>
      </van-tabbar-item>

    </van-tabbar>
  </div>
</template>

<script>
// import io from 'socket.io-client'

export default {
  data () {
    return {
      message: '' // 需要发送的消息
    }
  },
  created () {
    // 建立连接
    // const socket = io('http://ttapi.research.itcast.cn')

    // // 当客户端与服务器建立连接成功，触发 connect 事件
    // socket.on('connect', () => {
    //   console.log('建立连接成功！')
    // })
  }

}
</script>

<style lang="less" scoped>
  .message-list {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 50px;
    overflow-y: auto;
  }
  .van-tabbar {
    .send-inp {
      flex: 4;
      /deep/.van-tabbar-item__text {
        width: 100%;
      }
    }
    /deep/.send-btn {
      flex: 1;
    }
  }
</style>
