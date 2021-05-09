// !文章列表展示模块

<template>
  <div class="article-wrap">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :head-height='80'>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- //! 文章列表模块 -->
        <ArticleItem v-for="(item,i) in articleList" :key="i" :article='item'/>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getArticleList } from '../../../../api/article'
import ArticleItem from '../../../../components/ArticleItem/ArticleItem'
export default {
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  components: { ArticleItem },
  data () {
    return {
      articleList: [], // 列表数据
      loading: false, // 控制loading状态
      finished: false, // 控制数据加载完毕的状态
      timestamp: null, // 请求的时间戳
      refreshing: false // 下拉刷新loading状态
    }
  },
  methods: {
    async onLoad () {
      const { data } = await getArticleList({
        channel_id: this.channel.id,
        // 如果 data中的 timestamp 时间戳存在就使用，否则就使用当前时间戳
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      const { results } = data
      // 将获取到的数据，并推送至保留的列表数据后面，... 是将获取的数组进行展开之后在推送
      this.articleList.push(...results)
      // 设置loading加载状态结束
      this.loading = false
      // 判断是否还存在下一页数据
      if (results.length) {
        // 如果存在下一页数据，将保留下一页时间戳
        this.timestamp = data.pre_timestamp
      } else {
        // 如果不存在下一页数据，将数据加载完毕的状态设置为true，表示数据加载完毕
        this.finished = true
        this.timestamp = null
      }
    },
    // 下拉刷新
    async onRefresh () {
      const { data } = await getArticleList({
        channel_id: this.channel.id,
        // 如果 data中的 timestamp 时间戳存在就使用，否则就使用当前时间戳
        timestamp: Date.now(),
        with_top: 1
      })
      this.articleList.unshift(...data.results)
      this.$toast(`成功更新${data.results.length}条数据`)
      this.refreshing = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
