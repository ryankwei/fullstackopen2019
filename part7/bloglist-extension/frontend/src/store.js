import blogReducer from './reducers/blogReducer'
import messageReducer from './reducers/messageReducer'
import userReducer from './reducers/userReducer'
import actualUserReducer from './reducers/actualUserReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  blogs: blogReducer,
  message: messageReducer,
  user: userReducer,
  userList: actualUserReducer
})
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
export default store
