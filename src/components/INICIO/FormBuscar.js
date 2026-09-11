import React, { useMemo, useState } from 'react';

import '../../assets/css/Inicio.css';

function FormBuscar() {
    const today = useMemo(() => new Date().toISOString().split('T')[0], []);
    const [form, setForm] = useState({
        ingreso: '',
        salida: '',
        huespedes: 2,
        habitaciones: 1,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        document.getElementById('habitacion')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className='buscar-inicio'>
            <form onSubmit={handleSubmit} aria-label='Buscar disponibilidad'>
                <div className='search-heading'>
                    <span>Planea tu estadía</span>
                    <strong>Busca tu habitación</strong>
                </div>

                <div className='inputs'>
                    <label htmlFor='fecha-ingreso'>Ingreso</label>
                    <input
                        id='fecha-ingreso'
                        type='date'
                        name='ingreso'
                        min={today}
                        value={form.ingreso}
                        onChange={handleChange}
                    />
                </div>

                <div className='inputs'>
                    <label htmlFor='fecha-salida'>Salida</label>
                    <input
                        id='fecha-salida'
                        type='date'
                        name='salida'
                        min={form.ingreso || today}
                        value={form.salida}
                        onChange={handleChange}
                    />
                </div>

                <div className='inputs compact-input'>
                    <label htmlFor='huespedes'>Huéspedes</label>
                    <input
                        id='huespedes'
                        type='number'
                        name='huespedes'
                        min='1'
                        max='8'
                        inputMode='numeric'
                        value={form.huespedes}
                        onChange={handleChange}
                    />
                </div>

                <div className='inputs compact-input'>
                    <label htmlFor='habitaciones'>Habitaciones</label>
                    <input
                        id='habitaciones'
                        type='number'
                        name='habitaciones'
                        min='1'
                        max='4'
                        inputMode='numeric'
                        value={form.habitaciones}
                        onChange={handleChange}
                    />
                </div>

                <button type='submit' className='buscar-inicio-btn'>
                    Ver habitaciones
                    <i className='fa-solid fa-arrow-right' aria-hidden='true'></i>
                </button>
            </form>
        </div>
    );
}

export default FormBuscar;
