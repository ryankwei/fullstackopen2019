import loginService from '../services/login'
import blogService from '../services/blogs'
const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'REMOVE_USER':
      return null
    case 'SET_USER':
      return action.data
    default:
    return state
  }
}

export const removeUser = () => {
  return {
    type: 'REMOVE_USER'
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    data: user
  }
}

export const pullUser = () => {
  const loggedUser = window.localStorage.getItem('loggedUser')
  if(loggedUser) {
    const user = JSON.parse(loggedUser)
    blogService.setToken(user.token)
    return setUser(user)
  }
  return null
}
export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password, })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      return dispatch(setUser(user))
    }
    catch (exception) {
      return null
    }
  }
}

export default userReducer
