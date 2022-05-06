<template>
  <div class="search-history">
    <van-cell title="搜索历史" v-if="searchHistoryList.length">
      <div v-if="isDel">
        <span @click="onDel(-1)">全部删除</span>&nbsp;&nbsp;&nbsp;
        <span @click="isDel = !isDel">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isDel = !isDel"></van-icon>
    </van-cell>

    <van-cell
      v-for="(history, index) in searchHistoryList"
      :key="index"
      :title="history"
      @click="onSearch(history)"
    >
      <van-icon name="close" v-show="isDel" @click="onDel(index)"></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistoryList: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      isDel: false
    }
  },
  methods: {
    // 通过点击历史记录搜索
    onSearch (history) {
      // 触发父组件搜索事件
      if (!this.isDel) {
        this.$emit('search', history)
      }
    },
    onDel (index) {
      // 删除
      if (this.isDel) {
        this.$emit('delHistory', index)
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
