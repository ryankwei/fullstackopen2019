import React, { useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ({ blog, updateBlog, user, removeBlog }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display : visible ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const handleLike = (event) => {
    event.preventDefault()

    const newObj = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes+1,
    }
    updateBlog(blog.id, newObj)
  }
  const handleRemove = (event) => {
    event.preventDefault()
    const conf = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if(conf) removeBlog(blog.id)
  }
  return (
    <div style={blogStyle} id="Blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <a href={blog.url}>{blog.url}</a>
        <p>likes: {blog.likes}  <button onClick={handleLike}>Like</button></p>
        <p>added by {blog.user.username}</p>
        {user.id === blog.user.id && <button onClick={handleRemove} id="deleteButton">remove</button>}
      </div>
    </div>
  )
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  removeBlog: PropTypes.func.isRequired
}
export default Blog
