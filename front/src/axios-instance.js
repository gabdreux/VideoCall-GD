import axios from 'axios';
 



const axiosInstance = axios.create();


axiosInstance.interceptors.request.use(config => {
  const  authToken = localStorage.getItem('token');

  
  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`;
    console.log("VAI TOMAR NO CU2222222222", authToken);

  } else {
    console.log('TOKEN NAO ENCONTRADO');
  }

  return config;
});




export default axiosInstance;
