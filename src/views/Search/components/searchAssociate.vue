// ! 搜索联想模块

<template>
  <div>
    <van-cell
      v-for="(item,index) in searchSuggestion"
      :key="index"
      icon="search"
      @click="$emit('search', item)"
    >
      <div v-html="highlightStr(item)"></div>
    </van-cell>
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
        this.searchSuggestion = data.options
      }, 500),
      // 该回调将会在侦听开始之后被立即调用
      immediate: true
    }
  },
  methods: {
    highlightStr (str) {
      // ! 由于正则表达式  /里面所有的内容都会被当做是正则匹配字符，而不会当做是变量/
      // ! 如果需要使用变量来匹配字符，那么就只能使用 RegExp 正则构造函数来完成了
      // ! 正则构造函数，第一个参数是 需要匹配的字符，第二个参数是匹配模式

      return str.replace(
        new RegExp(this.searchKey, 'gi'),
        `<span style="color: #2892ff">${this.searchKey}</span>`
      )
    }
  }
}
</script>
