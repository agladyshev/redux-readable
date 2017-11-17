import * as ServerAPIUtil from '../utils/api'

export const ADD_CATEGORY = 'ADD_CATEGORY'
export const ADD_POST = 'ADD_POST'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'


export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories 
})

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts 
})

export const receiveComments = (id, comments) => ({
  type: RECEIVE_COMMENTS,
  comments,
  id
})

export const fetchCategories = () => dispatch => (
  ServerAPIUtil
    .fetchCategories()
    .then(categories => dispatch(receiveCategories(categories.categories)))
)

export const fetchPosts = () => dispatch => (
  ServerAPIUtil
    .fetchPosts()
    .then(posts => dispatch(receivePosts(posts)))
)

export const fetchComments = (id) => dispatch => (
  ServerAPIUtil
    .fetchComments(id)
    .then(comments => dispatch(receiveComments(id, comments)))
  )

export function addCategory ({ name, path }) {
  return {
    type: ADD_CATEGORY,
    name,
    path,
  }
}

export function addPost ({ id, timestamp, title, body, author, category, voteScore, deleted }) {
  return {
    type: ADD_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    deleted
  }
}