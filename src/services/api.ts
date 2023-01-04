import axios from 'axios';

const api = axios.create({
  timeout: 3000,  
  baseURL: 'http://192.168.1.6:4000',
});

export default api;
