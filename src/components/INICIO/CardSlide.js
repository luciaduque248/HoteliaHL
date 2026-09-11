import React, { useMemo } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

import { formatCOP, getRoomImage, getRooms } from '../../utils/demoHotelia';
import '../../assets/css/CardSlide.css';

function CarouselArrow({ className, onClick, direction }) {
    return (
        <button
            type='button'
            className={`${className || ''} room-arrow room-arrow--${direction}`}
            onClick={onClick}
            aria-label={direction === 'next' ? 'Ver siguiente habitación' : 'Ver habitación anterior'}
        >
            <span aria-hidden='true'>{direction === 'next' ? '›' : '‹'}</span>
        </button>
    );
}

function normalizeValue(value, yesLabel = 'Disponible') {
    if (value === true || ['si', 'sí', 'true'].includes(String(value).toLowerCase())) return yesLabel;
    return 'No disponible';
}

function CardSlide() {
    const habitaciones = getRooms().filter((room) => String(room.estado).toLowerCase() === 'disponible');

    const settings = useMemo(() => ({
        dots: true,
        infinite: habitaciones.length > 2,
        speed: 340,
        cssEase: 'cubic-bezier(0.22, 1, 0.36, 1)',
        slidesToShow: 3,
        slidesToScroll: 1,
        swipeToSlide: true,
        draggable: true,
        touchThreshold: 8,
        nextArrow: <CarouselArrow direction='next' />,
        prevArrow: <CarouselArrow direction='prev' />,
        responsive: [
            {
                breakpoint: 980,
                settings: { slidesToShow: 2, slidesToScroll: 1 },
            },
            {
                breakpoint: 680,
                settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false },
            },
        ],
    }), [habitaciones.length]);

    return (
        <div className='rooms-carousel'>
            <Slider {...settings}>
                {habitaciones.map((habitacion, index) => {
                    const roomName = habitacion.nombrehab || `Habitación ${index + 1}`;

                    return (
                        <article className='room-slide' key={habitacion._id || `${roomName}-${index}`}>
                            <div className='room-card'>
                                <div className='room-media'>
                                    <img src={getRoomImage(habitacion)} className='habs-cards' alt={`${roomName} en Hotelia`} />
                                    <span className='room-badge'>Hotelia</span>
                                </div>

                                <div className='room-body'>
                                    <div className='room-heading'>
                                        <div>
                                            <p className='room-kicker'>Habitación</p>
                                            <h3>{roomName}</h3>
                                        </div>
                                        <p className='room-price'>
                                            <strong>{formatCOP(habitacion.valornoche)}</strong>
                                            <span>COP / noche</span>
                                        </p>
                                    </div>

                                    <p className='room-description'>{habitacion.descripcion || 'Una opción cómoda para tu próxima estadía en Bogotá.'}</p>

                                    <ul className='room-amenities' aria-label={`Servicios de ${roomName}`}>
                                        <li><i className='fa-solid fa-bed' aria-hidden='true'></i>{habitacion.camas || 1} cama(s)</li>
                                        <li><i className='fa-solid fa-wifi' aria-hidden='true'></i>{normalizeValue(habitacion.wifi, 'Wi‑Fi')}</li>
                                        <li><i className='fa-solid fa-tv' aria-hidden='true'></i>{normalizeValue(habitacion.tv, 'TV')}</li>
                                        <li><i className='fa-solid fa-bath' aria-hidden='true'></i>{normalizeValue(habitacion.banio, 'Baño privado')}</li>
                                    </ul>

                                    <Link to='/login' className='room-reserve-button'>
                                        Reservar
                                        <i className='fa-solid fa-arrow-right' aria-hidden='true'></i>
                                    </Link>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </Slider>
        </div>
    );
}

export default CardSlide;
