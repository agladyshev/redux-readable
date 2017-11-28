import {
  RECEIVE_VOTE
} from '../actions'

const voteReducer = (state = new Map([]), action) => {
  switch (action.type) {
  case RECEIVE_VOTE :
    const { id, option } = action
    return new Map(state.set(id, option))
  default :
    return state
  }
}

export default voteReducer
