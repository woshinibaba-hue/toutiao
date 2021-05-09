// ! 搜索历史模块

<template>
  <div>
    <van-cell-group>
      <van-cell title="搜索历史">
        <div v-if="isDeleteShow">
          <span @click="$emit('deleleAllHis',[])">全部删除</span>
          &nbsp;&nbsp;
          <span @click="isDeleteShow = false">完成</span>
        </div>
        <van-icon
          name="delete-o"
          @click="isDeleteShow = true"
          v-else
        />
      </van-cell>
    </van-cell-group>

    <!-- //! 搜索历史列表 -->
    <van-cell-group>
      <van-cell
          v-for="(item,index) in searchHistoies"
          :title="item"
          :key="index"
          @click="onDeleteHis(item,index)"
        >
        <van-icon name="close" v-show="isDeleteShow" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
// import { setItem } from '../../../utils/storage'
export default {
  props: {
    // 历史记录
    searchHistoies: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      // 控制删除按钮显示
      isDeleteShow: false
    }
  },
  methods: {
    // 删除单条历史记录
    onDeleteHis (his, index) {
      // 当处于删除状态时，点击历史记录，就删除当前历史记录
      if (this.isDeleteShow) {
        return this.searchHistoies.splice(index, 1)
        // setItem('search-history', this.searchHistoies)
      }
      // 当不是删除状态时，点击历史记录，直接搜索当前数据
      this.$emit('search', his)
    }
  }
}
</script>
