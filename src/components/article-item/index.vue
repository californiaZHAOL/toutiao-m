<template>
  <van-cell
    class="article-item"
    :to="'/article/' + article.art_id"
  >
    <!-- 插槽 -->
    <template #title >
      <div class="title van-multi-ellipsis--l2">{{ article.title }}</div>
    </template>

    <template #label>
      <!-- 三张封面 -->
      <div class="cover-wrap" v-if="article.cover.type === 3">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image
          class="cover-item-img"
            fit="cover"
            :src="img"
          />
        </div>
      </div>

      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count + '评论' }}</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </template>

    <!-- 单张封面 -->
    <template #default v-if="article.cover.type === 1">
      <van-image
        width="100"
        height="100"
        fit="cover"
        :src="article.cover.images[0]"
      />
    </template>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      required: true,
      type: Object
    }
  }
}
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }

  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
  }

  .right-cover {
    width: 232px;
    height: 146px;
  }

  .label-info-wrap {
    font-size: 22px;
    color: #b4b4b4;

    span {
      margin-right: 25px;
    }
  }

  .cover-wrap {
    display: flex;
    padding: 30px 0;

    .cover-item {
      flex: 1;
      height: 146px;

      &:not(:last-child) {
        margin-right: 6px;
      }

      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
