import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  console.log("This is the token", token)

  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}
const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res
}
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const like = async (id) => {
  const req = await axios.get(baseUrl + `/${id}`)
  const obj = { ...req.data, likes: req.data.likes + 1 }
  const res = await axios.put(baseUrl + `/${id}`, obj)
  return res.data
}

const comment = async (comment, id) => {
  const req = await axios.get(baseUrl + `/${id}`)
  const obj = { ...req.data, comments: [comment, ...req.data.comments] }
  const res = await axios.post(baseUrl + `/${id}/comments`, obj)
  return res.data
}

export default { getAll, setToken, create, update, deleteBlog, like, comment }
