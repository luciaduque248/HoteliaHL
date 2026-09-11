import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../utils/peticiones';
import Nevera from '../assets/img/iconos/nevera.png';
import Footer from '../components/Footer/Footer';

import '../assets/css/ListHabs.css';
import EditModal from './EditModal';
import AdminNavBar from '../components/Dashboards/Admin_NavBar';

function ListHabs() {
    const [habitaciones, setHabitaciones] = useState([]);
    const [habitacion, setHabitacion] = useState({});
    const [modal, setModal] = useState(false);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        if (modal) return undefined;

        let active = true;

        axios.get(api)
            .then((response) => {
                if (active) setHabitaciones(Array.isArray(response.data) ? response.data : []);
            })
            .catch((error) => {
                console.error('No fue posible cargar las habitaciones.', error);
            });

        return () => {
            active = false;
        };
    }, [modal]);

    const habitacionesFiltradas = useMemo(() => {
        const term = busqueda.trim().toLowerCase();
        if (!term) return habitaciones;

        return habitaciones.filter((room) => {
            const id = room?._id?.toString().toLowerCase() || '';
            const name = room?.nombrehab?.toString().toLowerCase() || '';
            return id.includes(term) || name.includes(term);
        });
    }, [habitaciones, busqueda]);

    return (
        <div>
            <AdminNavBar />

            <div className='container-list-habs'>
                <h1>HABITACIONES</h1>

                <div className='busqueda-rooms'>
                    <input
                        className='inputBuscar'
                        type='search'
                        value={busqueda}
                        placeholder='¿Qué habitación deseas buscar?'
                        aria-label='Buscar habitaciones'
                        onChange={(event) => setBusqueda(event.target.value)}
                    />
                </div>

                <div className='cards-list-habitaciones'>
                    {habitacionesFiltradas.map((room) => (
                        <div className='list-cards-vertical' key={room._id}>
                            <div className='info-image-card'>
                                <div className='cards-horizontal'>
                                    <div className='description-room'>
                                        <div className='info-list'>
                                            <h1>{room.nombrehab}</h1>
                                            <p>{room.descripcion}</p>

                                            <div className='price-list'>
                                                <h1>PRECIO</h1>
                                                <p>{room.valornoche} COP / NOCHE</p>
                                            </div>
                                        </div>

                                        <div className='details'>
                                            <div className='lines'>
                                                <div className='each-thing'>
                                                    <i className='fa-solid fa-bed'></i>
                                                    <p>{room.camas} cama(s)</p>
                                                </div>
                                                <div className='each-thing'>
                                                    <i className='fa-solid fa-vault'></i>
                                                    <p>{room.cajafuerte === 'si' ? 'Sí' : 'No'}</p>
                                                </div>
                                            </div>

                                            <div className='lines rs-320px'>
                                                <div className='each-thing'>
                                                    <i className='fa-solid fa-tv'></i>
                                                    <p>{room.tv === 'si' ? 'Sí' : 'No'}</p>
                                                </div>
                                                <div className='each-thing'>
                                                    <i className='fa-solid fa-wifi'></i>
                                                    <p>{room.wifi === 'si' ? 'Sí' : 'No'}</p>
                                                </div>
                                            </div>

                                            <div className='lines rs-320px'>
                                                <div className='each-thing'>
                                                    <img src={Nevera} alt='' aria-hidden='true' />
                                                    <p>{room.nevera === 'si' ? 'Sí' : 'No'}</p>
                                                </div>
                                                <div className='each-thing'>
                                                    <i className='fa-solid fa-bath'></i>
                                                    <p>{room.banio === 'si' ? 'Sí' : 'No'}</p>
                                                </div>
                                            </div>

                                            <button
                                                type='button'
                                                onClick={() => {
                                                    setModal(true);
                                                    setHabitacion(room);
                                                }}
                                                className='edit-rooms'
                                            >
                                                EDITAR
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className='image-room'>
                                    <img
                                        src={`https://hoteliakuepa.herokuapp.com${room.img}`}
                                        className='img-rooms'
                                        alt={room.nombrehab || 'Habitación de Hotelia'}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {modal ? <EditModal close={setModal} habitacion={habitacion} /> : null}
            </div>

            <Footer />
        </div>
    );
}

export default ListHabs;
