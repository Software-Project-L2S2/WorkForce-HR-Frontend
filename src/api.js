// // // import axios from 'axios';


// // // const API = axios.create({
// // //   baseURL: 'https://localhost:7142',  
// // //   headers: {
// // //     'Content-Type': 'application/json',
// // //   },
// // // });



// // // API.interceptors.request.use(
// // //   (config) => {
// // //     const token = localStorage.getItem('token');
// // //     if (token) {
// // //       config.headers.Authorization = `Bearer ${token}`;
// // //     }
// // //     return config;
// // //   },
// // //   (error) => Promise.reject(error)
// // // );


// // // API.interceptors.response.use(
// // //   (response) => response,
// // //   (error) => {
  
// // //     if (error.response && error.response.status === 401) {
      
// // //       window.location.href = '/login';
// // //     }
// // //     return Promise.reject(error);
// // //   }
// // // );

// // // export default API;

// // // src/api.js
import axios from 'axios';

// ✅ Create an Axios instance with interceptors
const API = axios.create({
  baseURL: 'https://localhost:7142', // ✅ Your backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Add Authorization header if token exists
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle 401 unauthorized globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login'; // Redirect to login if unauthorized
    }
    return Promise.reject(error);
  }
);

//
// ✅ API Functions using the custom `API` instance
//

export const getEmployees = async () => {
  const response = await API.get('/api/employees');
  return response.data;
};

export const searchEmployees = async (filters) => {
  const response = await API.post('/api/employees/search', filters);
  return response.data;
};

export const getEmployeeHeadCount = async () => {
  const response = await API.get('/api/employees/headcount');
  return response.data;
};

export const createProject = async (projectData) => {
  const response = await API.post('/api/projects', projectData);
  return response.data;
};

// Export the Axios instance too (if needed)
export default API;


// // src/api.js
// import axios from 'axios';

// const useHttps = true; // set false to use HTTP port 5164

// const API = axios.create({
//   baseURL: useHttps ? 'https://localhost:7142' : 'http://localhost:5164',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export const getEmployees = async () => {
//   const response = await API.get('/api/employees');
//   return response.data;
// };

// export const searchEmployees = async (filters) => {
//   const response = await API.post('/api/employees/search', filters);
//   return response.data;
// };

// export const getEmployeeHeadCount = async () => {
//   const response = await API.get('/api/employees/headcount');
//   return response.data;
// };

// export const createProject = async (projectData) => {
//   const response = await API.post('/api/projects', projectData);
//   return response.data;
// };

// export default API;

// src/api.js

