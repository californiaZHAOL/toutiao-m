<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view></router-view>

    <!-- 底部导航栏 -->
    <van-tabbar class="table-bar" route>
      <van-tabbar-item to="/">
        <span class="text">首页</span>
        <template #icon>
          <i class="iconfont icon-shouye"></i>
        </template>
      </van-tabbar-item>

      <van-tabbar-item to="/qa">
        <span class="text">问答</span>
        <template #icon>
          <i class="iconfont icon-wenda"></i>
        </template>
      </van-tabbar-item>

      <van-tabbar-item to="/video">
        <span class="text">视频</span>
        <template #icon>
          <i class="iconfont icon-shipin"></i>
        </template>
      </van-tabbar-item>

      <van-tabbar-item to="/my">
        <span class="text">{{ $store.state.user ? '我的' : '未登录' }}</span>
        <template #icon>
          <i class="iconfont icon-wode"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="less">
.layout-container {
  .table-bar {
    .iconfont {
      font-size: 40px;
    }

    .text {
      font-size: 20px;
    }
  }
}
</style>
