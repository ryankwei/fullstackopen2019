import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { LOGIN } from '../queries'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login] = useMutation(LOGIN)

  if(!props.show) {
    return null
  }

  const submitLogin = async (event) => {
    event.preventDefault()

    const { data } = await login({
      variables: { username, password }
    })
    props.setToken(data.login.value)
    localStorage.setItem('user-token', data.login.value)
    setUsername('')
    setPassword('')
  }
  return (
    <form onSubmit={submitLogin}>
      username:
      <input
        value={username}
        onChange={({ target })=> setUsername(target.value)}
      />
      password:
      <input
        value={password}
        onChange={({ target })=> setPassword(target.value)}
      />
     <button type='submit'>login</button>
    </form>
  )
}

export default LoginForm
