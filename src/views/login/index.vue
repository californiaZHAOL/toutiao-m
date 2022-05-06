<template>
  <div class="login-container">

		<!-- 顶部导航栏 -->
		<van-nav-bar
      title="登录"
      class="page-bav-bar"
      @click-left="$router.back()"
      left-arrow
		/>

		<!-- 登录表单 -->
		<van-form @submit="onSubmit" ref="loginForm">
      <!-- 手机号 -->
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <!-- 使用具有名插槽 -->
        <template v-slot:left-icon>
          <i class="iconfont icon-shouji"></i>
        </template>
      </van-field>

      <!-- 验证码 -->
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        left-icon="smile-o"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <!-- 使用具有名插槽 -->
        <template v-slot:left-icon>
          <i class="iconfont icon-yanzhengma"></i>
        </template>
        <template #button>
          <!-- 倒计时组件 -->
          <van-count-down :time="time" format="sss后重新获取" v-if="isCountDownShow" @finish="isCountDownShow = false"/>
          <van-button
            v-else
            size="small"
            type="default"
            round
            class="send-sms-btn"
            native-type="button"
            @click="onSendSms"
          >获取验证码</van-button>
        </template>
      </van-field>

      <!-- 登录按钮 -->
      <div class="login-btn-wrap">
        <van-button
          block
          type="info"
          native-type="submit"
          class="login-btn"
        >登录</van-button>
      </div>
    </van-form>

    <div class="login-private">
      <span>隐私条款</span>
    </div>

	</div>
</template>

<script>
import { login, sendSms } from '@/api/user'

export default {
  name: 'LoginIndex',
  data () {
    return {
      // 是否显示倒计时
      isCountDownShow: false,
      // 倒计时时长
      time: 60 * 1000,
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
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
        // 弹窗时禁止点击后面的页面
        forbidClick: true,
        duration: 0
      })
      // 发起请求
      try {
        const { data } = await login(user)
        // 登陆成功 在vuex中存数据
        this.$store.commit('setUser', data.data)
        // 登陆成功
        this.$toast.success('登陆成功')
        // 跳转
        this.$router.back()
      } catch (err) {
        console.log(err)
        if (err.response && err.response.status === 400) {
          this.$toast.fail('手机号或者验证码错误')
        } else {
          this.$toast.fail('登陆失败，请稍后重试')
        }
      }
    },
    // 点击发送验证码
    async onSendSms () {
      // 验证手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败')
      }

      // 验证成功 显示倒计时
      this.isCountDownShow = true

      // 发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast.success('发送成功')
      } catch (err) {
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，稍等一会')
        } else {
          this.$toast.fail('后台错误')
        }
        // 发送失败 关闭倒计时
        this.isCountDownShow = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
/* 字体图标大小 */
.login-container{
  .van-nav-bar__text {
    color: #fff;
    vertical-align: middle;
  }
  .van-nav-bar__arrow {
    color: #fff;
    vertical-align: middle;
  }
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
