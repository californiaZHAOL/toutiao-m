<template>
  <div class="update-photo">
    <img :src="img" ref="image">
    <div class="tool-bar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="finish" @click="onUpdataImage">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api/user'

export default {
  mounted () {
    const image = this.$refs.image
    const cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
    this.cropper = cropper
  },
  name: 'UpdateBirthday',
  data () {
    return {
      cropper: null
      // minDate: new Date(1970, 1, 1),
      // maxDate: new Date(),
      // currentDate: new Date(this.value)
    }
  },
  props: ['img'],
  methods: {
    // async onUpdate () {
    //   this.$toast.loading({
    //     message: '更新中',
    //     forbidClick: true,
    //     duration: 0
    //   })
    //   try {
    //     await updateUserProfile({
    //       birthday: dayjs(this.currentDate).format('YYYY-MM-DD')
    //     })
    //     // 关闭弹出层
    //     this.$emit('close')
    //     // 更新父组件的值
    //     this.$emit('input', dayjs(this.currentDate).format('YYYY-MM-DD'))
    //     // 更新成功的消息
    //     this.$toast.success('更新成功')
    //     console.log('11')
    //   } catch (err) {
    //     console.log(err)
    //     this.$toast.fail('修改失败')
    //   }
    // }
    onUpdataImage () {
      this.cropper.getCroppedCanvas().toBlob(async blob => {
        this.$toast.loading({
          message: '更新中',
          forbidClick: true,
          duration: 0
        })
        const formData = new FormData()
        formData.append('photo', blob)
        try {
          const { data } = await updateUserPhoto(formData)
          this.$toast.success('更新成功')
          // 更新视图
          this.$emit('updateImg', data.data.photo)
        } catch (err) {
          console.log(err)
          this.$toast.fail('修改失败')
        }
        // 关闭弹层
        this.$emit('close')
      })
    }
  }
}
</script>

<style scoped lang="less">
img {
  max-width: 100%;
}
.update-photo {
  background-color: #000;
  height: 100%;
  display: block;
  max-width: 100%;

  .tool-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;

    .cancel, .finish {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
    }
  }
}
</style>
