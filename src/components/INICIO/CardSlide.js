import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

import { api } from '../../utils/peticiones';
import HotelImage from '../../assets/img/hotel-1.png';
import Descubre1 from '../../assets/img/descubreHL1.png';
import Descubre2 from '../../assets/img/descubreHL2.png';
import '../../assets/css/CardSlide.css';

const fallbackRooms = [
    {
        _id: 'fallback-1',
        nombrehab: 'Habitación Deluxe',
        descripcion: 'Un espacio cómodo para descansar después de recorrer Bogotá, con los servicios esenciales para una estadía tranquila.',
        valornoche: '180.000',
        camas: 1,
        cajafuerte: 'Sí',
        tv: 'Sí',
        wifi: 'Sí',
        nevera: 'Sí',
        banio: 'Privado',
        localImage: HotelImage,
    },
    {
        _id: 'fallback-2',
        nombrehab: 'Habitación Doble',
        descripcion: 'Pensada para viajes en pareja o con compañía, con distribución amplia y una experiencia práctica y acogedora.',
        valornoche: '220.000',
        camas: 2,
        cajafuerte: 'Sí',
        tv: 'Sí',
        wifi: 'Sí',
        nevera: 'Sí',
        banio: 'Privado',
        localImage: Descubre1,
    },
    {
        _id: 'fallback-3',
        nombrehab: 'Suite Hotelia',
        descripcion: 'Más espacio para estancias largas o viajes de trabajo, con una zona de descanso cómoda y servicios completos.',
        valornoche: '290.000',
        camas: 1,
        cajafuerte: 'Sí',
        tv: 'Sí',
        wifi: 'Sí',
        nevera: 'Sí',
        banio: 'Privado',
        localImage: Descubre2,
    },
];

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
    if (value === true || value === 'si' || value === 'sí' || value === 'Si' || value === 'Sí') return yesLabel;
    if (!value || value === 'no' || value === 'No') return 'No disponible';
    return value;
}

function CardSlide() {
    const [habitaciones, setHabitaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [usingFallback, setUsingFallback] = useState(false);

    useEffect(() => {
        let active = true;

        axios.get(api, { timeout: 7000 })
            .then((response) => {
                if (!active) return;
                const rooms = Array.isArray(response.data) ? response.data : [];
                if (rooms.length > 0) {
                    setHabitaciones(rooms);
                } else {
                    setHabitaciones(fallbackRooms);
                    setUsingFallback(true);
                }
            })
            .catch(() => {
                if (!active) return;
                setHabitaciones(fallbackRooms);
                setUsingFallback(true);
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };
    }, []);

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

    if (loading) {
        return (
            <div className='rooms-loading' aria-live='polite'>
                <div className='room-skeleton'></div>
                <div className='room-skeleton'></div>
                <div className='room-skeleton'></div>
            </div>
        );
    }

    return (
        <div className='rooms-carousel'>
            {usingFallback && (
                <p className='rooms-status' role='status'>
                    Mostrando habitaciones de referencia mientras se restablece la disponibilidad en línea.
                </p>
            )}

            <Slider {...settings}>
                {habitaciones.map((habitacion, index) => {
                    const imageSrc = habitacion.localImage || (habitacion.img ? `https://hoteliakuepa.herokuapp.com${habitacion.img}` : HotelImage);
                    const roomName = habitacion.nombrehab || `Habitación ${index + 1}`;
                    const price = habitacion.valornoche || 'Consultar';

                    return (
                        <article className='room-slide' key={habitacion._id || `${roomName}-${index}`}>
                            <div className='room-card'>
                                <div className='room-media'>
                                    <img src={imageSrc} className='habs-cards' alt={`${roomName} en Hotelia`} />
                                    <span className='room-badge'>Hotelia</span>
                                </div>

                                <div className='room-body'>
                                    <div className='room-heading'>
                                        <div>
                                            <p className='room-kicker'>Habitación</p>
                                            <h3>{roomName}</h3>
                                        </div>
                                        <p className='room-price'>
                                            <strong>{price}</strong>
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
