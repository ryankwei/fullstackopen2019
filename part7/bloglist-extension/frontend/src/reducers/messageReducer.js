const messageReducer = (state = '', action) => {
  switch (action.type) {
    case 'REMOVE':
      return ''
    case 'SET':
      return action.data
    default:
    return state
  }
}

export const setMessage = (content) => {
  return {
    type: 'SET',
    data: content
  }
}
export const remMessage = () => {
  return {
    type: 'REMOVE'
  }
}
export const setNotification = (content) => {
  return async dispatch => {
//    clearTimeout()
    dispatch(setMessage(content))
    setTimeout(()=> {
      dispatch(remMessage())
    }, 5000)
  }
}
export default messageReducer
