import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'
import './api/server'
import { fetchTodos } from './features/todos/todosSlice'

store.dispatch(fetchTodos())

ReactDOM.render(
 
    <Provider store={store}>
      <App />
    </Provider>
  ,
  document.getElementById('root')
)
