<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>

    <!-- 选择文件 -->
    <input
      type="file"
      hidden
      ref="file"
      @change="onFileChange"
    >

    <van-cell
      title="头像"
      is-link
      class="userImg"
      @click="$refs.file.click()"
    >
      <template>
        <van-image
          class="avater"
          fit="cover"
          round
          :src="user.photo"
        />
      </template>
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isUpdateNameShow = true"
    />
    <van-cell
      title="性别"
      :value="user.gender === 1 ? '女' : '男'"
      is-link
      @click="isUpdateSexShow = true"
    />
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isUpdateBirthdayShow = true"
    />

    <!-- 编辑昵称 -->
    <van-popup
      v-model="isUpdateNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
     <update-name
      v-if="isUpdateNameShow"
      @close="isUpdateNameShow = false"
      v-model="user.name"
     ></update-name>
    </van-popup>

    <!-- 编辑性别 -->
    <van-popup
      v-model="isUpdateSexShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
     <update-sex
      v-if="isUpdateSexShow"
      @close="isUpdateSexShow = false"
      v-model="user.gender"
     ></update-sex>
    </van-popup>

    <!-- 编辑生日 -->
    <van-popup
      v-model="isUpdateBirthdayShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
     <update-birthday
      v-if="isUpdateBirthdayShow"
      @close="isUpdateBirthdayShow = false"
      v-model="user.birthday"
     ></update-birthday>
    </van-popup>

    <!-- 编辑头像 -->
    <van-popup
      v-model="isUpdatePhotoShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
     <update-photo
      v-if="isUpdatePhotoShow"
      @close="isUpdatePhotoShow = false"
      v-model="user.birthday"
      :img="img"
      @updateImg="updateImg"
     ></update-photo>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update.vue'
import UpdateSex from './components/update-sex.vue'
import UpdateBirthday from './components/update-birthday.vue'
import UpdatePhoto from './components/update-photo.vue'

export default {
  components: {
    UpdateName,
    UpdateSex,
    UpdateBirthday,
    UpdatePhoto
  },
  name: 'UserProfile',
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (err) {
        this.$toast.fail('请求失败')
        console.log(err)
      }
    },
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文件对象获取blob数据
      this.img = window.URL.createObjectURL(file)
      this.$refs.file.value = ''
      this.isUpdatePhotoShow = true
    },
    updateImg ($event) {
      this.user.photo = $event
    }
  },
  data () {
    return {
      user: {},
      isUpdateNameShow: false,
      isUpdateSexShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar .van-icon {
  color: #fff;
}
.avater {
  width: 60px;
  height: 60px;
}
.userImg {
  .van-cell__left-icon, .van-cell__right-icon {
    position: relative;
    top: 10px;
  }
}
/deep/ .van-nav-bar__text {
  color: white;
}

.van-popup {
  background-color: #f5f7f9;
}
</style>
