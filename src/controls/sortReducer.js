import {
  CHANGE_SORT_METHOD
} from '../actions'

const sortReducer = (state = 'timestamp', action) => {
  switch (action.type) {
  case CHANGE_SORT_METHOD :
    const { sort } = action
    return sort
  default :
    return state
  }
}

export default sortReducer
