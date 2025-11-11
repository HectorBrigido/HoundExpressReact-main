import React, { useState, useMemo } from 'react';

function GuideList({ guides }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGuides = useMemo(() => 
    guides.filter(guide => 
      guide.id.toLowerCase().includes(searchTerm.toLowerCase())
    ), [guides, searchTerm]);

  return (
    <section id="lista-guias" className="card guide-list">
      <h2 className="card__title"><a href="#lista-guias">Lista de Guías</a></h2>
      <div className="guide-list__search">
        <label htmlFor="buscar-guia" className="sr-only">Buscar Guía</label>
        <input 
          className="guide-list__search-input" 
          type="search" 
          id="buscar-guia" 
          placeholder="Buscar por número de guía..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn">Buscar</button>
      </div>
      <div className="guide-list__table-container">
        <table className="guide-list__table">
          <thead>
            <tr>
              <th>Número de Guía</th>
              <th>Estado</th>
              <th>Origen</th>
              <th>Destino</th>
              <th>Últ. Actualización</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody id="guide-list-body">
            {filteredGuides.map(guide => (
              <tr key={guide.id}>
                <td>{guide.id}</td>
                <td>{guide.status}</td>
                <td>{guide.origin}</td>
                <td>{guide.destination}</td>
                <td>{guide.lastUpdate}</td>
                <td><button className="btn btn--secondary">Ver Historial</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default GuideList;

