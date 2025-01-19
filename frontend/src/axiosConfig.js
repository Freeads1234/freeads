import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  // baseURL: 'http://43.204.219.82',
  // baseURL: 'http://127.0.0.1:8000',
  // baseURL: 'http://backend:8000',

});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;