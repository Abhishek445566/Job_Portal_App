import axios from 'axios';

const getToken = () => localStorage.getItem('token');

export const getJobs = async (searchKeyword = '') => {
  const headers = { Authorization: `Bearer ${getToken()}` };
  let url = 'http://localhost:8080/api/jobs';
  if (searchKeyword) {
    url = `http://localhost:8080/api/jobs/search?keyword=${searchKeyword}`;
  }
  const response = await axios.get(url, { headers });
  return response.data;
};

export const createJob = async (job) => {
  const headers = { Authorization: `Bearer ${getToken()}` };
  const response = await axios.post('http://localhost:8080/api/jobs', job, { headers });
  return response.data;
};

export const deleteJob = async (id) => {
  const headers = { Authorization: `Bearer ${getToken()}` };
  await axios.delete(`http://localhost:8080/api/jobs/${id}`, { headers });
};
