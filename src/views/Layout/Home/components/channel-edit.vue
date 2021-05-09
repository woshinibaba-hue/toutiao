// !频道列表展示模块

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
        type="info"
        size="mini"
        @click="isEdit = !isEdit"
     >{{isEdit ? '完成' : '编辑'}}</van-button>
    </van-cell>

    <!-- //! 我的频道列表数据 -->
    <van-grid :gutter="10">
      <van-grid-item
      :class="{active : index === active}"
        v-for="(item,index) in userChannels"
        :key="item.id"
        :text="item.name"
        :icon="(isEdit && index !== 0) ? 'close' : ''"
        @click="disposeChannel(item,index)"
      />
    </van-grid>

    <van-cell :border='false' center>
      <div
        slot="title"
        class="title"
      >
      频道推荐
      <span class="tip">点击添加频道</span>
    </div>
    </van-cell>
    <!-- //! 频道推荐列表数据 -->
    <van-grid :gutter="10">
      <van-grid-item
        v-for="item in siftinChennels"
        :key="item.id"
        :text="item.name"
        @click="onAdd(item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '../../../../api/channel'
import { mapState } from 'vuex'
import { setItem } from '../../../../utils/storage'
export default {
  props: {
    // 传递过来的用户频道列表
    userChannels: {
      type: Array,
      required: true
    },
    // 传递过来的激活项
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      // 全部频道列表数据
      allChennels: [],
      isEdit: false // 是否显示删除按钮
    }
  },
  created () {
    this.getChannels()
  },
  computed: {
    ...mapState(['userInfo']),
    // 从全部频道当筛选出推荐频道
    siftinChennels () {
      // filter 会遍历数组的每一项，find 会查找数组的每一项，并将符合条件的元素进行返回
      // find 里面，判断外层 filter 的当前项的id是否与查找的当前项id相同，如果相同则将该元素返回出去，
      // 此时又使用了 ! 进行取反，则返回 false， filter 就不会返回当前元素，
      // 也就是不会返回全部频道某一项的id与用户频道的某一项id相同的元素，
      // 如果没有查找到，则find会返回undefined，取反为true，则filter会将该元素返回出去
      return this.allChennels.filter(item => !this.userChannels.find(userChannel => item.id === userChannel.id))
    }
  },
  methods: {
    // 获取全部频道列表数据
    async getChannels () {
      const { data } = await getAllChannels()
      this.allChennels = data.channels
    },
    // 点击添加频道
    async onAdd (channel) {
      this.userChannels.push(channel)
      if (this.userInfo) {
        // 用户登录，存储到线上
        const res = await addUserChannel({
          channels: [
            {
              id: channel.id,
              seq: this.userChannels.length
            }
          ]
        })
        console.log(res)
      } else {
        // 用户未登录，存储到本地
        setItem('user-channel', this.userChannels)
      }
    },
    // 处理我的频道
    disposeChannel (channel, index) {
      if (this.isEdit && index !== 0) {
        // 编辑状态，删除频道
        this.deleteChannel(channel, index)
      } else {
        // 非编辑状态，切换频道
        this.toggleChannel(index)
      }
    },
    // 删除频道
    async deleteChannel (channel, index) {
      if (index <= this.active) {
        this.$emit('toggle-channel', this.active - 1)
      }
      // splice 删除数组指定元素
      this.userChannels.splice(index, 1)

      // 删除数据持久化
      if (this.userInfo) {
        // 登录成功的
        const res = await deleteUserChannel(channel.id)
        console.log(res)
      } else {
        // 没有登录
        setItem('user-channel', this.userChannels)
      }
    },
    // 切换频道
    toggleChannel (index) {
      // 关闭弹出层
      this.$emit('close')
      // 切换频道
      this.$emit('toggle-channel', index)
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
    .tip {
      font-size: 12px;
      color: #ccc;
      padding-left: 10px;
    }
    .van-button {
      padding: 0 15px;
      font-size: 12px;
    }
  }
  .van-grid {
    .van-grid-item {
      position: relative;
      // width: 80px;
      height: 42px;
      /deep/.van-grid-item__content {
        background-color: #f4f5f6;
        .van-grid-item__text {
          color: #222222;
          font-size: 14px;
          margin-top: 0;
        }
        .van-icon-close {
          font-size: 16px;
          position: absolute;
          right: -5px;
          top: -7px;
          z-index: 2;
        }
      }
    }
  }
}
.active {
  /deep/.van-grid-item__text {
    color: #2892ff !important;
  }
}
</style>
