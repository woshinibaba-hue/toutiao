<template>
  <div class="channel-edit">
    <van-cell :border='false' center>
      <div
        slot="title"
        class="title"
      >我的频道</div>
      <van-button
        round
        plain
        type="danger"
        size="mini"
     >编辑</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="item in userChannels"
        :key="item.id"
        :text="item.name"
      />
    </van-grid>
    <van-cell :border='false' center>
      <div
        slot="title"
        class="title"
      >频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="item in siftinChennels"
        :key="item.id"
        :text="item.name"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '../../../../api/channel'
export default {
  props: {
    // 传递过来的用户频道列表
    userChannels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      // 全部频道列表数据
      allChennels: []
    }
  },
  created () {
    this.getChannels()
  },
  methods: {
    // 获取全部频道列表数据
    async getChannels () {
      const { data } = await getAllChannels()
      this.allChennels = data.channels
    }
  },
  computed: {
    // 从全部频道当筛选出推荐频道
    siftinChennels () {
      // filter 会遍历数组的每一项，find 会查找数组的每一项，并将符合条件的元素进行返回
      // find 里面，判断外层 filter 的当前项的id是否与查找的当前项id相同，如果相同则将该元素返回出去，
      // 此时又使用了 ! 进行取反，则返回 false， filter 就不会返回当前元素，
      // 也就是不会返回全部频道某一项的id与用户频道的某一项id相同的元素，
      // 如果没有查找到，则find会返回undefined，取反为true，则filter会将该元素返回出去
      return this.allChennels.filter(item => !this.userChannels.find(userChannel => item.id === userChannel.id))
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 40px 0 20px 0;
  .van-cell {
    .title {
      font-size: 14px;
      color: #333;
    }
    .van-button {
      padding: 0 15px;
      font-size: 12px;
    }
  }
  .van-grid {
    .van-grid-item {
      width: 80px;
      height: 42px;
      /deep/.van-grid-item__content {
        background-color: #f4f5f6;
        .van-grid-item__text {
          color: #222222;
          font-size: 14px;

        }
      }
    }
  }
}
</style>
