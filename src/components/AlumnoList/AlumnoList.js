import React from 'react';
import '../../styles/AlumnoList.css';

const AlumnoList = ({ alumnos, onEdit, onDelete }) => {
  if (alumnos.length === 0) {
    return <p className="no-data">No hay alumnos registrados</p>;
  }

  return (
    <div className="alumno-list">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Fecha Inscripción</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map(alumno => (
            <tr key={alumno.id}>
              <td>{alumno.id}</td>
              <td>{alumno.nombre}</td>
              <td>{alumno.apellido}</td>
              <td>{alumno.email}</td>
              <td>{alumno.telefono || '-'}</td>
              <td>{new Date(alumno.fechaInscripcion).toLocaleDateString()}</td>
              <td>
                <span className={`status status-${alumno.estado}`}>
                  {alumno.estado}
                </span>
              </td>
              <td className="actions">
                <button 
                  className="btn btn-edit" 
                  onClick={() => onEdit(alumno)}
                >
                  Editar
                </button>
                <button 
                  className="btn btn-delete" 
                  onClick={() => onDelete(alumno.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlumnoList;
