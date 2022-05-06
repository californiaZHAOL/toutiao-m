<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="postComment"
      :disabled="!message.trim().length"
    >发布</van-button>
  </div>
</template>

<script>
import { postComment } from '@/api/comment'

export default {
  name: 'CommentPost',
  // 接收父组件注入的依赖
  inject: ['articleId'],
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async postComment () {
      try {
        const { data } = await postComment({
          target: this.target,
          content: this.message,
          art_id: this.articleId ? this.articleId : null
        })
        this.$toast.success('评论成功')
        this.message = ''
        this.$emit('successComment', data.data.new_obj)
        this.$emit('successCommentReply', data.data.new_obj)
      } catch (err) {
        this.$toast.fail('评论失败')
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
