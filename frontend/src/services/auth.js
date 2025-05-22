import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const login = async (credentials, isAdmin) => {
  const endpoint = isAdmin ? 'auth/admin/login' : 'auth/employee/login';
  const response = await API.post(endpoint, credentials);
  return response.data;
};
