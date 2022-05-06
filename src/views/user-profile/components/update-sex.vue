<template>
  <div class="update-sex">
    <!-- 导航栏 -->
    <van-nav-bar
      title="设置性别"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onUpdate"
    ></van-nav-bar>

    <!-- 选择框 -->
    <van-picker
      title="设置性别"
      :show-toolbar="false"
      :columns="columns"
      :defaultIndex="value"
      @change="onChange"
      :swipe-duration="100"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'

export default {
  name: 'UpdateSex',
  data () {
    return {
      columns: ['男', '女'],
      currentIndex: this.value
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
        // 未作出改变 立即提示成功
        if (this.currentIndex === this.value) {
          this.$toast.success('修改成功')
        } else {
          await updateUserProfile({
            gender: this.currentIndex
          })
        }
        // 关闭弹出层
        this.$emit('close')
        // 更新父组件的值
        this.$emit('input', this.currentIndex)
        // 更新成功的消息
        this.$toast.success('更新成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('修改失败')
      }
    },
    onChange (picker, value, index) {
      this.currentIndex = index
    }
  }
}
</script>

<style scoped lang="less">
.filed-wrap {
  padding: 20px;
}
</style>
