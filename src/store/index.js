import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'USER'

export default new Vuex.Store({
  state: {
    // 保存用户信息的对象
    user: getItem(TOKEN_KEY) || null
  },
  getters: {
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 持久存储
      setItem(TOKEN_KEY, data)
    }
  },
  actions: {
  },
  modules: {
  }
})
