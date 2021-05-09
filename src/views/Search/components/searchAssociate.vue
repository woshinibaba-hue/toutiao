// ! 搜索联想模块

<template>
  <div>
    <van-cell
      v-for="(item,index) in searchSuggestion"
      :title="item"
      :key="index"
      icon="search"
    />
  </div>
</template>

<script>
import { getSearchSuggestion } from '../../../api/search'

// 从 lodash 导入 debounce 函数防抖
import { debounce } from 'lodash'
export default {
  props: {
    // 输入框搜索结果
    searchKey: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      // 搜索联想建议
      searchSuggestion: []
    }
  },
  watch: {
    // 监听输入框内容变化
    // 简写  无法进行一些相关配置
    // searchKey () {
    //   console.log('搜索')
    // }

    // 完整写法
    searchKey: {
      // 当监听的数据发送变化时，handler 会自动调用
      // ! 使用 debounce 防抖函数，它会返回一个具有防抖功能的函数
      handler: debounce(async function () {
        const { data } = await getSearchSuggestion(this.searchKey)
        console.log(data)
        this.searchSuggestion = data.options
      }, 500),
      // 该回调将会在侦听开始之后被立即调用
      immediate: true
    }
  }
}
</script>
