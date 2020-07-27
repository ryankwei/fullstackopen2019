import React from 'react'
import { ListGroup } from 'react-bootstrap'
const User = ({ user }) => {
  if(!user) return null
  return (
    <div>
      <h1>{ user.name }</h1>
      <h2>added blogs</h2>
      <ListGroup>
      { user.blogs.map(blog => <ListGroup.Item>{blog.title}</ListGroup.Item>)}
      </ListGroup>
    </div>
  )
}
export default User
