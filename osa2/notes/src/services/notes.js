import axios from 'axios';

// URL for json-server
// const baseUrl = 'http://localhost:3001/notes';

// URL for local backend
// const baseUrl = 'http://localhost:3001/api/notes';

// URL for heroku 
// const baseUrl = 'http://fs-notebackend.herokuapp.com/api/notes'

// URL for serving frontend via backend
const baseUrl = '/api/notes'

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

// ES6
export default { getAll, create, update };

/* export default {
  getAll: getAll,
  create: create,
  update: update,
}; */
