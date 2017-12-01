import {
  RECEIVE_COMMENTS,
  RECEIVE_COMMENT
} from './CommentActions'

const commentReducer = (state = new Map([]), action) => {
  // Comments stored as map within map, so it might get confusing a bit
  const newState = new Map(state)
  switch (action.type) {
  case RECEIVE_COMMENTS :
    const { id: postId, comments: allComments } = action
    const commentsById = new Map([])
    allComments.forEach(comment => commentsById.set(comment.id, comment))
    return newState.set(postId, commentsById)
  case RECEIVE_COMMENT :
    const {
      id,
      timestamp,
      body,
      author,
      voteScore,
      deleted,
      parentId,
      parentDeleted
    } = action.comment
    return newState.set(
      parentId, newState.get(parentId).set(
        id, { id, parentId, timestamp, body, author, voteScore, deleted, parentDeleted }
      )
    )
  default :
    return state
  }
}

export default commentReducer