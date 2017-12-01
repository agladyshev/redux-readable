import {
  RECEIVE_POSTS,
  RECEIVE_POST
} from './PostActions'

const postReducer = (state = new Map([]), action) => {
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

export default postReducer
