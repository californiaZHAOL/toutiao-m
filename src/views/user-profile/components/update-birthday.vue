<template>
  <div class="update-birthday">
    <!-- 导航栏 -->
    <van-nav-bar
      title="设置生日"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onUpdate"
    ></van-nav-bar>

    <!-- 选择生日框 -->
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      :show-toolbar="false"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'

export default {
  name: 'UpdateBirthday',
  data () {
    return {
      minDate: new Date(1970, 1, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
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
        await updateUserProfile({
          birthday: dayjs(this.currentDate).format('YYYY-MM-DD')
        })
        // 关闭弹出层
        this.$emit('close')
        // 更新父组件的值
        this.$emit('input', dayjs(this.currentDate).format('YYYY-MM-DD'))
        // 更新成功的消息
        this.$toast.success('更新成功')
        console.log('11')
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
