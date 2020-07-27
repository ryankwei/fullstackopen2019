import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import Store from './store'
import { BrowserRouter as Router } from "react-router-dom"
const renderApp = () => { ReactDOM.render(
  <Router>
    <Provider store={Store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
) }

renderApp()

Store.subscribe(renderApp)
