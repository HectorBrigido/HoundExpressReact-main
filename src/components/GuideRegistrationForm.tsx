import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Guide } from '../types';
import { addGuide } from '../store/guidesSlice';

const GuideRegistrationForm: React.FC = () => {
  const dispatch = useDispatch();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [id, setId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin.trim() || !destination.trim()) {
      alert('Por favor, completa los campos de origen y destino.');
      return;
    }

    const newGuide: Guide = {
      id,
      status: 'pendiente',
      origin,
      destination,
      lastUpdate: new Date().toISOString(),
    };

    dispatch(addGuide(newGuide));

    // Limpiar el formulario
    setId('');
    setOrigin('');
    setDestination('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ gridColumn: '1 / -1', margin: 0, marginBottom: '1rem' }}>Registrar Nueva Guía</h2>
      <input
        type="text"
        placeholder="Número de Guía (Ej: HE-123)"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Ciudad de Origen"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Ciudad de Destino"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        required
      />
      <button type="submit">Registrar Guía</button>
    </form>
  );
};

export default GuideRegistrationForm;