import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'https://netcore.app.br/scommission/api/',
  // baseURL: 'https://localhost:5001/api/',
});

const getToken = () => {
  return localStorage.getItem('@AppCommission:token');
};

api.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const token = getToken();
  const newConfig = { ...config };
  newConfig.headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    newConfig.headers.Authorization = `Bearer ${token}`;
  }

  return newConfig;
});

api.interceptors.response.use(
  response => response,
  error => {
    const {
      response: { status },
    } = error;
    if (status === 401) {
      localStorage.removeItem('@AppCommission:token');
      localStorage.removeItem('@AppCommission:user');
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default api;
