<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="设置生日"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onUpdate"
    ></van-nav-bar>

    <!-- 输入框 -->
    <div class="filed-wrap">
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="20"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'

export default {
  name: 'UpdateName',
  data () {
    return {
      message: this.value
    }
  },
  props: ['value'],
  methods: {
    async onUpdate () {
      this.$toast.loading({
        message: '更新中',
        forbidClick: true,
        duration: 0
      })
      try {
        if (this.message.length === 0) {
          this.$toast.success('用户名不能为空')
          this.message = ''
        } else {
          await updateUserProfile({
            name: this.message
          })
          this.$emit('close')
          this.$emit('input', this.message)
          this.$toast.success('更新成功')
        }
      } catch (err) {
        console.log(err)
        this.$toast.fail('修改失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.filed-wrap {
  padding: 20px;
}
</style>
