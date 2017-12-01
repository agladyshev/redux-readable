import * as CategoryAPI from './CategoryAPI'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
})

// Middleware methods below

export const fetchCategories = () => dispatch => (
  CategoryAPI
    .fetchCategories()
    .then(categories => dispatch(receiveCategories(categories.categories)))
)
