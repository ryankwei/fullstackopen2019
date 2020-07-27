import React, { useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Menu from './components/Menu'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { pullUser, removeUser } from './reducers/userReducer'
import { setNotification } from './reducers/messageReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from './reducers/actualUserReducer'
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom"
import User from './components/User'
import UserList from './components/UserList'
import { Button } from 'react-bootstrap'
const App = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const blogs = useSelector(state => state.blogs)
  const message = useSelector(state => state.message)
  const user = useSelector(state => state.user)
  const userList = useSelector(state => state.userList)

  const dispatch = useDispatch()
  const blogFormRef = React.createRef()
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    const res = pullUser()
    if(res)
      dispatch(res)
  }, [dispatch])

  const matchUsers = useRouteMatch('/users/:id')
  const matchBlogs = useRouteMatch('/blogs/:id')
  const init_blog = (newObj) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(newObj))
    dispatch(setNotification( `created new blog ${newObj.title}` ))
  }
  const viewUser = matchUsers ? userList.find(u => u.id === matchUsers.params.id) : null
  const viewBlog = matchBlogs ? blogs.find(b => b.id === matchBlogs.params.id) : null

  if(user === null)
    return (<div className="container"><Togglable buttonLabel='login'><LoginForm /></Togglable></div>)
  return (
    <div className="container">
      <h2>blogs</h2>
      <Menu user={user} />
      {message && <p>{message}</p>}
      <Button onClick={() => { window.localStorage.removeItem('loggedUser'); dispatch(removeUser()) }}>Log Out</Button>
      <Switch>
        <Route path="/blogs/:id">
          <Blog blog={viewBlog} />
        </Route>
        <Route path="/users/:id">
          <User user={viewUser} />
        </Route>
        <Route path="/users">
          <UserList />
        </Route>
        <Route path="/">
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={init_blog} />
          </Togglable>
          {blogs.map(blog =>
            <div key={blog.id} style={blogStyle}>
              <Link to={`blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
            </div>
          )}
        </Route>
      </Switch>
    </div>
  )
}

export default App
