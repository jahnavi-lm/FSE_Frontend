// utils/auth.js
export const isAuthenticated = () => {
  return !!localStorage.getItem('token'); // or use context/state
};
