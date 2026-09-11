import React from 'react';

import '../assets/css/Inicio.css';
import '../assets/css/HomePolish.css';

import Header from '../components/Header/Header';
import SimpleSlider from '../components/INICIO/Slide';
import FormBuscar from '../components/INICIO/FormBuscar';
import CardSlide from '../components/INICIO/CardSlide';
import ExpSlide from '../components/INICIO/ExpSlide';
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
                            Encuéntranos en la Carrera 37 #24 - 29, barrio Corferias. Explora el mapa para ubicar fácilmente el sector antes de tu llegada.
                        </p>
                    </div>
                    <div className='ubicacion'>
                        <iframe
                            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.7989469727936!2d-74.09387552502115!3d4.6299284453448175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9bd79590f75b%3A0xf4bbf62246fe4e8e!2sHilton%20Bogota%20Corferias!5e0!3m2!1ses!2sco!4v1789164390603!5m2!1ses!2sco'
                            title='Mapa de ubicación en Corferias, Bogotá'
                            loading='lazy'
                            allowFullScreen
                            referrerPolicy='strict-origin-when-cross-origin'
                        ></iframe>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default Inicio;
