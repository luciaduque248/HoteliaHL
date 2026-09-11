import React from 'react';
import Slider from 'react-slick';

const testimonials = [
    {
        quote: 'Un hotel excelente por el buen servicio y la ubicación. Nuestra estancia fue muy confortable y nos sentimos muy bien atendidos.',
        author: 'Huésped Hotelia',
    },
    {
        quote: 'Habitaciones amplias y cómodas. El personal fue amable y atento durante toda la estadía, y la ubicación resultó muy práctica.',
        author: 'Huésped Hotelia',
    },
    {
        quote: 'Una experiencia de mucha calidad, con buena atención y habitaciones cómodas. Volveríamos a elegir Hotelia para una próxima visita.',
        author: 'Huésped Hotelia',
    },
];

function ExpSlide() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 320,
        cssEase: 'cubic-bezier(0.22, 1, 0.36, 1)',
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
        draggable: true,
        arrows: false,
        autoplay: false,
        adaptiveHeight: true,
    };

    return (
        <div className='slide-expe' aria-label='Opiniones de huéspedes'>
            <Slider {...settings}>
                {testimonials.map((testimonial, index) => (
                    <blockquote className='testimonial' key={`${testimonial.author}-${index}`}>
                        <span className='testimonial-mark' aria-hidden='true'>“</span>
                        <p>{testimonial.quote}</p>
                        <footer>{testimonial.author}</footer>
                    </blockquote>
                ))}
            </Slider>
        </div>
    );
}

export default ExpSlide;
