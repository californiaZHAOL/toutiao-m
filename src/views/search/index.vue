<template>
  <div class="search-container">
    <!-- 顶部搜索栏 -->
    <form action="/">
      <van-search
        v-model.trim="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
        background="#3296fa"
        class="search-item"
      />
    </form>

    <!-- 搜索结果 -->
    <search-result
      v-if="isResultShow"
      :searchText="searchText"
    ></search-result>
    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
    ></search-suggestion>
    <!-- 搜索历史记录 -->
    <search-history
      v-else
      :searchHistoryList="searchHistoryList"
      @search="onSearch"
      @delHistory="delHistory"
    ></search-history>
  </div>
</template>

<script>
import searchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import { getItem, setItem } from '@/utils/storage'

export default {
  components: { searchHistory, SearchResult, SearchSuggestion },
  name: 'SearchIndex',
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistoryList: getItem('history') || []
    }
  },
  methods: {
    onSearch (val) {
      this.searchText = val
      this.isResultShow = true

      // 历史记录不能重复 搜索时间靠前的记录排在前面
      const index = this.searchHistoryList.indexOf(val)
      if (index !== -1) {
        this.searchHistoryList.splice(index, 1)
      }
      this.searchHistoryList.unshift(val)
    },
    onCancel () {
      this.$router.back()
    },
    delHistory (index) {
      if (index !== -1) {
        this.searchHistoryList.splice(index, 1)
      } else {
        this.searchHistoryList = []
      }
    }
  },
  watch: {
    searchHistoryList (newValue) {
      // 本地存储
      setItem('history', newValue)
    }
  }
}
</script>

<style lang="less" scoped>
.van-search__action {
  color: white;
}

.search-item {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 2;
}

.search-container {
  padding-top: 108px;
}
</style>
