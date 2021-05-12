<template>
  <div id="app">

    <!-- // ! 注意点 : 由于此处的 router-view  是一级路由出口， 此时的  keep-alive 仅仅只针对于 一级路由之间才会存在缓存
        // !  多级路由是不会有缓存的效果的，如果需要多级路由切换也存在缓存，那么就需要去多级路由出口去 设置 keep-alive
     -->

     <!-- //!  include 会根据给定的数组，给指定数组进行缓存处理  -->
    <keep-alive :include='keepLalive' >
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['keepLalive'])
  }
}
</script>

<style lang="less"></style>
