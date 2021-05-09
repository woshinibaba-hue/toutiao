// ! 搜索页面

<template>
  <div class="search-wrap">
    <!-- //! 搜索输入框 -->
    <van-search
      v-model="searchKey"
      placeholder="请输入搜索关键词"
      @search="onSearch(searchKey)"
      @cancel="$router.back()"
      background='#2892ff'
      shape='round'
      show-action
      @focus='isResultShow = false'
    />

    <!-- //! 搜索结果模块 -->
    <search-result v-if="isResultShow" :searchKey='searchKey' />

    <!-- //! 搜索联想模块 -->
    <search-associate
      v-else-if="searchKey"
      :searchKey='searchKey'
      @search='onSearch'
    />

    <!-- //! 搜索历史模块-->
    <search-history
      v-else
      @deleleAllHis='searchHistoies = $event'
      :searchHistoies='searchHistoies'
      @search='onSearch'
    />

  </div>
</template>

<script>
import searchAssociate from './components/searchAssociate'
import searchHistory from './components/searchHistory'
import searchResult from './components/searchResult'

import { setItem, getItem } from '../../utils/storage'
import { mapState } from 'vuex'

// import { getSearchHistory } from '../../api/search'

export default {
  data () {
    return {
      // 输入框输入的内容
      searchKey: '',
      // 控制搜索结果页面的显示隐藏
      isResultShow: false,
      searchHistoies: [] // 搜索历史记录
    }
  },
  watch: {
    // 监听 searchHistoies 搜索历史记录数组变化
    searchHistoies () {
      setItem('search-history', this.searchHistoies)
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created () {
    this.getSearchHistories()
  },
  components: {
    searchAssociate,
    searchHistory,
    searchResult
  },
  methods: {
    // 当点击回车或者搜索触发
    onSearch (str) {
      // 如果本次搜索的数据，在之前历史记录已经存在，则删除之前的，在重新将本次的数据添加进去
      const index = this.searchHistoies.findIndex(item => item === str)
      if (index !== -1) {
        // 说明本次搜索的内容，之前就已经存在于历史记录，删除该历史记录
        this.searchHistoies.splice(index, 1)
      }
      // 将搜索记录保存至data当中
      this.searchHistoies.unshift(str)
      // 将搜索记录存储到本地，使搜索记录持久化
      setItem('search-history', this.searchHistoies)

      // 将搜索框内容改为调用该函数传递的内容
      this.searchKey = str
      // 展示搜索结果页面
      this.isResultShow = true
    },
    async getSearchHistories () {
      // 获取本地存储的数据，并将本地存储的数据保存至data当中
      this.searchHistoies = getItem('search-history') || []

      // 如果用户已经登录
      // if (this.userInfo) {
      //    获取线上接口的历史记录，由于后端只保存了用户最后搜索的 4 条记录，
      //    那么此时就需要将本地的历史记录与线上的合并在一起了
      //   const { data } = await getSearchHistory()
      //    ! 利用 es6 的set方法对数组进行去重, Set 是一个构造函数，它类似数组，但是它的每一项是唯一的，如果出现重复的会自动去除
      //   this.searchHistoies = [...new Set([...this.searchHistoies, ...data.keywords])]
      // }
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
