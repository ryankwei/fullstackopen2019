import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'
const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const handleCreate = (event) => {
    event.preventDefault()
    const newObj = {
      title: title,
      author: author,
      url: url,
    }

    createBlog(newObj)
    setAuthor('')
    setUrl('')
    setTitle('')
  }
  return (
    <Form onSubmit={handleCreate}>
      <Form.Group>
        <Form.Label>title:</Form.Label>
        <Form.Control
          id="title"
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
        <Form.Label>author:</Form.Label>
        <Form.Control
          id="author"
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        <Form.Label>url:</Form.Label>
        <Form.Control
          id="url"
          type="text"
          value={url}
          name="url"
          onChange = {({ target }) => setUrl(target.value)}
        />
        <Button type="submit">create</Button>
      </Form.Group>
    </Form>
  )
}
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}
export default BlogForm
