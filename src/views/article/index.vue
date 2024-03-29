<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">{{ article.pubdate | relativeTime }}</div>
          <!-- 关注用户组件 -->
          <follow-user
            :is_followed = article.is_followed
            class="follow-btn"
            :aut_id="article.aut_id"
            @changeFollow="changeFollow"
          ></follow-user>
          <!-- <van-button
            v-if="!article.is_followed"
            @click="onFollow"
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            :loading="followLoading"
          >关注</van-button>
          <van-button
            v-else
            @click="onFollow"
            class="follow-btn"
            round
            size="small"
            :loading="followLoading"
          >已关注</van-button> -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body" v-html="article.content" ref="article-content"></div>
        <van-divider>正文结束</van-divider>

        <!-- 评论列表 -->
        <article-comment
          :source="article.art_id"
          :newComment="newComment"
          @changeCommentNum="totalCommentCount = $event"
          @replyClick="onReplyClick"
        ></article-comment>

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostShow = true"
          >写评论</van-button>
          <van-icon
            name="comment-o"
            :info="totalCommentCount"
            color="#777"
          />
          <collect-article
            v-model="article.is_collected"
            :articleId="article.art_id"
          ></collect-article>
          <!-- <van-icon
            color="#777"
            name="star-o"
          /> -->
          <like-article
            v-model="article.attitude"
            :articleId="article.art_id"
          ></like-article>
          <!-- <van-icon
            color="#777"
            name="good-job-o"
          /> -->
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->

        <van-popup
          v-model="isPostShow"
          closeable
          position="bottom"
          round
        >
          <comment-post
            :target="article.art_id"
            @successComment="successComment"
          ></comment-post>
        </van-popup>

      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <van-popup
      v-model="isReplyShow"
      closeable
      position="bottom"
      round
      :style="{ height: '90%' }"
    >
      <comment-reply
        :currentComment="currentComment"
        ref="comment-reply"
        @addReplyComment="addReplyComment"
      ></comment-reply>
    </van-popup>
  </div>
</template>

<script>
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant'
import FollowUser from '@/components/follow-user'
import CollectArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-article'
import ArticleComment from './components/article-comment.vue'
import CommentPost from './components/comment-post.vue'
import CommentReply from './components/comment-reply.vue'

export default {
  name: 'ArticleIndex',
  provide () {
    // 依赖注入
    return {
      articleId: this.articleId
    }
  },
  components: { FollowUser, CollectArticle, LikeArticle, ArticleComment, CommentPost, CommentReply },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      article: {},
      loading: true,
      errStatus: 0,
      totalCommentCount: 0,
      isPostShow: false,
      newComment: {},
      isReplyShow: false,
      currentComment: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {},
  methods: {
    async loadArticle () {
      this.loading = true
      try {
        // 测试代码 随机产生错误
        // if (Math.random() < 0.5) {
        //   throw new Error('aa')
        // }

        const { data } = await getArticleById(this.articleId)
        this.article = data.data

        // 初始化图片点击预览
        setTimeout(() => {
          this.previewImage()
        }, 0)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
        console.log(err)
      }
      this.loading = false
    },
    previewImage () {
      const imgs = this.$refs['article-content'].querySelectorAll('img')
      const images = []

      imgs.forEach((item, index) => {
        images.push(item.src)
        item.onclick = () => {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    },
    changeFollow () {
      this.article.is_followed = !this.article.is_followed
    },
    successComment (newComm) {
      this.isPostShow = false
      this.totalCommentCount++
      this.newComment = newComm
    },
    onReplyClick (comment) {
      this.isReplyShow = true
      this.currentComment = comment
      this.$nextTick(() => {
        this.$refs['comment-reply'].loadReply()
      })
    },
    addReplyComment () {
      // 回复评论数据增加了
      this.currentComment.reply_count++
    }
  }
}
</script>

<style scoped lang="less">
@import "./github-markdown.css";

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
