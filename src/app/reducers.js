import { combineReducers } from 'redux'
import commentReducer from '../comment/commentReducer'
import postReducer from '../post/postReducer'
import categoryReducer from '../navigation/categoryReducer'
import voteReducer from '../controls/voteReducer'
import sortReducer from '../controls/sortReducer'

export default combineReducers({
  categories: categoryReducer,
  posts: postReducer,
  comments: commentReducer,
  votes: voteReducer,
  sort: sortReducer
})

