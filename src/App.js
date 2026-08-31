import React, { useState, useEffect } from 'react';
import AlumnoForm from './components/AlumnoForm/AlumnoForm';
import AlumnoList from './components/AlumnoList/AlumnoList';
import AlumnoService from './services/AlumnoService';
import './App.css';

function App() {
  const [alumnos, setAlumnos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAlumno, setEditingAlumno] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar alumnos al montar el componente
  useEffect(() => {
    loadAlumnos();
  }, []);

  const loadAlumnos = async () => {
    setLoading(true);
    try {
      const response = await AlumnoService.getAllAlumnos();
      setAlumnos(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los alumnos. Verifica que el servidor está activo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingAlumno) {
        await AlumnoService.updateAlumno(editingAlumno.id, formData);
        alert('Alumno actualizado correctamente');
      } else {
        await AlumnoService.createAlumno(formData);
        alert('Alumno creado correctamente');
      }
      loadAlumnos();
      setShowForm(false);
      setEditingAlumno(null);
    } catch (err) {
      alert('Error al guardar alumno: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (alumno) => {
    setEditingAlumno(alumno);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este alumno?')) {
      try {
        await AlumnoService.deleteAlumno(id);
        alert('Alumno eliminado correctamente');
        loadAlumnos();
      } catch (err) {
        alert('Error al eliminar alumno: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingAlumno(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestión de Alumnos</h1>
      </header>

      <main className="App-main">
        {error && <div className="alert alert-error">{error}</div>}

        {loading && <p>Cargando...</p>}

        {!showForm && !loading && (
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            + Nuevo Alumno
          </button>
        )}

        {showForm && (
          <AlumnoForm
            onSubmit={handleCreateOrUpdate}
            initialData={editingAlumno}
            onCancel={handleCancel}
          />
        )}

        <AlumnoList
          alumnos={alumnos}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}

export default App;
