import React from 'react';
import '../../assets/css/Inicio.css';

function SimpleSlider() {
    return (
        <section className='banner-1' aria-labelledby='hero-title'>
            <div className='hero-overlay'></div>
            <div className='banner-inicio-1'>
                <span className='hero-eyebrow'>Bogotá · Colombia</span>
                <h1 id='hero-title'>Tu estadía, con calma y buena ubicación.</h1>
                <p>
                    Descubre una experiencia cómoda en Hotelia y encuentra la habitación que mejor se adapte a tu viaje.
                </p>
                <div className='hero-highlights' aria-label='Beneficios de Hotelia'>
                    <span><i className='fa-solid fa-location-dot' aria-hidden='true'></i> Cerca de Corferias</span>
                    <span><i className='fa-solid fa-wifi' aria-hidden='true'></i> Wi‑Fi disponible</span>
                    <span><i className='fa-solid fa-bed' aria-hidden='true'></i> Habitaciones cómodas</span>
                </div>
            </div>
        </section>
    );
}

export default SimpleSlider;
