import jwtDecode from 'jwt-decode';

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;
  const decodedToken = jwtDecode(token);
  return decodedToken.role;
};

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
};
