<template>
  <div class="comment-replay">
    <van-nav-bar
      :title="currentComment.reply_count > 0 ? currentComment.reply_count + '条回复' : '暂无回复'"
    ></van-nav-bar>

    <div class="scroll-wrap">
      <comment-item
        :comment="currentComment"
        @changeCommentLike="changeCommentLike"
      ></comment-item>

      <van-cell title="全部回复"/>

      <article-comment
        :source="currentComment.com_id"
        type="c"
        ref="article-comment"
      ></article-comment>
    </div>

    <!-- 发布评论 -->
    <div class="post_wrap">
      <van-button
        round
        size="small"
        class="post-btn"
        @click="replyCommentShow = true"
      >
        <!-- <comment-post
          :target="currentComment.com_id"
        ></comment-post> -->
        回复
      </van-button>
    </div>

    <!-- 回复评论弹出层 -->
    <van-popup
      v-model="replyCommentShow"
      position="bottom"
      closeable
    >
      <comment-post
        :target="currentComment.com_id"
        @successCommentReply="successCommentReply"
      ></comment-post>
    </van-popup>
  </div>
</template>

<script>
import ArticleComment from './article-comment.vue'
import commentItem from './comment-item.vue'
import CommentPost from './comment-post.vue'

export default {
  data () {
    return {
      replyCommentShow: false
    }
  },
  components: { commentItem, ArticleComment, CommentPost },
  name: 'CommentReply',
  props: {
    currentComment: {
      type: Object,
      required: true
    }
  },
  methods: {
    changeCommentLike (isLiked, comment) {
      if (isLiked) {
        comment.like_count--
      } else {
        comment.like_count++
      }
      comment.is_liking = !isLiked
    },
    loadReply () {
      this.$refs['article-comment'].list = []
      this.$refs['article-comment'].loading = true
      this.$refs['article-comment'].finished = false
      this.$refs['article-comment'].offset = null
      this.$refs['article-comment'].onLoad()
    },
    successCommentReply ($event) {
      // 请求成功触发这个事件处理函数 关闭弹出层
      this.replyCommentShow = false
      // 改变数据
      this.$emit('addReplyComment', $event)
      this.$refs['article-comment'].list.unshift($event)
    }
  }
}
</script>

<style scoped lang="less">
.post_wrap {
  height: 88px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #eee;

  .post-btn {
    width: 60%;
  }
}

.scroll-wrap {
  position: fixed;
  top: 260px;
  left: 0;
  bottom: 88px;
  overflow-y: auto;
  right: 0;
}
</style>
