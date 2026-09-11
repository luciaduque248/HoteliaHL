import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../assets/css/UserDashboard.css';
import {
    demoReservations,
    demoUser,
    formatCOP,
    getRoomImage,
    getRooms,
} from '../utils/demoHotelia';

const statusClass = (status) => String(status).toLowerCase() === 'confirmada' ? 'is-confirmed' : 'is-completed';

function UserDashboard() {
    const navigate = useNavigate();
    const rooms = getRooms();
    const upcoming = demoReservations.find((reservation) => reservation.status === 'Confirmada');
    const totalNights = demoReservations.reduce((sum, reservation) => sum + reservation.nights, 0);

    const handleLogout = () => {
        window.sessionStorage.removeItem('hotelia-demo-role');
        navigate('/login');
    };

    const roomForReservation = (reservation) => rooms.find((room) => String(room._id) === String(reservation.roomId));

    return (
        <div className='guest-page'>
            <header className='guest-nav'>
                <Link to='/' className='guest-brand' aria-label='Ir al inicio de Hotelia'>
                    <span className='guest-brand__mark'><i className='fa-solid fa-hotel' aria-hidden='true'></i></span>
                    <span>
                        <strong>Hotelia</strong>
                        <small>Mi cuenta</small>
                    </span>
                </Link>

                <nav className='guest-nav__links' aria-label='Navegación de la cuenta'>
                    <a href='#reservaciones'>Reservaciones</a>
                    <a href='#perfil'>Mi perfil</a>
                </nav>

                <div className='guest-account'>
                    <span className='guest-avatar' aria-hidden='true'>SM</span>
                    <span className='guest-account__copy'>
                        <strong>{demoUser.name}</strong>
                        <small>Huésped demo</small>
                    </span>
                    <button type='button' onClick={handleLogout}>
                        <i className='fa-solid fa-arrow-right-from-bracket' aria-hidden='true'></i>
                        Salir
                    </button>
                </div>
            </header>

            <main className='guest-dashboard'>
                <section className='guest-hero'>
                    <div>
                        <span className='guest-eyebrow'>Cuenta de huésped</span>
                        <h1>Hola, Sofía. Tu próxima estadía está lista.</h1>
                        <p>Consulta tus reservaciones, fechas, valores y la información asociada a tu cuenta Hotelia.</p>
                    </div>

                    {upcoming && (
                        <div className='guest-next-stay'>
                            <span className='guest-next-stay__icon'><i className='fa-regular fa-calendar-check' aria-hidden='true'></i></span>
                            <div>
                                <small>Próximo check-in</small>
                                <strong>{upcoming.checkIn}</strong>
                                <span>{upcoming.roomName}</span>
                            </div>
                            <span className='guest-status is-confirmed'>Confirmada</span>
                        </div>
                    )}
                </section>

                <section className='guest-summary' aria-label='Resumen de reservaciones'>
                    <article>
                        <span><i className='fa-solid fa-suitcase-rolling' aria-hidden='true'></i></span>
                        <div><small>Reservaciones</small><strong>{demoReservations.length}</strong><p>En tu historial demo</p></div>
                    </article>
                    <article>
                        <span><i className='fa-regular fa-moon' aria-hidden='true'></i></span>
                        <div><small>Noches reservadas</small><strong>{totalNights}</strong><p>Entre todas tus estadías</p></div>
                    </article>
                    <article>
                        <span><i className='fa-solid fa-circle-check' aria-hidden='true'></i></span>
                        <div><small>Próxima estadía</small><strong>{upcoming ? 'Activa' : '—'}</strong><p>{upcoming ? upcoming.id : 'Sin reserva próxima'}</p></div>
                    </article>
                </section>

                <section className='guest-section' id='reservaciones'>
                    <div className='guest-section__heading'>
                        <div>
                            <span className='guest-eyebrow'>Mis reservaciones</span>
                            <h2>Tu historial en Hotelia</h2>
                        </div>
                        <Link to='/#habitacion' className='guest-outline-action'>
                            Explorar habitaciones
                            <i className='fa-solid fa-arrow-right' aria-hidden='true'></i>
                        </Link>
                    </div>

                    <div className='reservation-list'>
                        {demoReservations.map((reservation) => {
                            const room = roomForReservation(reservation);
                            return (
                                <article className='reservation-card' key={reservation.id}>
                                    <div className='reservation-card__image'>
                                        <img src={getRoomImage(room)} alt={reservation.roomName} />
                                    </div>
                                    <div className='reservation-card__content'>
                                        <div className='reservation-card__topline'>
                                            <span className={`guest-status ${statusClass(reservation.status)}`}>{reservation.status}</span>
                                            <small>Reserva {reservation.id}</small>
                                        </div>
                                        <h3>{reservation.roomName}</h3>
                                        <div className='reservation-card__dates'>
                                            <div>
                                                <span>Check-in</span>
                                                <strong>{reservation.checkIn}</strong>
                                            </div>
                                            <i className='fa-solid fa-arrow-right' aria-hidden='true'></i>
                                            <div>
                                                <span>Check-out</span>
                                                <strong>{reservation.checkOut}</strong>
                                            </div>
                                        </div>
                                        <div className='reservation-card__meta'>
                                            <span><i className='fa-solid fa-user-group' aria-hidden='true'></i>{reservation.guests} huésped(es)</span>
                                            <span><i className='fa-regular fa-moon' aria-hidden='true'></i>{reservation.nights} noche(s)</span>
                                            <span><i className='fa-solid fa-location-dot' aria-hidden='true'></i>Hotelia Bogotá</span>
                                        </div>
                                    </div>
                                    <div className='reservation-card__price'>
                                        <small>Total</small>
                                        <strong>${formatCOP(reservation.total)}</strong>
                                        <span>COP</span>
                                        {reservation.status === 'Confirmada' && <button type='button'>Ver detalle</button>}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </section>

                <section className='guest-profile-grid' id='perfil'>
                    <article className='guest-profile-card'>
                        <div className='guest-profile-card__header'>
                            <span className='guest-avatar guest-avatar--large' aria-hidden='true'>SM</span>
                            <div>
                                <span className='guest-eyebrow'>Información personal</span>
                                <h2>{demoUser.name}</h2>
                                <p>Perfil utilizado para explorar la experiencia de huésped del portafolio.</p>
                            </div>
                        </div>

                        <dl className='guest-profile-details'>
                            <div><dt>Correo</dt><dd>{demoUser.email}</dd></div>
                            <div><dt>Teléfono</dt><dd>{demoUser.phone}</dd></div>
                            <div><dt>Documento</dt><dd>{demoUser.document}</dd></div>
                            <div><dt>Ciudad</dt><dd>{demoUser.city}</dd></div>
                        </dl>
                    </article>

                    <aside className='guest-help-card'>
                        <span className='guest-help-card__icon'><i className='fa-solid fa-headset' aria-hidden='true'></i></span>
                        <span className='guest-eyebrow'>¿Necesitas ayuda?</span>
                        <h2>Estamos para acompañarte.</h2>
                        <p>Para cambios de reserva, horarios o solicitudes especiales, contacta al equipo de Hotelia.</p>
                        <a href='mailto:reservas@hotelia.com'>Contactar a Hotelia <i className='fa-solid fa-arrow-up-right-from-square' aria-hidden='true'></i></a>
                    </aside>
                </section>

                <p className='guest-demo-disclaimer'>Esta cuenta y sus reservaciones son datos de demostración creados para el portafolio.</p>
            </main>
        </div>
    );
}

export default UserDashboard;
