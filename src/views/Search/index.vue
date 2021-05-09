// ! 搜索页面

<template>
  <div class="search-wrap">
    <!-- //! 搜索输入框 -->
    <van-search
      v-model="searchKey"
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="$router.back()"
      background='#2892ff'
      shape='round'
      show-action
      @focus='isResultShow = false'
    />

    <!-- //! 搜索结果模块-->
    <search-result v-if="isResultShow" />

    <!-- //! 搜索联想模块 -->
    <search-associate v-else-if="searchKey" :searchKey='searchKey' />

    <!-- //! 搜索历史模块-->
    <search-history v-else />

  </div>
</template>

<script>
import searchAssociate from './components/searchAssociate'
import searchHistory from './components/searchHistory'
import searchResult from './components/searchResult'
export default {
  data () {
    return {
      // 输入框输入的内容
      searchKey: '',
      // 控制搜索结果页面的显示隐藏
      isResultShow: false
    }
  },
  components: {
    searchAssociate,
    searchHistory,
    searchResult
  },
  methods: {
    // 当点击回车或者搜索触发
    onSearch (val) {
      console.log('搜索', val)
      this.isResultShow = true
    }
  }
}
</script>

<style lang="less" scoped>
  .search-wrap {
    .van-search {
      /deep/.van-search__action {
        color: #fff;
        background-color: transparent;
      }
    }
  }
</style>
