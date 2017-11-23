import { combineReducers } from 'redux'

import {
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
  RECEIVE_POST,
  RECEIVE_COMMENTS,
  RECEIVE_COMMENT,
  RECEIVE_VOTE,
  CHANGE_SORT_METHOD
} from '../actions'

function categories(state = [], action) {
  switch (action.type) {
  case RECEIVE_CATEGORIES:
    const { categories } = action
    return categories
  default :
    return state
  }
}

function posts(state = new Map([]), action) {
  switch (action.type) {
  case RECEIVE_POSTS :
    const { posts } = action
    const newState = new Map(state)
    posts.forEach(post => newState.set(post.id, post))
    return newState
  case RECEIVE_POST :
    const {
      id,
      timestamp,
      title,
      body,
      author,
      category,
      voteScore,
      deleted,
      commentCount
    } = action
    return new Map(
      state.set(
        id, { id, timestamp, title, body, author, category, voteScore, deleted, commentCount }
      )
    )
  default :
    return state
  }
}

function comments(state = new Map([]), action) {
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

function votes(state = new Map([]), action) {
  switch (action.type) {
  case RECEIVE_VOTE :
    const { id, option } = action
    return new Map(state.set(id, option))
  default :
    return state
  }
}

function sort(state = 'timestamp', action) {
  switch (action.type) {
  case CHANGE_SORT_METHOD :
    const { sort } = action
    return sort
  default :
    return state
  }
}

export default combineReducers({
  categories,
  posts,
  comments,
  votes,
  sort
})
