// ! 搜索历史模块

<template>
  <div>
    <van-cell-group>
      <van-cell title="搜索历史">
        <!-- <div>
          <span>全部删除</span>
          &nbsp;&nbsp;
          <span>完成</span>
        </div> -->
        <van-icon name="delete-o" />
      </van-cell>
    </van-cell-group>

    <!-- //! 搜索历史列表 -->
    <van-cell-group>
      <van-cell
        :title="item"
        v-for="(item,index) in searchHistoies"
        :key="index">
        <van-icon name="close" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>

export default {
  props: {
    // 历史记录
    searchHistoies: {
      type: Array,
      required: true
    }
  }
}
</script>
