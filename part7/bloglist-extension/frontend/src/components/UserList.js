import React from 'react'
import { useSelector } from 'react-redux'
import {
  Link
} from "react-router-dom"
import { Table } from 'react-bootstrap'
const UserList = () => {
  const users = useSelector(state => state.userList)

  return (
    <Table striped>
      <thead>
        <tr>
          <td></td>
          <th><b>blogs created</b></th>
        </tr>
      </thead>
      <tbody>
        {users.map(user =>
          <tr key={user.id}>
            <th><Link to={`/users/${user.id}`}>{ user.name }</Link></th>
            <td>{ user.blogs.length }</td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}
export default UserList
