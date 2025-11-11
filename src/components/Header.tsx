import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Placeholder for a logo */}
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 7L12 12L22 7" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 12V22" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Hound Express</h1>
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', gap: '1.5rem' }}>
            <li><a href="#" style={{ textDecoration: 'none', color: 'var(--text-color)', fontWeight: '500' }}>Inicio</a></li>
            <li><a href="#" style={{ textDecoration: 'none', color: 'var(--text-color)', fontWeight: '500' }}>Servicios</a></li>
            <li><a href="#" style={{ textDecoration: 'none', color: 'var(--text-color)', fontWeight: '500' }}>Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;