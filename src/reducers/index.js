import { combineReducers } from 'redux'

import {
  ADD_CATEGORY,
  ADD_POST,
} from '../actions'

function categories (state = [], action) {
  switch (action.type) {
    case ADD_CATEGORY :
      const { name, path } = action
      console.log(state)
      console.log()
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