import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const addUser = async obj => {
  const res = await axios.post(baseUrl, obj)
  return res.data
}
export default { getAll, addUser }
