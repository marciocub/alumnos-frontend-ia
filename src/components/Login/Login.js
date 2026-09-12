import React, { useState } from 'react';
import AuthService from '../../services/AuthService';
import '../../styles/Login.css';

const Login = ({ onLogin }) => {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ nombre: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const switchMode = (m) => {
    setMode(m);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let res;
      if (mode === 'login') {
        res = await AuthService.login(form.email, form.password);
      } else {
        res = await AuthService.register(form.nombre, form.email, form.password);
      }
      AuthService.saveToken(res.data.token);
      onLogin(res.data);
    } catch (err) {
      const data = err.response?.data;
      setError(data?.mensaje || 'Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Gestión de Alumnos</h1>
        <p className="login-subtitle">Inicia sesión para continuar</p>

        <div className="login-tabs">
          <button
            type="button"
            className={`tab-btn ${mode === 'login' ? 'active' : ''}`}
            onClick={() => switchMode('login')}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            className={`tab-btn ${mode === 'register' ? 'active' : ''}`}
            onClick={() => switchMode('register')}
          >
            Crear cuenta
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          {mode === 'register' && (
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                placeholder="Tu nombre"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              minLength={mode === 'register' ? 6 : undefined}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Procesando...' : (mode === 'login' ? 'Ingresar' : 'Registrarme')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;