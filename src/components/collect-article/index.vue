<template>
  <van-icon
    color="#777"
    :name="value ? 'star' : 'star-o'"
    :class="{collected: value}"
    @click="onClick"
    :loading="loading"
  />
</template>

<script>
import { collectArticle, cancelCollectArticle } from '@/api/article'

export default {
  name: 'CollectArticle',
  props: {
    value: {
      type: [Boolean],
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onClick () {
      this.loading = true
      try {
        if (this.value) {
          // 已收藏 要取消收藏
          await cancelCollectArticle(this.articleId)
        } else {
          // 未收藏 要进行收藏
          await collectArticle(this.articleId)
        }
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '收藏成功' : '已取消收藏')
      } catch (err) {
        this.$toast('失败')
        console.log(err)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.collected {
  color: #ffa500 !important;
}
</style>
