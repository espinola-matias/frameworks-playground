import React from 'react';
import { Link } from 'react-router-dom';

export const Error404 = () => {
  return (
    <div className="center" style={{ marginTop: '60px', minHeight: '500px' }}>
      <h1 className="subheader" style={{ color: '#0087b3', fontSize: '48px' }}>
        404
      </h1>
      <h2>Página no encontrada</h2>
      <p style={{ fontSize: '18px', color: '#666', margin: '20px 0' }}>
        La página que estás buscando no existe o ha cambiado de lugar.
      </p>
      <Link to="/inicio" className="btn btn-success" style={{ margin: '0 auto' }}>
        Volver al inicio
      </Link>
    </div>
  );
};
