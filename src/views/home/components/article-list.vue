<template>
  <div class="article-list">

    <!-- 下拉刷新的区域 -->
    <van-pull-refresh v-model="isFreshLoading" @refresh="onRefresh" :success-text="successText">

      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        success-duration="1500"
      >
        <!-- <van-cell v-for="(article, index) in list" :key="index" :title="article.title" /> -->
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        ></article-item>
      </van-list>

    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: Date.now(),
      error: false,
      // 下拉刷新
      isFreshLoading: true,
      // 刷新成功提示文本
      successText: '刷新成功'
    }
  },
  methods: {
    async onLoad () {
      try {
        // 请求数据
        const { data } = await getArticleList({
          channel_id: this.channel.id,
          timestamp: this.timestamp
        })
        const { results } = data.data

        // 把数据请求的数据push到数组
        this.list.push(...results)

        // 本次数据加载结束之后 加载状态设置为结束
        this.loading = false

        // 数据全部加载完成 设置finished为true
        if (results.length === 10) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        // 发生错误
        this.error = true
        this.loading = false
      }

      // setTimeout(() => {
      //   // 请求数据 并且把数据push到数组
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }

      //   // 本次数据加载结束之后 加载状态设置为结束
      //   // loading 为false才能触发下一次的加载更多
      //   this.loading = false

      //   // 数据全部加载完成 设置finished为true
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 1000)
    },

    // 下拉刷新事件
    async onRefresh () {
      try {
        // 请求获取数据
        const { data } = await getArticleList({
          channel_id: this.channel.id,
          timestamp: Date.now()
        })
        const { results } = data.data

        // 将刷新得来的数据 追加到list的头部
        this.list.unshift(...results)

        // 关闭刷新的loading状态
        this.isFreshLoading = false

        // 更新下拉刷新成功提示的文本
        this.successText = '刷新成功, 更新了' + results.length + '条数据'
      } catch (err) {
        this.isFreshLoading = false
        this.successText = '刷新失败'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
