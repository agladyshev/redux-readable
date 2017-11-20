import { combineReducers } from 'redux'

import {
  // ADD_CATEGORY,
  // ADD_POST,
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
  RECEIVE_POST,
  RECEIVE_COMMENTS,
  // RECEIVE_COMMENT,
} from '../actions'

function categories (state = [], action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      const { categories } = action
      return categories
    // case ADD_CATEGORY :
    //   const { name, path } = action
    //   return [
    //     ...state,
    //     {name, path}
    //   ]
    default :
      return state
  }
}

function posts (state = new Map([]), action) {

  switch (action.type) {
    case RECEIVE_POSTS :
      const { posts } = action
      const newState = new Map(state)
      posts.forEach(post => newState.set(post.id, post))
      return newState
    case RECEIVE_POST :
      const { id, timestamp, title, body, author, category, voteScore, deleted } = action
      return new Map(state.set(id, { id, timestamp, title, body, author, category, voteScore, deleted }))
    default :
      return state
  }
}

function comments (state = new Map([]), action) {
  switch (action.type) {
    case RECEIVE_COMMENTS :
      const { id, comments } = action
      const newState = new Map(state)
      return newState.set(id, comments)
    default :
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  comments
})