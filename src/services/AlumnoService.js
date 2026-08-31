import axios from 'axios';

const API_URL = 'http://localhost:8080/api/alumnos';

const AlumnoService = {
  getAllAlumnos: () => axios.get(API_URL),
  getAlumnoById: (id) => axios.get(`${API_URL}/${id}`),
  createAlumno: (alumno) => axios.post(API_URL, alumno),
  updateAlumno: (id, alumno) => axios.put(`${API_URL}/${id}`, alumno),
  deleteAlumno: (id) => axios.delete(`${API_URL}/${id}`),
  getAlumnosByEstado: (estado) => axios.get(`${API_URL}/estado/${estado}`)
};

export default AlumnoService;
