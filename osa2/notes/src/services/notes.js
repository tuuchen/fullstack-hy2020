import axios from 'axios'

// URL for json server: 'http://localhost:3001/notes';
// URL for heroku: 'http://fs-notebackend.herokuapp.com/api/notes'

// Deployed url, localhost defined as a proxy at package.json
const baseUrl = '/api/notes'

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

// ES6
export default { getAll, create, update }