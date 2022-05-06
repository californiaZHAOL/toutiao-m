<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <template #title>
        <div class="title-text">我的频道</div>
      </template>
      <van-button
        type="danger"
        plain
        round
        size="mini"
        class="edit-btn"
        @click="isEdit = !isEdit"
      >{{ isEdit ? '完成' : '编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item my-grid"
        v-for="(channel, index) in channels"
        :key="index"
        @click="updateChannel(channel.id)"
      >
        <template #text>
          <span class="text" :class="{active: index === active}">{{ channel.name }}</span>
        </template>

        <template #icon>
          <van-icon name="clear" v-show="isEdit && channel.id !== 0" @click="removeChannel(channel.id)"></van-icon>
        </template>
      </van-grid-item>
    </van-grid>

    <van-cell :border="false" class="recommed-cell">
      <template #title>
        <div class="title-text">频道推荐</div>
      </template>
    </van-cell>
    <van-grid :gutter="10" class="recommed-grid">
      <van-grid-item
        v-for="(channel, index) in recommendChannels"
        icon="plus"
        class="grid-item"
        :key="index"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
// import { mapState } from 'vuex'
// import { setItem } from '@/utils/storage'

export default {
  data () {
    return {
      allChannels: [],
      isEdit: false
    }
  },
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        console.log(err)
      }
    },
    onAddChannel (channel) {
      this.$emit('addChannel', channel)
      // 违反单向数据流
      // this.channels.push(channel)
    },
    removeChannel (id) {
      this.$emit('removeChannel', id)
    },
    updateChannel (id) {
      if (!this.isEdit) {
        this.$emit('updateChannel', id)
      }
    }
  },
  created () {
    this.loadAllChannels()
  },
  computed: {
    recommendChannels () {
      return this.allChannels.filter(item => this.channels.findIndex(value => value.id === item.id) === -1)
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
    padding: 85px 0;

    .title-text {
      font-size: 32px;
      color: #333;
    }

    .edit-btn {
      width: 104px;
      height: 48px;
      font-size: 26px;
      color: #f85959;
      border: 1px solid f85959;
    }

    /deep/ .grid-item {
      width: 160px;
      height: 86px;

      .van-grid-item__content {
        background-color: #f4f5f6;
        white-space: nowrap;

        .van-grid-item__icon-wrapper {
          position: unset;
        }

        .van-grid-item__text, .text {
          font-size: 28px;
          color: #222;
          margin-top: 0;
        }
      }
    }

    /deep/ .recommed-grid {
      .van-grid-item__content {
        flex-direction: row;

        .van-icon {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }

    /deep/ .my-grid {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 3;
      }
    }

    .active {
      color: red !important;
    }
}
</style>
