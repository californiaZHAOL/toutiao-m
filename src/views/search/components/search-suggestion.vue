<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(sug, index) in htmlStr"
      :key="index"
      icon="search"
      @click="$emit('search', suggestions[index])"
    >
      <template #title>
        <div v-html="sug"></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion',
  data () {
    return {
      suggestions: [],
      htmlStr: []
    }
  },
  props: {
    searchText: {
      required: true,
      type: String
    }
  },
  // 监视文本框的变化
  watch: {
    searchText: {
      // 内容变化发起请求
      handler: debounce(function (newValue) {
        // 获取搜索建议
        this.loadSearchSuggestion(newValue)
      }, 500),
      // 让handle回调在组件加载时立即调用
      immediate: true
    }
  },
  methods: {
    async loadSearchSuggestion (q) {
      // 发起请求
      try {
        const { data } = await getSearchSuggestion(q)
        this.suggestions = data.data.options
        if (this.suggestions[0] === null) {
          this.suggestions = []
        }

        // 给关键词加高量效果
        this.htmlStr = this.suggestions.map(item => {
          // 正则替换 全局匹配 忽略大小写
          return item.replace(new RegExp(this.searchText, 'gi'), `<span style="color: #3296fa;">${this.searchText}</span>`)
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
