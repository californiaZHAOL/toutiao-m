<template>
  <van-button
    v-if="!is_followed"
    @click="onFollow"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="followLoading"
  >关注</van-button>
  <van-button
    v-else
    @click="onFollow"
    class="follow-btn"
    round
    size="small"
    :loading="followLoading"
  >已关注</van-button>
</template>

<script>
import { addFollow, delFollow } from '@/api/user'

export default {
  name: 'FollowIndex',
  props: {
    is_followed: {
      required: true,
      type: Boolean
    },
    aut_id: {
      required: true,
      type: [Number, String, Object]
    }
  },
  data () {
    return {
      followLoading: false
    }
  },
  methods: {
    async onFollow () {
      this.followLoading = true
      try {
        if (this.is_followed) {
          // 如果已关注 则取消关注
          await delFollow(this.aut_id)
        } else {
          // 如果未关注 则关注
          await addFollow(this.aut_id)
        }
        this.$emit('changeFollow')
        // this.is_followed = !this.is_followed
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.$toast('你不能关注你自己')
        } else {
          this.$toast('操作失败')
        }
        // console.log(err)
      }
      this.followLoading = false
    }
  }
}
</script>

<style scoped lang="less">

</style>
