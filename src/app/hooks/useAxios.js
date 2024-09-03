import axios from 'axios'
import { backendApi } from 'config'
import jwtDecode from 'jwt-decode';

const useAxios = () => {

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