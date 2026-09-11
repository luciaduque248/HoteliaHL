import React from 'react';
import Slider from 'react-slick';

import Descubre1 from '../../assets/img/descubreHL1.png';
import Descubre2 from '../../assets/img/descubreHL2.png';
import Descubre3 from '../../assets/img/descubreHL3.png';

function GalleryArrow({ className, onClick, direction }) {
    return (
        <button
            type='button'
            className={`${className || ''} gallery-arrow gallery-arrow--${direction}`}
            onClick={onClick}
            aria-label={direction === 'next' ? 'Siguiente imagen' : 'Imagen anterior'}
        >
            <span aria-hidden='true'>{direction === 'next' ? '›' : '‹'}</span>
        </button>
    );
}

function DescubreSlide() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 320,
        cssEase: 'cubic-bezier(0.22, 1, 0.36, 1)',
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
        draggable: true,
        touchThreshold: 8,
        autoplay: false,
        nextArrow: <GalleryArrow direction='next' />,
        prevArrow: <GalleryArrow direction='prev' />,
        responsive: [
            {
                breakpoint: 680,
                settings: { arrows: false },
            },
        ],
    };

    return (
        <div className='descubre-galeria'>
            <Slider {...settings}>
                <figure className='gallery-frame'>
                    <img src={Descubre1} alt='Espacios de Hotelia' />
                </figure>
                <figure className='gallery-frame'>
                    <img src={Descubre2} alt='Habitación de Hotelia' />
                </figure>
                <figure className='gallery-frame'>
                    <img src={Descubre3} alt='Detalles de una habitación de Hotelia' />
                </figure>
            </Slider>
        </div>
    );
}

export default DescubreSlide;
