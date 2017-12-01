import * as PostAPI from './PostAPI'

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
  PostAPI
    .fetchPosts()
    .then(posts => dispatch(receivePosts(posts)))
)

export const fetchPostsByCategory = (category) => dispatch => (
  PostAPI
    .fetchPostsByCategory(category)
    .then(posts => dispatch(receivePosts(posts)))
)

export const fetchPost = (id) => dispatch => (
  PostAPI
    .fetchPost(id)
    .then(post => dispatch(receivePost(post)))
)

export const newPost = (post) => dispatch => (
  PostAPI
    .newPost(post)
    .then(post => dispatch(receivePost({ ...post })))
)

export const editPost = (post) => dispatch => (
  PostAPI
    .editPost(post)
    .then(post => dispatch(receivePost({ ...post })))
)
