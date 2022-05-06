<template>
  <div class="home-container">
		<!-- 顶部导航栏 -->
		<van-nav-bar
      class="page-bav-bar"
      fixed
		>
      <!-- 标题插槽 -->
      <template #title>
        <!-- 插入按钮 -->
        <van-button
          class="search-btn"
          type="info"
          size="small"
          round
          icon="search"
          to="/search"
        >搜索</van-button>
      </template>
    </van-nav-bar>

    <!-- 频道列表 -->
    <van-tabs
      class="channel-tabs"
      v-model="active"
      animated
      swipeable
    >
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
        <!-- 文章列表 -->
        <article-list :channel="channel"></article-list>
      </van-tab>

      <!-- 右侧插槽 -->
      <template #nav-right>
        <div class="btn" @click="isChannelEditShow = true">
          <i class="iconfont icon-gengduo"></i>
        </div>
        <div class="placehold"></div>
      </template>
    </van-tabs>

    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="isChannelEditShow"
      closeable
      position="bottom"
      :style="{ height: '90%' }"
      round
    >
      <!-- 弹出层内容 -->
      <channel-edit
        :channels="channels"
        :active="active"
        @addChannel="addChannel"
        @removeChannel="removeChannel"
        @updateChannel="updateChannel"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import { addUserChannel, deleteUserChannel } from '@/api/channel'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { setItem, getItem } from '@/utils/storage'
import { mapState } from 'vuex'

export default {
  components: {
    ArticleList,
    ChannelEdit
  },
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channels: [],
      // 控制编辑频道弹出层的展示状态
      isChannelEditShow: false
    }
  },
  created () {
    this.loadUserChannels()
  },
  methods: {
    async loadUserChannels () {
      try {
        if (this.user) {
          // 当用户已登录 请求后端的该用户的频道列表
          const { data } = await getUserChannels()
          this.channels = data.data.channels
        } else {
          // 用户未登录 取得本地存储的数据
          const localChannels = getItem('channels')

          // 如果本地有数据 取得本地的数据
          if (localChannels) {
            this.channels = localChannels
          } else {
            // 本地没有数据 且未登录 请求后端默认的数据
            const { data } = await getUserChannels()
            this.channels = data.data.channels
          }
        }
      } catch (err) {
        console.log(err)
      }
    },

    async addChannel (channel) {
      this.channels.push(channel)

      // 持久化处理
      if (this.user) {
        // 已登录 请求接口
        try {
          await addUserChannel({
            id: channel.id,
            seq: this.channels.length
          })
        } catch (err) {
          console.log(err)
        }
      } else {
        // 未登录 本地存储
        setItem('channels', this.channels)
      }
    },

    async removeChannel (id) {
      const index = this.channels.findIndex(item => item.id === id)
      if (index <= this.active) {
        this.active--
      }
      this.channels.splice(index, 1)

      // 持久化处理
      if (this.user) {
        // 已登录 请求接口
        try {
          await deleteUserChannel(id)
        } catch (err) {
          console.log(err)
        }
      } else {
        // 未登录 本地存储
        setItem('channels', this.channels)
      }
    },
    updateChannel (id) {
      this.active = this.channels.findIndex(item => item.id === id)
      this.isChannelEditShow = false
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-bottom: 100px;
  padding-top: 174px;

  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;

    .van-icon {
      color: #fff;
      font-size: 32px;
    }
  }

  .van-nav-bar__title {
    line-height: 92px;
    max-width: unset;
  }

  /deep/ .channel-tabs {
    // 激活时
    .van-tabs__nav {
      padding-bottom: 0;

      .van-tab--active {
        color: #333;
      }

      .van-tabs__line {
        height: 6px;
        background-color: #3296fa;
        bottom: 8px;
      }
    }

    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777;
    }

    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
    }

    .btn {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.902;

      .iconfont {
        font-size: 33px;
      }

      &::before {
        position: absolute;
        left: 0;
        content: "";
        width: 2px;
        height: 100%;
        background-image: url(@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }

    .placehold {
      width: 66px;
      height: 82px;
      // 不参与flex剩余解间的计算
      flex-shrink: 0;
    }
  }
}
</style>
