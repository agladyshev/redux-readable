import { combineReducers } from 'redux'

import {
  ADD_CATEGORY,
  ADD_POST,
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
} from '../actions'

function categories (state = [], action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      const { categories } = action
      return categories
    case ADD_CATEGORY :
      const { name, path } = action
      return [
        ...state,
        {name, path}
      ]
    default :
      return state
  }
}

function posts (state = [], action) {
  switch (action.type) {
    case RECEIVE_POSTS :
      const { posts } = action
      return posts
    case ADD_POST :
      const { id, timestamp, title, body, author, category, voteScore, deleted } = action
      return [
        ...state,
        { id, timestamp, title, body, author, category, voteScore, deleted }
      ]
    default :
      return state
  }
}

export default combineReducers({
  categories,
  posts,
})