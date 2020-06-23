import React, { useState } from 'react'
import PropTypes from 'prop-types'
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
    <form onSubmit={handleCreate}>
      <div>
        title:
        <input
          id="title"
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          id="author"
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          id="url"
          type="text"
          value={url}
          name="url"
          onChange = {({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}
export default BlogForm
