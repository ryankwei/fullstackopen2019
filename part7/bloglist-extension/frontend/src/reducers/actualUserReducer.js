import userService from '../services/users'

const actualUserReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_USER':
      return [...state, action.data]
    case 'INIT_USER':
      return action.data
    default:
    return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USER',
      data: users
    })
  }
}

export default actualUserReducer
