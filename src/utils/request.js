// 请求模块 基于axios
import axios from 'axios'

const request = axios.create({
  // 接口的基路径
  baseURL: 'http://toutiao.itheima.net'
})

export default request