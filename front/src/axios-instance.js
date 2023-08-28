import axios from 'axios';
 



const axiosInstance = axios.create();


axiosInstance.interceptors.request.use(config => {
  const  authToken = localStorage.getItem('token');

  
  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`;
    console.log("TOKEN AXIOS_INSTANCE:", authToken);

  } else {
    console.log('');
  }

  return config;
});




export default axiosInstance;
