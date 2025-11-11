import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <span className="text-muted">
          © {new Date().getFullYear()} Hound Express. Todos los derechos reservados.
        </span>
      </div>
    </footer>
  );
};

export default Footer;