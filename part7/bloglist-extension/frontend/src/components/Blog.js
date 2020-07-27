import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/messageReducer'
import { ListGroup, Form, Button } from 'react-bootstrap'
const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [comment, setComment] = useState('')
  if(!blog) return null

  const handleLike = (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog.id))
    dispatch(setNotification(`liked blog ${blog.title}`))
  }
  const handleComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(comment, blog.id))
    setComment('')
  }
  const handleRemove = (event) => {
    event.preventDefault()
    const conf = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if(conf) {
      dispatch(removeBlog(blog.id))
      dispatch(setNotification(`removed blog ${blog.title}`))
    }
  }
  //console.log(blog)
  return (
    <div id="Blog">
      <h1>{blog.title} {blog.author}</h1>
      <a href={blog.url}>{blog.url}</a>
      <p>likes: {blog.likes}  <button onClick={handleLike}>Like</button></p>
      <p>added by {blog.user.username}</p>
      {user.id === blog.user.id && <button onClick={handleRemove} id="deleteButton">remove</button>}
      <h3>comments</h3>
      <Form onSubmit={handleComment}>
        <Form.Group>
          <Form.Control
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <Button type="submit">add comment</Button>
        </Form.Group>
      </Form>
      <ListGroup>
        {blog.comments.map(comment => <ListGroup.Item>comment</ListGroup.Item>)}
      </ListGroup>
    </div>
  )
}
Blog.propTypes = {
  blog: PropTypes.object,
}
export default Blog
