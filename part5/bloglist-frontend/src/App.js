import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = React.createRef()
  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    }
    )
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if(loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password, })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setErrorMessage(`Successfully logged in as  ${user.name}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setUsername('')
      setPassword('')
    }
  }
  const createBlog = (newObj) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(newObj)
      .then(returnedObj => {
        console.log(returnedObj)
        setBlogs(blogs.concat(returnedObj).sort((a, b) => a.likes - b.likes ))
        setErrorMessage( `created new blog ${returnedObj.title}` )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }
  const removeBlog = (id) => {
    blogService
      .deleteBlog(id)
      .then( () => {
        setBlogs(blogs.filter(blog => blog.id !== id).sort((a, b) => a.likes - b.likes))
      })
  }
  const updateBlog = (id, newObj) => {
    blogService
      .update(id, newObj)
      .then(returnedObj => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedObj).sort((a, b) => a.likes - b.likes ))
        setErrorMessage( `updated blog ${returnedObj.title}` )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }
  if(user===null) {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
          errorMessage={errorMessage}
        />
      </Togglable>
    )
  }
  else {
    return (
      <div>
        <h2>blogs</h2>
        {errorMessage && <p>{errorMessage}</p>}
        <h3>{ user.name } logged in</h3>
        <button onClick={() => { window.localStorage.removeItem('loggedUser'); setUser(null) }}>Log Out</button>

        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} user={user} removeBlog={removeBlog} />
        )}
      </div>
    )
  }
}

export default App
