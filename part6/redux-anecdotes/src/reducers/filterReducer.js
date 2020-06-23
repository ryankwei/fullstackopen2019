const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'REMOVE_FILTER':
      return ''
    case 'SET_FILTER':
      return action.data
    default:
    return state
  }
}

export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    data: filter
  }
}
export const remFilter = () => {
  return {
    type: 'REMOVE_FILTER'
  }
}

export default filterReducer
