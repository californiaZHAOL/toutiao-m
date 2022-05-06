import Vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

// 加载中文语言包
dayjs.locale('zh-cn')

// 配置处理相对时间的插件
dayjs.extend(relativeTime)

// 定义全局过滤器
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
