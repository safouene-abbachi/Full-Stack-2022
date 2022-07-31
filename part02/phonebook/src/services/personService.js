import axios from 'axios';

const addNote = (note) => {
  return axios.post('http://localhost:3001/persons', note).then((response) => {
    return response.data;
  });
};

const deletePerson = (id) => {
  return axios
    .delete(`http://localhost:3001/persons/${id}`)
    .then((response) => {
      return response.data;
    });
};

const updatedNumebr = (id, number) => {
  return axios
    .put(`http://localhost:3001/persons/${id}`, { number })
    .then((response) => {
      console.log('🚀 ~ response', response);
      return response.data;
    });
};
export { addNote, deletePerson, updatedNumebr };
