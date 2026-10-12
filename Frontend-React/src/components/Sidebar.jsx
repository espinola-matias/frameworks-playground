import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const [searchString, setSearchString] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchString.trim()) {
      navigate(`/buscar/${encodeURIComponent(searchString.trim())}`);
      setSearchString('');
    }
  };

  return (
    <aside id="sidebar">
      <div id="nav-blog" className="sidebar-item">
        <h3>Puedes hacer esto</h3>
        <Link to="/crear-articulo" className="btn btn-success">
          Crear artículo
        </Link>
      </div>

      <div id="search" className="sidebar-item">
        <h3>Buscador</h3>
        <p>Encuentra el artículo que buscas</p>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            name="search"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            placeholder="Escribe para buscar..."
            required
          />
          <input type="submit" value="Buscar" className="btn" />
        </form>
      </div>
    </aside>
  );
};
