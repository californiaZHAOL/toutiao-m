<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :error.sync="error"
    error-text="加载失败，请点击重试"
    :immediate-check="immediateCheck"
  >
    <comment-item
      v-for="(item, index) in list"
      :key="index"
      :title="item.content"
      :comment="item"
      @changeCommentLike="changeCommentLike"
      @replyClick="replyClick"
    />
  </van-list>
</template>

<script>
import { getCommentList } from '@/api/comment'
import CommentItem from './comment-item'

export default {
  components: {
    CommentItem
  },
  created () {
    if (this.type !== 'c') {
      this.loading = true
      this.onLoad()
    }
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    newComment: {
      type: Object
      // required: true
    },
    type: {
      type: String,
      default: 'a',
      validator (value) {
        return ['a', 'c'].includes(value)
      }
    }
  },
  name: 'CommentList',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false,
      immediateCheck: false
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getCommentList({
          type: this.type,
          source: this.source,
          offset: this.offset,
          limit: this.limit
        })

        const { results, total_count: totalCount } = data.data
        // console.log(results)
        // console.log(totalCount)
        this.list.push(...results)

        this.$emit('changeCommentNum', totalCount)

        this.loading = false
        if (results.length < this.limit) {
          this.finished = true
        } else {
          this.offset = data.data.last_id
        }
      } catch (err) {
        console.log(err)
        this.error = true
        this.loading = false
      }
    },
    changeCommentLike (isLiked, comment) {
      if (isLiked) {
        comment.like_count--
      } else {
        comment.like_count++
      }
      comment.is_liking = !isLiked
    },
    replyClick ($event) {
      this.$emit('replyClick', $event)
    }
  },
  watch: {
    newComment (newObj) {
      this.list.unshift(newObj)
    }
    // source () {
    //   if (this.type === 'c') {
    //     this.onLoad()
    //   }
    // }
  }
}
</script>

<style scoped lang="less">

</style>
