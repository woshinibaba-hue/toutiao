<template>
  <div style='height:100vh;' >
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" style='height:100vh;overflow: auto;'>
      <p v-for="item in 100" :key="item">刷新次数: {{ count }}</p>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data () {
    return {
      count: 0,
      isLoading: false
    }
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.isLoading = false
        this.count++
      }, 1000)
    }
  }
}
</script>
