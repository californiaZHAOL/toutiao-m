// 评论请求模块
import request from '@/utils/request'

// 获取文章评论列表
export const getCommentList = params => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}

// 点赞评论或者评论回复
export const likeComment = target => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}

// 取消评论或者评论回复
export const cancelLikeComment = target => {
  return request({
    method: 'DELETE',
    url: '/v1_0/comment/likings/' + target
  })
}

// 发布文章评论或者发布评论的回复
export const postComment = data => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
