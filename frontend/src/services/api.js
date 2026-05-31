import axios from 'axios';

// Use environment variable or fallback to Render backend URL
const API_URL = process.env.REACT_APP_API_URL || 'https://collabflow-backend-4hgv.onrender.com/api';

const API = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;