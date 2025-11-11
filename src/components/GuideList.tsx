import React from 'react';
import { Guide, GuideStatus } from '../types';

interface GuideListProps {
  guides: Guide[];
  onUpdateStatus: (guideId: string, newStatus: GuideStatus) => void;
  onViewHistory: (guideId: string) => void; // Placeholder for history modal
}

const GuideList: React.FC<GuideListProps> = ({ guides, onUpdateStatus, onViewHistory }) => {
  return (
    <div className="guide-list">
      <h2 style={{ marginTop: 0 }}>Listado de Guías</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ padding: '0.75rem', textAlign: 'left' }}>ID Guía</th>
            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Origen</th>
            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Destino</th>
            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Estado</th>
            <th style={{ padding: '0.75rem', textAlign: 'center' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {guides.map((guide) => (
            <tr key={guide.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '0.75rem' }}>{guide.id}</td>
              <td style={{ padding: '0.75rem' }}>{guide.origin}</td>
              <td style={{ padding: '0.75rem' }}>{guide.destination}</td>
              <td style={{ padding: '0.75rem' }}>
                <span style={{ 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: 'var(--border-radius)',
                  color: 'white',
                  backgroundColor: guide.status === 'entregado' ? '#28a745' : guide.status === 'en-transito' ? '#ffc107' : '#6c757d'
                }}>
                  {guide.status}
                </span>
              </td>
              <td style={{ padding: '0.75rem', textAlign: 'center', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                <select 
                  value={guide.status} 
                  onChange={(e) => onUpdateStatus(guide.id, e.target.value as GuideStatus)}
                  style={{ width: 'auto' }}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="en-transito">En Tránsito</option>
                  <option value="entregado">Entregado</option>
                </select>
                <button onClick={() => onViewHistory(guide.id)} style={{ width: 'auto', backgroundColor: 'var(--secondary-color)' }}>
                  Historial
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {guides.length === 0 && <p style={{ textAlign: 'center', padding: '2rem' }}>No hay guías registradas.</p>}
    </div>
  );
};

export default GuideList;