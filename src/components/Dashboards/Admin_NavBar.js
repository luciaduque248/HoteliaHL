import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import '../../assets/css/AdminNavBar.css';
import isotype from '../../assets/img/LogoSolo 1.png';
import photoAdmin from '../../assets/img/perfilADMIN.png';

function AdminNavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navClassName = ({ isActive }) => `admin-nav__link${isActive ? ' is-active' : ''}`;

  const handleLogout = () => {
    window.sessionStorage.removeItem('hotelia-demo-role');
  };

  return (
    <header className='admin-nav'>
      <div className='admin-nav__inner'>
        <Link to='/perfil' className='admin-nav__brand' aria-label='Ir al panel administrativo de Hotelia'>
          <span className='admin-nav__brand-mark'>
            <img src={isotype} alt='' aria-hidden='true' />
          </span>
          <span className='admin-nav__brand-copy'>
            <strong>Hotelia</strong>
            <small>Administración</small>
          </span>
        </Link>

        <button
          type='button'
          className='admin-nav__menu-button'
          aria-label={menuOpen ? 'Cerrar menú administrativo' : 'Abrir menú administrativo'}
          aria-expanded={menuOpen}
          aria-controls='admin-navigation'
          onClick={() => setMenuOpen((current) => !current)}
        >
          <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`} aria-hidden='true'></i>
        </button>

        <nav id='admin-navigation' className={`admin-nav__links${menuOpen ? ' is-open' : ''}`} aria-label='Navegación administrativa'>
          <NavLink to='/perfil' className={navClassName} onClick={() => setMenuOpen(false)}>
            <i className='fa-solid fa-chart-line' aria-hidden='true'></i>
            Resumen
          </NavLink>
          <NavLink to='/list-habitaciones' className={navClassName} onClick={() => setMenuOpen(false)}>
            <i className='fa-solid fa-bed' aria-hidden='true'></i>
            Habitaciones
          </NavLink>
          <NavLink to='/form-habitaciones' className={navClassName} onClick={() => setMenuOpen(false)}>
            <i className='fa-solid fa-circle-plus' aria-hidden='true'></i>
            Crear habitación
          </NavLink>
        </nav>

        <div className='admin-nav__account'>
          <div className='admin-nav__profile' aria-label='Sesión de administrador'>
            <img src={photoAdmin} alt='' aria-hidden='true' />
            <span>
              <strong>Administrador</strong>
              <small>Hotelia</small>
            </span>
          </div>
          <Link to='/login' className='admin-nav__logout' onClick={handleLogout}>
            <i className='fa-solid fa-arrow-right-from-bracket' aria-hidden='true'></i>
            <span>Salir</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default AdminNavBar;
