import axios from 'axios';

const API_URL = 'http://localhost:8080/api/alumnos';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const AlumnoService = {
  getAllAlumnos: () => axios.get(API_URL, { headers: getAuthHeaders() }),
  getAlumnoById: (id) => axios.get(`${API_URL}/${id}`, { headers: getAuthHeaders() }),
  createAlumno: (alumno) => axios.post(API_URL, alumno, { headers: getAuthHeaders() }),
  updateAlumno: (id, alumno) => axios.put(`${API_URL}/${id}`, alumno, { headers: getAuthHeaders() }),
  deleteAlumno: (id) => axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() }),
  getAlumnosByEstado: (estado) => axios.get(`${API_URL}/estado/${estado}`, { headers: getAuthHeaders() })
};

export default AlumnoService;
