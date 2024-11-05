import axios from 'axios'
import { backendApi } from 'config'
import jwtDecode from 'jwt-decode';
import { useNotistack } from './useNotistack';
import useAuth from './useAuth';

const useAxios = () => {


// Example request using customData
// api.get('/some-endpoint', {
//   customData: {
//       retry: true,               // Automatically retry on 401 errors
//       silentError: false,        // Log the error but don’t display a notification
//       errorCallback: (error) => {  // Custom error callback if further handling is needed
//           console.log("Error callback triggered:", error.message);
//       }
//   }
// }).catch(error => {
//   // Optional additional error handling at the call site
//   console.error("Caught error in component:", error.message);
// });







    const { triggerNotifications } = useNotistack()
    const { logout } = useAuth()

    const handleError = (error) => {
      if (error.config && error.config.customData) {
          const { retry, silentError, errorCallback } = error.config.customData;
  
          // Handle custom retry logic for 401 status
          if (retry && error.response && error.response.status === 401) {
              console.log("Retrying request due to 401 status...");
              return api.request(error.config);  // Retry the original request
          }
  
          // Silent error handling if specified
          if (silentError) {
              console.warn("Error silenced:", error.message);
              return Promise.resolve(null);  // Return null to prevent further handling
          }
  
          // If an error callback is provided, execute it
          if (errorCallback && typeof errorCallback === 'function') {
              errorCallback(error);  // Pass the error to the callback
          }
      }
  
      // Default error handling
      if (error.response) {
          // Handle HTTP status-specific errors
          switch (error.response.status) {
              case 400:
                  console.error("Bad request:", error.response.data.message || "Invalid request");
                  break;
              case 401:
                  console.error("Unauthorized access - possibly invalid token.");
                  logout()
                  triggerNotifications([{ text: "Session expired, please log in again.", variant: 'error' }]);
                  break;
              case 403:
                  console.error("Forbidden - insufficient permissions.");
                  triggerNotifications([{ text: "You do not have permission to perform this action.", variant: 'warning' }]);
                  break;
              case 404:
                  console.error("Resource not found:", error.response.data.message || "The requested resource could not be found.");
                  break;
              case 429:
                  console.error("Too many requests:", "You have exceeded the rate limit.");
                  triggerNotifications([{ text: "You are sending too many requests. Please slow down.", variant: 'warning' }]);
                  break;
              case 500:
                  console.error("Internal server error:", error.response.data.message || "An error occurred on the server.");
                  triggerNotifications([{ text: "An error occurred on the server. Please try again later.", variant: 'error' }]);
                  break;
              case 503:
                  console.error("Service unavailable:", "The server is temporarily unavailable.");
                  triggerNotifications([{ text: "Service temporarily unavailable. Please try again later.", variant: 'error' }]);
                  break;
              default:
                  console.error(`Error ${error.response.status}:`, error.response.data.message || "An unknown error occurred.");
                  triggerNotifications([{ text: `Error ${error.response.status}:` + error.response.data.message || "An unknown error occurred.", variant: 'error' }]);
          }
      } else if (error.request) {
          // Network error or no response received from the server
          console.error("Network error:", "No response received from the server.");
          triggerNotifications([{ text: "Network error: Please check your internet connection.", variant: 'error' }]);
      } else {
          // Error setting up the request
          console.error("Request setup error:", error.message);
      }
  
      return Promise.reject(error);  // Pass the error down for further handling if needed
  }

    const api = axios.create({baseURL: backendApi})
    const apiNonAuth = axios.create({baseURL: backendApi})

    api.interceptors.request.use(
        config => {
          const token = localStorage.getItem('token');
          if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
          }
          return config;
        },
        error => {
          return Promise.reject(error);
        }
      );

      // Response interceptor to handle errors
      api.interceptors.response.use(
        response => response,  // Pass through successful responses
        error => handleError(error)
      );

      apiNonAuth.interceptors.response.use(
        response => response,  // Pass through successful responses
        error => handleError(error)
      );

      // const login = async (username, password, rememberMe) => {
      //   await api.post('/login', { username, password, rememberMe })
      //       .then((res) => {
      //           if (res.status===200 && res.data) {
      //               localStorage.setItem('token', res.data);
      //           }
      //           return res.data
      //       })
      //       .catch((err) => {
      //           return err
      //       })   
      // };
      
      // const logout = () => {
      //   localStorage.removeItem('token');
      // };
      
      // const getCurrentUser = () => {
      //   const token = localStorage.getItem('token');
      //   if (token) {
      //     return jwtDecode(token);
      //   }
      //   return null;
      // };

      // return {api, login, logout, getCurrentUser}
      return {api, apiNonAuth}

}

export {useAxios}