import request from '@/utils/request'

export const getArticleList = params => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params: params
  })
}

export const getArticleById = id => {
  return request({
    method: 'GET',
    url: '/v1_0/articles/' + id
  })
}

// 收藏文章
export const collectArticle = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}

// 取消收藏文章
export const cancelCollectArticle = target => {
  return request({
    method: 'DELETE',
    url: '/v1_0/article/collections/' + target
  })
}

// 点赞文章
export const likeArticle = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target
    }
  })
}

// 取消点赞文章
export const cancelLikeArticle = target => {
  return request({
    method: 'DELETE',
    url: '/v1_0/article/likings/' + target
  })
}
