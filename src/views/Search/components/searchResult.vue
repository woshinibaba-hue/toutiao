// ! 搜索结果模块

<template>
  <div class="search-result-wrap">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in searchRes"
        :key="item.art_id"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '../../../api/search'
export default {
  props: {
    // 需要搜索的内容
    searchKey: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      page: 1, // 当前页码
      perPage: 20, // 搜索展示数据条数
      searchRes: [] // 搜索到的数据
    }
  },
  methods: {
    async onLoad () {
      const { data } = await getSearchResult({
        page: this.page,
        per_page: this.perPage,
        q: this.searchKey
      })
      // 将搜索到的数据存入data当中
      this.searchRes.push(...data.results)
      // 加载状态结束
      this.loading = false
      // 当数据加载完毕之后关闭 finished
      if (data.results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-result-wrap {
 .van-list {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 54px;
    overflow-y: auto;
    .van-cell {
      /deep/.van-cell__title {
        font-size: 13px !important;
      }
    }
 }
}
</style>
