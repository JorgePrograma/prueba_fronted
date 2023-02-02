import axios from "axios";

const axiosClient = axios.create({
  baseURL: `http://localhost:8000/api`
})

axiosClient.defaults.baseURL = "http://localhost:8000";
axiosClient.defaults.headers.post['Content-Type'] = 'application/json';
axiosClient.defaults.headers.post['Accept'] = 'application/json';
axiosClient.defaults.withCredentials = true;
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  config.headers.Authorization = `Bearer ${token}`
  return config;
})

axiosClient.interceptors.response.use((response) => {
  return response
}, (error) => {
  const {response} = error;
  if (response.status === 401) {
    localStorage.removeItem('ACCESS_TOKEN')
    // window.location.reload();
  } else if (response.status === 404) {
    //Show not found
  }

  throw error;
})

export default axiosClient
