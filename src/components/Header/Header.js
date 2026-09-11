import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../../assets/css/Header.css';
import Logo from '../../assets/img/LOGO.png';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className='site-header'>
            <nav className='navbar-inicio' aria-label='Navegación principal'>
                <Link to='/' className='enlace' aria-label='Hotelia - Inicio' onClick={closeMenu}>
                    <img src={Logo} alt='Hotelia' className='logo' />
                </Link>

                <div className={`navbar-actions ${menuOpen ? 'is-open' : ''}`}>
                    <ul className='navbar-ul'>
                        <li><Link to='/' className='link' onClick={closeMenu}>Inicio</Link></li>
                        <li><a href='#habitacion' className='link' onClick={closeMenu}>Habitaciones</a></li>
                        <li><a href='#acerca-de-nosotros' className='link' onClick={closeMenu}>Hotelia</a></li>
                        <li><a href='#ubicacion' className='link' onClick={closeMenu}>Ubicación</a></li>
                        <li className='mobile-login-item'>
                            <Link to='/login' className='link login' onClick={closeMenu}>Iniciar sesión</Link>
                        </li>
                    </ul>
                </div>

                <div className='header-cta'>
                    <Link to='/login' className='login-link'>Iniciar sesión</Link>
                    <Link to='/login' className='button-reserva' aria-label='Reservar una habitación'>
                        Reservar
                    </Link>
                    <button
                        type='button'
                        className='menu-toggle'
                        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default Header;
