import * as ServerAPIUtil from '../utils/api'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POST = 'RECEIVE_POST'

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
})

export function receivePost(
  { id, timestamp, title, body, author, category, voteScore, deleted, commentCount }) {
  return {
    type: RECEIVE_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    deleted,
    commentCount
  }
}

// Middleware methods below

export const fetchPosts = () => dispatch => (
  ServerAPIUtil
    .fetchPosts()
    .then(posts => dispatch(receivePosts(posts)))
)

export const fetchPostsByCategory = (category) => dispatch => (
  ServerAPIUtil
    .fetchPostsByCategory(category)
    .then(posts => dispatch(receivePosts(posts)))
)

export const fetchPost = (id) => dispatch => (
  ServerAPIUtil
    .fetchPost(id)
    .then(post => dispatch(receivePost(post)))
)

export const newPost = (post) => dispatch => (
  ServerAPIUtil
    .newPost(post)
    .then(post => dispatch(receivePost({ ...post })))
)

export const editPost = (post) => dispatch => (
  ServerAPIUtil
    .editPost(post)
    .then(post => dispatch(receivePost({ ...post })))
)
