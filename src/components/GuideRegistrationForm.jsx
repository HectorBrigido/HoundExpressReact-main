import React, { useState } from 'react';

// Recibimos la función 'onAddGuide' a través de las props
function GuideRegistrationForm({ onAddGuide }) {
  // Estado para manejar los valores de los inputs del formulario
  const [formData, setFormData] = useState({
    'numero-guia': '',
    origen: '',
    destino: '',
    destinatario: '',
    'fecha-creacion': new Date().toISOString().split('T')[0], // Fecha de hoy por defecto
    'estado-inicial': 'pendiente',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario
    // Validación simple
    if (!formData['numero-guia'] || !formData.origen || !formData.destino || !formData.destinatario) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    setError('');
    
    // TODO: Aquí iría la lógica para guardar la guía (ej. llamada a una API)
    // Por ahora, la pasamos al componente padre (App.jsx)
    const newGuide = {
        id: formData['numero-guia'],
        status: formData['estado-inicial'],
        origin: formData.origen,
        destination: formData.destino,
        lastUpdate: formData['fecha-creacion'],
    };
    onAddGuide(newGuide);

    // Limpiar el formulario (opcional)
    // setFormData({ ...initialState });
    alert(`Guía ${formData['numero-guia']} registrada!`);
  };

  return (
    <section id="registro-guias" className="card guide-registration">
      <h2 className="card__title"><a href="#registro-guias">Registro de Nuevas Guías</a></h2>
      <form id="guide-form" className="guide-registration__form" noValidate onSubmit={handleSubmit}>
        {error && <div id="form-error-message" className="form__error">{error}</div>}
        <div className="form-group">
          <label className="form-group__label" htmlFor="numero-guia">Número de Guía</label>
          <input className="form-group__input" type="text" id="numero-guia" name="numero-guia" value={formData['numero-guia']} onChange={handleChange} placeholder="Ej: HE-123456789" required />
        </div>
        {/* Repetir la estructura para los demás inputs... */}
        <div className="form-group">
            <label className="form-group__label" htmlFor="origen">Origen</label>
            <input className="form-group__input" type="text" id="origen" name="origen" value={formData.origen} onChange={handleChange} placeholder="Ciudad de Origen" required />
        </div>
        {/* ... otros campos del formulario aquí ... */}
        <button type="submit" className="btn btn--primary">Registrar Guía</button>
      </form>
    </section>
  );
}

export default GuideRegistrationForm;

