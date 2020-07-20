import axios from 'axios';

/* Dev * /

// URL for json server
// const baseUrl = 'http://localhost:3001/persons';

// URL for local backend
// const baseUrl = 'http://localhost:3001/api/persons';

/* Deployed */

const baseUrl = '/api/persons';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

const remove = async (id) => {
  return await axios.delete(`${baseUrl}/${id}`);
};

// ES6
export default { getAll, create, update, remove };

/* export default {
  getAll: getAll,
  create: create,
  update: update,
}; */
