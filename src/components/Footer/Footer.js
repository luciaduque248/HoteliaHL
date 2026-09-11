import React from 'react';

function Footer() {
  return (
    <div>
      <section className='panoramica' aria-label='Panorámica de Bogotá'></section>
      <footer className='footer'>
        <nav className='line1-footer' aria-label='Enlaces del pie de página'>
          <a href='#habitacion'>Habitaciones</a>
          <a href='#acerca-de-nosotros'>Acerca de Hotelia</a>
          <a href='#ubicacion'>Ubicación</a>
          <a href='mailto:reservas@hotelia.com'>Contáctanos</a>
          <a href='/login'>Iniciar sesión</a>
        </nav>

        <div className='otros'>
          <p>Carrera 37 #24 - 29, barrio Corferias · Bogotá D. C.</p>
          <p>reservas@hotelia.com · Tel. (601) 2679045</p>

          <div className='derechos'>
            <small>© {new Date().getFullYear()} Hotelia. Todos los derechos reservados.</small>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
