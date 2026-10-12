import React, { useState } from 'react';
import { Sidebar } from './Sidebar';

export const Formulario = () => {
  const [user, setUser] = useState({
    nombre: '',
    apellidos: '',
    bio: '',
    genero: 'hombre'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.nombre && user.apellidos) {
      setSubmitted(true);
    }
  };

  return (
    <div className="center" style={{ marginTop: '30px' }}>
      <section id="content">
        <h1 className="subheader">Formulario de Contacto</h1>

        <form className="mid-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={user.nombre}
              onChange={handleChange}
              placeholder="Tu nombre..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="apellidos">Apellidos</label>
            <input
              type="text"
              name="apellidos"
              id="apellidos"
              value={user.apellidos}
              onChange={handleChange}
              placeholder="Tus apellidos..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Biografía</label>
            <textarea
              name="bio"
              id="bio"
              value={user.bio}
              onChange={handleChange}
              placeholder="Cuéntanos sobre ti..."
            ></textarea>
          </div>

          <div className="form-group" style={{ textAlign: 'left', margin: '15px 0' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Género</label>
            <label style={{ marginRight: '15px', fontWeight: 'normal', cursor: 'pointer' }}>
              <input
                type="radio"
                name="genero"
                value="hombre"
                checked={user.genero === 'hombre'}
                onChange={handleChange}
              />{' '}
              Hombre
            </label>
            <label style={{ marginRight: '15px', fontWeight: 'normal', cursor: 'pointer' }}>
              <input
                type="radio"
                name="genero"
                value="mujer"
                checked={user.genero === 'mujer'}
                onChange={handleChange}
              />{' '}
              Mujer
            </label>
            <label style={{ fontWeight: 'normal', cursor: 'pointer' }}>
              <input
                type="radio"
                name="genero"
                value="otro"
                checked={user.genero === 'otro'}
                onChange={handleChange}
              />{' '}
              Otro
            </label>
          </div>

          <div className="clearfix"></div>

          <input type="submit" value="Enviar Formulario" className="btn btn-success" />
        </form>

        {submitted && (
          <div className="alert-box alert-success" style={{ marginTop: '30px' }}>
            <h3>✅ Datos recibidos del formulario:</h3>
            <p>
              <strong>Nombre completo:</strong> {user.nombre} {user.apellidos}
            </p>
            <p>
              <strong>Biografía:</strong> {user.bio || 'Sin biografía'}
            </p>
            <p>
              <strong>Género:</strong> {user.genero}
            </p>
          </div>
        )}
      </section>

      <Sidebar />

      <div className="clearfix"></div>
    </div>
  );
};
