import React from 'react';

function StatusOverview({ totalGuides, inTransitGuides, deliveredGuides }) {
  return (
    <section id="estado-general" className="card status-overview">
      <h2 className="card__title"><a href="#estado-general">Estado General del Sistema</a></h2>
      <div className="status-overview__grid">
        <div className="status-overview__item">
          <h3 className="status-overview__subtitle">Guías Totales</h3>
          <p id="total-guides-count" className="status-overview__number">{totalGuides}</p>
        </div>
        <div className="status-overview__item">
          <h3 className="status-overview__subtitle">En Tránsito</h3>
          <p id="in-transit-guides-count" className="status-overview__number">{inTransitGuides}</p>
        </div>
        <div className="status-overview__item">
          <h3 className="status-overview__subtitle">Entregadas</h3>
          <p id="delivered-guides-count" className="status-overview__number">{deliveredGuides}</p>
        </div>
      </div>
    </section>
  );
}

export default StatusOverview;

