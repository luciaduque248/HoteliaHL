import React from 'react';

import '../assets/css/Inicio.css';

import Header from '../components/Header/Header';
import SimpleSlider from '../components/INICIO/Slide';
import FormBuscar from '../components/INICIO/FormBuscar';
import CardSlide from '../components/INICIO/CardSlide';
import ExpSlide from '../components/INICIO/ExpSlide';
import Maps from '../assets/img/mapa.png';
import Footer from '../components/Footer/Footer';
import DescubreSlide from '../components/INICIO/DescubreSlide';

function Inicio() {
    return (
        <div className='page-shell'>
            <Header />

            <main>
                <section className='section-banner'>
                    <SimpleSlider />
                    <FormBuscar />
                </section>

                <section className='descubre-hotelia' id='acerca-de-nosotros' aria-labelledby='about-title'>
                    <div className='descubre'>
                        <span className='section-eyebrow'>Conoce Hotelia</span>
                        <h2 id='about-title'>Una experiencia sencilla, cómoda y bien pensada.</h2>
                        <p>
                            Hotelia combina habitaciones funcionales, espacios acogedores y una ubicación práctica en Bogotá para que tu estadía se sienta fácil desde el primer momento.
                        </p>
                        <div className='about-points'>
                            <span><i className='fa-solid fa-location-dot' aria-hidden='true'></i> Barrio Corferias</span>
                            <span><i className='fa-solid fa-bed' aria-hidden='true'></i> Opciones para distintos tipos de viaje</span>
                            <span><i className='fa-solid fa-circle-check' aria-hidden='true'></i> Servicios esenciales incluidos</span>
                        </div>
                    </div>
                    <DescubreSlide />
                </section>

                <section className='habitaciones-precios' id='habitacion' aria-labelledby='rooms-title'>
                    <div className='section-heading centered'>
                        <span className='section-eyebrow'>Habitaciones</span>
                        <h2 id='rooms-title'>Elige el espacio que mejor se adapte a tu viaje.</h2>
                        <p>Revisa precios, servicios y características antes de reservar.</p>
                    </div>

                    <div className='container-cards-inicio'>
                        <CardSlide />
                    </div>
                </section>

                <section className='experiencias' aria-labelledby='experience-title'>
                    <div className='experience-copy'>
                        <span className='section-eyebrow light'>Experiencias</span>
                        <h2 id='experience-title'>Lo que recuerdan nuestros huéspedes.</h2>
                        <p>Comentarios sobre comodidad, atención y ubicación compartidos por visitantes de Hotelia.</p>
                    </div>
                    <div className='text-experiencias'>
                        <ExpSlide />
                    </div>
                </section>

                <section className='location-section' id='ubicacion' aria-labelledby='location-title'>
                    <div className='descubre location-copy'>
                        <span className='section-eyebrow'>Ubicación</span>
                        <h2 id='location-title'>En un punto práctico para moverte por Bogotá.</h2>
                        <p>
                            Encuéntranos en la Carrera 37 #24 - 29, barrio Corferias. Consulta el mapa para ubicar fácilmente el hotel antes de tu llegada.
                        </p>
                        <a
                            className='location-link'
                            href='https://www.google.com/maps/search/?api=1&query=Carrera+37+%2324-29+Bogota+Colombia'
                            target='_blank'
                            rel='noreferrer'
                        >
                            Abrir en Google Maps
                            <i className='fa-solid fa-arrow-up-right-from-square' aria-hidden='true'></i>
                        </a>
                    </div>
                    <div className='ubicacion'>
                        <img src={Maps} alt='Mapa de ubicación de Hotelia en Bogotá' />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default Inicio;
