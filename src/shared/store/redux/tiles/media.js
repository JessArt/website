import { createTile } from "redux-tiles";

export const images = createTile({
  type: ["api", "images"],
  fn: async ({ api, params }) =>
    api.get("/v1/images", { params: { pageSize: 20, ...params } }),
  nesting: ({ type, tags = ["default"], pageNumber = 0, pageSize = 20 }) => [
    type,
    tags.join(""),
    pageNumber,
    pageSize
  ],
  caching: true
});

export const image = createTile({
  type: ["api", "image"],
  fn: async ({ api, params }) => api.get(`/v1/images/${params.id}`),
  nesting: ({ id }) => [id],
  caching: true
});

export const articles = createTile({
  type: ["api", "articles"],
  fn: ({ api }) => api.get("/v1/articles"),
  caching: true
});

export const tumblr = createTile({
  type: ["api", "tumblr"],
  fn: ({ api }) => api.get("/v1/progress")
});

export const stories = createTile({
  type: ["api", "stories"],
  fn: ({ api }) => api.get("/v1/api/stories"),
  caching: true
});

export const story = createTile({
  type: ["api", "story"],
  fn: ({ api, params }) => api.get(`/v1/api/stories/${params.id}`),
  nesting: ({ id }) => [id],
  caching: true
});

export const topTags = createTile({
  type: ["api", "topTags"],
  fn: ({ api, params }) =>
    api.get("/v1/top_tags", { params: { ...params, nesting: 2 } }),
  nesting: ({ type }) => [type]
});

export const feedback = createTile({
  type: ["api", "feedback"],
  fn: ({ api, params }) => api.post("/v1/feedback", { params })
});

export const subscribe = createTile({
  type: ["api", "subscribe"],
  fn: ({ api, params }) => api.post("/v1/subscribe", { params })
});

export default [
  images,
  articles,
  stories,
  story,
  topTags,
  tumblr,
  image,
  subscribe,
  feedback
];
