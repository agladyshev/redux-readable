import {
  RECEIVE_CATEGORIES
} from './CategoryActions'

const categoryReducer = (state = [], action) => {
  switch (action.type) {
  case RECEIVE_CATEGORIES:
    const { categories } = action
    return categories
  default :
    return state
  }
}

export default categoryReducer
