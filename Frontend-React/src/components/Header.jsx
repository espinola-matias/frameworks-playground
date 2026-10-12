import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header id="header">
      <div className="center">
        {/* LOGO */}
        <div id="logo">
          <Link to="/inicio" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src="/assets/images/react.svg" className="app-logo" alt="Logotipo React" />
            <span id="brand">
              <strong>Blog</strong>React
            </span>
          </Link>
        </div>

        {/* MENU */}
        <nav id="menu">
          <ul>
            <li>
              <NavLink to="/inicio" className={({ isActive }) => (isActive ? 'active' : '')}>
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink to="/blog" className={({ isActive }) => (isActive ? 'active' : '')}>
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink to="/formulario" className={({ isActive }) => (isActive ? 'active' : '')}>
                Formulario
              </NavLink>
            </li>
            <li>
              <NavLink to="/crear-articulo" className={({ isActive }) => (isActive ? 'active' : '')}>
                Crear Artículo
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* LIMPIAR FLOTADOS */}
        <div className="clearfix"></div>
      </div>
    </header>
  );
};
