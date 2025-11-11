import React from 'react';

/**
 * Un componente simple para el pie de página de la aplicación.
 */
const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container text-center">
        <span className="text-muted">
          © {new Date().getFullYear()} Hound Express. Todos los derechos reservados.
        </span>
      </div>
    </footer>
  );
};

export default Footer;