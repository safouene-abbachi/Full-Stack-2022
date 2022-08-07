import axios from 'axios';
const baseUrl = 'https://intense-inlet-79535.herokuapp.com/api/persons';
const addNote = (note) => {
  return axios.post(baseUrl, note).then((response) => {
    return response.data;
  });
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => {
    return response.data;
  });
};

const updatedNumebr = (id, number) => {
  return axios.put(`${baseUrl}/${id}`, { number }).then((response) => {
    console.log('🚀 ~ response', response);
    return response.data;
  });
};
export { addNote, deletePerson, updatedNumebr };
