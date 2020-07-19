import axios from 'axios';

/* Dev * /

// const baseUrl = 'http://localhost:3002/persons';
// const baseUrl = 'http://localhost:3001/api/persons';

/* Deployed */ 
const baseUrl = '/api/persons'

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

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

// ES6
export default { getAll, create, update, remove };

/* export default {
  getAll: getAll,
  create: create,
  update: update,
}; */
