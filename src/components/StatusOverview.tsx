import React from 'react';

interface StatusOverviewProps {
  totalGuides: number;
  inTransitGuides: number;
  deliveredGuides: number;
}

const StatusOverview: React.FC<StatusOverviewProps> = ({ totalGuides, inTransitGuides, deliveredGuides }) => {
  return (
    <div className="status-overview">
      <h2 style={{ marginTop: 0 }}>Estado General</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
        <div>
          <h3>{totalGuides}</h3>
          <p>Guías Totales</p>
        </div>
        <div>
          <h3>{inTransitGuides}</h3>
          <p>En Tránsito</p>
        </div>
        <div>
          <h3>{deliveredGuides}</h3>
          <p>Entregadas</p>
        </div>
      </div>
    </div>
  );
};

export default StatusOverview;