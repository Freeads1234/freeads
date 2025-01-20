import axios from 'axios';
import Cookies from 'js-cookie';
import { BACKEND_URL } from './config';

const instance = axios.create({
  baseURL: BACKEND_URL,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;