<template>
  <van-icon
    color="#777"
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{liked: value === 1}"
    @click="onClick"
    :loading="loading"
  />
</template>

<script>
import { likeArticle, cancelLikeArticle } from '@/api/article'

export default {
  name: 'LikeArticle',
  props: {
    value: {
      type: [Number],
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
        if (this.value === 1) {
          // 已点赞  要取消点赞
          await cancelLikeArticle(this.articleId)
        } else {
          // 未点赞 要进行点赞
          await likeArticle(this.articleId)
        }
        this.$emit('input', this.value === 1 ? -1 : 1)
        this.$toast.success(this.value === -1 ? '点赞成功' : '已取消点赞')
      } catch (err) {
        this.$toast.fail('点赞失败')
        console.log(err)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.liked {
  color: #e5645f !important;
}
</style>
