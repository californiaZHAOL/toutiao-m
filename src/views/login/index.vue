<template>
  <div class="login-container">

		<!-- 顶部导航栏 -->
		<van-nav-bar
      title="登录"
      class="page-bav-bar"
		/>

		<!-- 登录表单 -->
		<van-form @submit="onSubmit">
      <!-- 手机号 -->
      <van-field
        v-model="user.mobile"
        name="用户名"
        placeholder="请输入手机号"
      >
        <!-- 使用具有名插槽 -->
        <template v-slot:left-icon>
          <i class="iconfont icon-shouji"></i>
        </template>
      </van-field>

      <!-- 验证码 -->
      <van-field
        v-model="user.code"
        name="密码"
        placeholder="请输入验证码"
        left-icon="smile-o"
      >
        <!-- 使用具有名插槽 -->
        <template v-slot:left-icon>
          <i class="iconfont icon-yanzhengma"></i>
        </template>
        <template #button>
          <van-button size="small" type="default" round class="send-sms-btn">获取验证码</van-button>
        </template>
      </van-field>

      <!-- 登录按钮 -->
      <div class="login-btn-wrap">
        <van-button block type="info" native-type="submit" class="login-btn">登录</van-button>
      </div>
    </van-form>

    <div class="login-private">
      <span>隐私条款</span>
    </div>

	</div>
</template>

<script>
import { login } from '@/api/user'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    // 表单提交事件 点击登录
    async onSubmit () {
      // 获取表单数据
      const user = this.user
      // 提示 正在加载
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      // 发起请求
      try {
        await login(user)
        // 登陆成功
        this.$toast.success('登陆成功')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或者验证码错误')
        } else {
          this.$toast.fail('登陆失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
/* 字体图标大小 */
.login-container{
  .iconfont{
    font-size: 37px;
    margin-right: 13px;
  }
  .send-sms-btn{
    background-color: #ededed;
    width: 159px;
    height: 46px;
    line-height: 46px;

    .van-button__text{
      font-size: 22px;
      color: #666;
    }
  }
  .login-btn-wrap{
    padding: 53px 33px;
    .login-btn{
      background-color: #6db4fb;
      border: none;
      border-radius: 10px;
    }
  }
  .login-private{
    font-size: 25px;
    font-weight: normal;
    letter-spacing: 1px;
    color: #666666;
    text-align: center;
    margin-top: 760px;
  }
}
</style>
