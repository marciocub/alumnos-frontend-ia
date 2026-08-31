import React, { useState } from 'react';
import '../../styles/AlumnoForm.css';

const AlumnoForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState(
    initialData || {
      nombre: '',
      email: '',
      telefono: '',
      estado: 'activo'
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="alumno-form">
      <h2>{initialData ? 'Editar Alumno' : 'Nuevo Alumno'}</h2>
      
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={!!initialData}
        />
      </div>

      <div className="form-group">
        <label htmlFor="telefono">Teléfono:</label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="estado">Estado:</label>
        <select
          id="estado"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Actualizar' : 'Crear'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default AlumnoForm;
