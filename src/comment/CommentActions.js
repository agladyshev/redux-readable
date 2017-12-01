import * as ServerAPIUtil from '../utils/api'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'

export const receiveComments = (id, comments) => ({
  type: RECEIVE_COMMENTS,
  comments,
  id
})

export const receiveComment = (comment) => ({
  type: RECEIVE_COMMENT,
  comment
})

// Middleware methods below

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

export const newComment = (parent, author, body) => dispatch => (
  ServerAPIUtil
    .newComment(parent, author, body)
    .then(comment => dispatch(receiveComment(comment)))
)

export const editComment = (comment) => dispatch => (
  ServerAPIUtil
    .editComment(comment)
    .then(comment => dispatch(receiveComment({ ...comment })))
)
