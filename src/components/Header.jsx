import React from 'react';

function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__content">
        <div className="site-header__logo">
          <h1>Hound Express</h1>
        </div>
        <nav className="site-header__nav">
          <ul>
            <li><a className="site-header__link" href="#top">Inicio</a></li>
            <li><a className="site-header__link" href="#registro-guias">Registro de Guías</a></li>
            <li><a className="site-header__link" href="#estado-general">Estado General</a></li>
            <li><a className="site-header__link" href="#lista-guias">Lista de Guías</a></li>
          </ul>
        </nav>
      </div>
      <div className="banner">
        <div className="container banner__content">
          <h2 className="banner__title">Tu envío, nuestra prioridad</h2>
          <p className="banner__text">Rastrea tus paquetes con la confianza y velocidad que solo Hound Express te puede dar.</p>
        </div>
      </div>
    </header>
  );
}

export default Header;

