import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_BLOG':
      return state.map(blog => blog.id === action.data.id ? action.data.newObj : blog).sort((a, b) => a.likes - b.likes)
    case 'NEW_BLOG':
      return [...state, action.data].sort((a, b) => a.likes - b.likes)
    case 'INIT_BLOG':
      return action.data.sort((a, b) => a.likes - b.likes)
    case 'REMOVE_BLOG':
      return state.filter(blog => blog.id !== action.data.id)
    default:
    return state.sort((a, b) => a.likes - b.likes)
  }
}
export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}
export const removeBlog = id => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: {
        id: id
      }
    })
  }
}
export const likeBlog = (id) => {
  return async dispatch => {
    const newObj = await blogService.like(id)
    console.log(newObj)
    dispatch({
      type: 'UPDATE_BLOG',
      data: {
        id: id,
        newObj: newObj
      }
    })
  }
}

export const commentBlog = (comment, id) => {
  return async dispatch => {
    const newObj = await blogService.comment(comment, id)
    dispatch({
      type: 'UPDATE_BLOG',
      data:  {
        id: id,
        newObj: newObj
      }
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOG',
      data: blogs
    })
  }
}
export default blogReducer
