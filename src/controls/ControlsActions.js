import * as PostAPI from '../post/PostAPI'
import * as CommentAPI from '../comment/CommentAPI'
import { receivePost } from '../post/PostActions'
import { receiveComment, fetchComments } from '../comment/CommentActions'

export const RECEIVE_VOTE = 'RECEIVE_VOTE'
export const CHANGE_SORT_METHOD = 'CHANGE_SORT_METHOD'

export const receiveVote = (id, option) => ({
  type: RECEIVE_VOTE,
  id,
  option
})

export const changeSortMethod = (sort) => ({
  type: CHANGE_SORT_METHOD,
  sort
})

// Middleware methods below

export const deletePost = (id) => dispatch => (
  PostAPI
    .deletePost(id)
    .then(post => {
      dispatch(receivePost({ ...post }))
      dispatch(fetchComments(id))
    })
)

export const votePost = (id, option) => dispatch => (
  PostAPI
    .votePost(id, option)
    .then(post => {
      dispatch(receivePost({ ...post }))
      dispatch(receiveVote(id, option))
    })
)

export const deleteComment = id => dispatch => (
  CommentAPI
    .deleteComment(id)
    .then(comment => dispatch(receiveComment(comment)))
)

export const voteComment = (id, option) => dispatch => (
  CommentAPI
    .voteComment(id, option)
    .then(comment => {
      dispatch(receiveComment({ ...comment }))
      dispatch(receiveVote(id, option))
    })
)
