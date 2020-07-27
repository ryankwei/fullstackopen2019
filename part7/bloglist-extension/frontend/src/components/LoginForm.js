import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/messageReducer'
import { login } from '../reducers/userReducer'
import { Alert, Form, Button } from 'react-bootstrap'
const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const message = useSelector(state => state.message)
  const dispatch = useDispatch()

  const handleUsernameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const res = login(username, password)
    console.log("The object response is", res)
    if(res) {
      dispatch(res)
      setUsername('')
      setPassword('')
      dispatch(setNotification(`Successfully logged in as ${username}`))
    }
    else {
      setUsername('')
      setPassword('')
      dispatch(setNotification(`wrong credentials`))
    }
  }
  return (
    <div>
      <h2>Log in to application</h2>
      {message &&
       <Alert variant="success">
        {message}
      </Alert>
      }
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
          <Form.Label>password</Form.Label>
          <Form.Control
            id="password"
            type="text"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
          <Button type="submit" id="login-button">login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm
