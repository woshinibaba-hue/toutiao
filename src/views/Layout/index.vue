<template>
  <div>
    <router-view />
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-circle-o" to='/qs'>问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" to='/video'>视频</van-tabbar-item>
      <van-tabbar-item icon="contact" to='/my'>我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data () {
    return {

    }
  },
  mounted () {
    // 让该组件重新被缓存
    this.$store.commit('addKeep', 'Layout')
  }
}
</script>
