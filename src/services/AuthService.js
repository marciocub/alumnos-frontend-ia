import axios from 'axios';

const API_URL = 'http://localhost:8080/api/usuarios';

const AuthService = {
  login: (email, password) => axios.post(`${API_URL}/login`, { email, password }),
  register: (nombre, email, password) => axios.post(`${API_URL}/registro`, { nombre, email, password }),
  saveToken: (token) => localStorage.setItem('token', token),
  getToken: () => localStorage.getItem('token'),
  logout: () => localStorage.removeItem('token'),
  isAuthenticated: () => !!localStorage.getItem('token')
};

export default AuthService;