
<template>
  <div class="my-container">

    <!-- 已登陆 -->
    <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <!-- img组件 -->
          <van-image
            fit="cover"
            :src="userInfo.photo"
            class="avatar"
            round
          />
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button
            type="default"
            size="mini"
            round
            class="editBtn"
            to="/user/profile"
          >编辑资料</van-button>
        </div>
      </div>
      <div class="data-status">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>

    <!-- 未登录 -->
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" class="mobile-img">
        <span class="text">登录/注册</span>
      </div>
    </div>

    <!-- Grid宫格 -->
    <van-grid :column-num="2" class="grid-nav" clickable>
      <!-- 可通过to属性来路由 -->
      <van-grid-item class="grid-item">
        <template v-slot:icon>
          <i class="iconfont icon-shoucang"></i>
        </template>
        <template v-slot:text>
          <span>收藏</span>
        </template>
      </van-grid-item>

      <van-grid-item>
        <template v-slot:icon>
          <i class="iconfont icon-lishi"></i>
        </template>
        <template v-slot:text>
          <span>历史</span>
        </template>
      </van-grid-item>
    </van-grid>

    <!-- 可通过to属性进行路由跳转 -->
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link class="link-2"/>
    <van-cell title="退出登录" center class="link-exit" v-if="user" @click="onLogout" clickable/>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'

export default {
  name: 'MyIndex',
  data () {
    return {
      // 用户信息对象
      userInfo: {}
    }
  },
  created () {
    // 如果用户登陆了 请求数据
    if (this.user) {
      this.loadUserInfo()
    }
  },
  methods: {
    // 退出登录
    onLogout () {
      // 确认退出弹窗
      this.$dialog.confirm({
        title: '确认退出？'
      })
        .then(() => {
          // 确认退出 清空登录token
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (err) {
        this.$toast('请求失败')
      }
    }
  },
  computed: {
    ...(mapState(['user']))
  }
}
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    background: url(@/assets/banner.png);
    background-size: cover;
  }

  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;

    .login-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      // 更换主轴方向
      flex-direction: column;

      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }

      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }

  .user-info {
    .base-info {
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 231px;
      padding: 76px 32px 23px;

      .left {
        display: flex;
        align-items: center;

        .avatar {
          height: 132px;
          width: 132px;
          margin-right: 23px;
          border: 4px solid #fff;
        }

        span {
          font-size: 30px;
          color: #fff;
        }
      }

      .right {
        .editBtn {
          width: 120px;
        }
      }
    }
    .data-status {
      display: flex;
      justify-content: ;
      height: 130px;

      .data-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        color: #fff;

        .count {
          font-size: 36px;
        }

        .text {
          font-size: 23px;
        }
      }
    }
  }

  .grid-nav {
    height: 141px;
    margin-bottom: 35px;

    .iconfont {
      font-size: 45px;
    }

    span {
      font-size: 28px;
    }

    .icon-shoucang {
      color: #EB5253;
    }

    .icon-lishi {
      color: #ff9d1d;
    }
  }

  .link-2 {
    margin-bottom: 15px;
  }

  .link-exit {
    color: red;
    text-align: center;
  }
}
</style>
