// import { combineReducers } from 'redux'

import {
  ADD_CATEGORY
} from '../actions'

function categories (state = {}, action) {
  switch (action.type) {
    case ADD_CATEGORY :
      console.log(action)
      const { name, path } = action
      console.log(name, path)
      return {
        ...state,
        [name]: path,
      }
    default :
      return state
  }
}

export default categories