import axios, { AxiosInstance } from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

if (!baseURL) {
  throw new Error('Base URL is not provided in environment variables');
}

const apiService: AxiosInstance = axios.create({
  baseURL,
});

apiService.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('token'); 
  if (token) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiService;
