import * as ServerAPIUtil from '../utils/api'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POST = 'RECEIVE_POST'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'
export const RECEIVE_VOTE = 'RECEIVE_VOTE'

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

export function receivePost ({ id, timestamp, title, body, author, category, voteScore, deleted }) {
  return {
    type: RECEIVE_POST,
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

export const receiveComment = (comment) => ({
  type: RECEIVE_COMMENT,
  comment
})

export const receiveVote = (id, option) => ({
  type: RECEIVE_VOTE,
  id,
  option
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
    // .then(posts => console.log(posts))
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

export const fetchComments = (id) => dispatch => (
  ServerAPIUtil
    .fetchComments(id)
    .then(comments => dispatch(receiveComments(id, comments)))
)

export const fetchComment = (id) => dispatch => (
  ServerAPIUtil
    .fetchComment(id)
    .then(comment => dispatch(receiveComment(comment)))
)

export const newPost = (post) => dispatch => (
  ServerAPIUtil
    .newPost(post)
    // .then(res => console.log(res))
    .then(post => dispatch(receivePost({...post})))
)

export const editPost = (post) => dispatch => (
  ServerAPIUtil
    .editPost(post)
    // .then(res => console.log(res))
    .then(post => dispatch(receivePost({...post})))
)

export const deletePost = (id) => dispatch => (
  ServerAPIUtil
    .deletePost(id)
    .then(post => dispatch(receivePost({...post})))
)

export const votePost = (id, option) => dispatch => (
  ServerAPIUtil
    .votePost(id, option)
    .then(post => {
      dispatch(receivePost({...post}))
      dispatch(receiveVote(id, option))
    })
)

export const newComment = (parent, author, body) => dispatch => (
  ServerAPIUtil
    .newComment(parent, author, body)
    .then(comment => dispatch(receiveComment(comment)))
)

// export function addCategory ({ name, path }) {
//   return {
//     type: ADD_CATEGORY,
//     name,
//     path,
//   }
// }

