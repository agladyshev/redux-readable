import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';



import { Provider } from 'react-redux'

import { fetchCategories } from './utils/api'
import { addCategory } from './actions'

import store from './store.js'


// fetchCategories().then((res) => {
//   res.categories.forEach(category => {
//     store.dispatch(addCategory(category))
//   })
// })

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter><App /></BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker();
