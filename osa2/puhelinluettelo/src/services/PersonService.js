import axios from 'axios'

// URL for json server: 'http://localhost:3001/persons';
// URL for heroku: 'http://puhelinluettelo-fs.herokuapp.com/api/persons'

// Deployed url, localhost defined as a proxy at package.json
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then((response) => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((response) => response.data)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

// ES6
export default { getAll, create, update, remove }