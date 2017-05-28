import { createTile } from 'redux-tiles'

export const images = createTile({
  type: ['api', 'images'],
  fn: ({ api, params }) => api.get('/v2/api/images', { params }),
  nesting: ({ type }) => [type],
  caching: true
})

export const articles = createTile({
  type: ['api', 'articles'],
  fn: ({ api }) => api.get('/v1/api/articles'),
  caching: true
})

export const stories = createTile({
  type: ['api', 'stories'],
  fn: ({ api }) => api.get('/v1/api/stories'),
  caching: true
})

export const story = createTile({
  type: ['api', 'story'],
  fn: ({ api, params }) => api.get(`/v1/api/stories/${params.id}`),
  nesting: ({ id }) => [id],
  caching: true
})

export default [images, articles, stories, story]
