<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="(ret, index) in list"
        :key="index"
        :title="ret.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'

export default {
  name: 'SearchResult',
  props: {
    searchText: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10,
      error: false
    }
  },
  methods: {
    async onLoad () {
      try {
        // 发起请求
        const { data } = await getSearchResult({
          // 搜索关键词
          q: this.searchText,
          // 页码
          page: this.page,
          // 每页数量
          per_page: this.per_page
        })
        const { results } = data.data
        this.list.push(...results)
        this.loading = false

        // 如果还有数据
        if (results.length) {
          // 页码加一
          this.page++
        } else {
          // 不再加载
          this.finished = true
        }
      } catch (err) {
        console.log(err)
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
