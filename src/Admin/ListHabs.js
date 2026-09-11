import React, { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

import '../assets/css/ListHabs.css';
import EditModal from './EditModal';
import AdminNavBar from '../components/Dashboards/Admin_NavBar';
import {
    deleteRoom,
    formatCOP,
    getRoomImage,
    getRooms,
    resetDemoRooms,
} from '../utils/demoHotelia';

const isEnabled = (value) => ['si', 'sí', 'true'].includes(String(value).trim().toLowerCase()) || value === true;

const statusClass = (status) => {
    const normalized = String(status || '').trim().toLowerCase();
    if (normalized === 'disponible') return 'is-available';
    if (normalized.includes('mantenimiento')) return 'is-maintenance';
    return 'is-unavailable';
};

function ListHabs() {
    const [habitaciones, setHabitaciones] = useState([]);
    const [habitacion, setHabitacion] = useState({});
    const [modal, setModal] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const [deletingId, setDeletingId] = useState(null);

    const refreshRooms = () => setHabitaciones(getRooms());

    useEffect(() => {
        if (!modal) refreshRooms();
    }, [modal]);

    const habitacionesFiltradas = useMemo(() => {
        const term = busqueda.trim().toLowerCase();
        if (!term) return habitaciones;

        return habitaciones.filter((room) => {
            const searchable = [room?._id, room?.nombrehab, room?.estado]
                .map((value) => String(value || '').toLowerCase())
                .join(' ');
            return searchable.includes(term);
        });
    }, [habitaciones, busqueda]);

    const handleDelete = async (room) => {
        const result = await Swal.fire({
            title: '¿Eliminar habitación?',
            text: `${room.nombrehab || `Habitación ${room._id}`} se eliminará de esta demo.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#9f3f3f',
            reverseButtons: true,
        });

        if (!result.isConfirmed) return;

        setDeletingId(room._id);
        deleteRoom(room._id);
        refreshRooms();
        setDeletingId(null);

        await Swal.fire({
            title: 'Habitación eliminada',
            text: 'El inventario demo fue actualizado correctamente.',
            icon: 'success',
            confirmButtonColor: '#0f6f79',
        });
    };

    const handleReset = async () => {
        const result = await Swal.fire({
            title: '¿Restaurar inventario demo?',
            text: 'Se recuperarán las habitaciones originales de la demostración.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Restaurar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#0f6f79',
        });

        if (!result.isConfirmed) return;
        setHabitaciones(resetDemoRooms());
    };

    return (
        <div className='admin-page'>
            <AdminNavBar />

            <main className='rooms-admin'>
                <section className='rooms-admin__header'>
                    <div>
                        <span className='admin-eyebrow'>Inventario demo</span>
                        <h1>Habitaciones</h1>
                        <p>Consulta, busca y administra habitaciones sin depender del antiguo servicio externo de Hotelia.</p>
                    </div>
                    <div className='rooms-admin__header-actions'>
                        <button type='button' className='rooms-admin__reset' onClick={handleReset}>
                            <i className='fa-solid fa-rotate-left' aria-hidden='true'></i>
                            Restaurar demo
                        </button>
                        <Link to='/form-habitaciones' className='rooms-admin__create'>
                            <i className='fa-solid fa-plus' aria-hidden='true'></i>
                            Nueva habitación
                        </Link>
                    </div>
                </section>

                <section className='rooms-admin__toolbar' aria-label='Herramientas del inventario'>
                    <label className='rooms-admin__search'>
                        <i className='fa-solid fa-magnifying-glass' aria-hidden='true'></i>
                        <span className='sr-only'>Buscar habitaciones</span>
                        <input
                            type='search'
                            value={busqueda}
                            placeholder='Buscar por nombre, número o estado'
                            aria-label='Buscar habitaciones'
                            onChange={(event) => setBusqueda(event.target.value)}
                        />
                        {busqueda && (
                            <button type='button' onClick={() => setBusqueda('')} aria-label='Limpiar búsqueda'>
                                <i className='fa-solid fa-xmark' aria-hidden='true'></i>
                            </button>
                        )}
                    </label>
                    <div className='rooms-admin__result-count' aria-live='polite'>
                        <strong>{habitacionesFiltradas.length}</strong>
                        <span>{habitacionesFiltradas.length === 1 ? 'resultado' : 'resultados'}</span>
                    </div>
                </section>

                <div className='rooms-admin__demo-note' role='status'>
                    <i className='fa-solid fa-circle-check' aria-hidden='true'></i>
                    <div>
                        <strong>Demo totalmente funcional</strong>
                        <span>Crear, editar y eliminar funciona en este navegador y se conserva durante la sesión del portafolio.</span>
                    </div>
                </div>

                {habitacionesFiltradas.length > 0 ? (
                    <div className='admin-room-grid'>
                        {habitacionesFiltradas.map((room) => (
                            <article className='admin-room-card' key={room._id}>
                                <div className='admin-room-card__media'>
                                    <img src={getRoomImage(room)} alt={room.nombrehab || 'Habitación de Hotelia'} />
                                    <span className={`admin-room-status ${statusClass(room.estado)}`}>
                                        {room.estado || 'Sin estado'}
                                    </span>
                                    <span className='admin-room-number'>#{room._id}</span>
                                </div>

                                <div className='admin-room-card__body'>
                                    <div className='admin-room-card__heading'>
                                        <div>
                                            <span className='admin-eyebrow'>Habitación</span>
                                            <h2>{room.nombrehab || `Habitación ${room._id}`}</h2>
                                        </div>
                                        <div className='admin-room-card__price'>
                                            <strong>{formatCOP(room.valornoche)}</strong>
                                            <span>COP / noche</span>
                                        </div>
                                    </div>

                                    <p className='admin-room-card__description'>{room.descripcion || 'Sin descripción registrada.'}</p>

                                    <div className='admin-room-card__facts'>
                                        <span><i className='fa-solid fa-users' aria-hidden='true'></i>{room.capacidad || '—'} huéspedes</span>
                                        <span><i className='fa-solid fa-bed' aria-hidden='true'></i>{room.camas || '—'} cama(s)</span>
                                        <span className={isEnabled(room.wifi) ? 'is-enabled' : ''}><i className='fa-solid fa-wifi' aria-hidden='true'></i>Wi-Fi</span>
                                        <span className={isEnabled(room.tv) ? 'is-enabled' : ''}><i className='fa-solid fa-tv' aria-hidden='true'></i>TV</span>
                                    </div>

                                    <div className='admin-room-card__actions'>
                                        <button
                                            type='button'
                                            className='admin-room-card__edit'
                                            onClick={() => {
                                                setHabitacion(room);
                                                setModal(true);
                                            }}
                                        >
                                            <i className='fa-solid fa-pen' aria-hidden='true'></i>
                                            Editar
                                        </button>
                                        <button
                                            type='button'
                                            className='admin-room-card__delete'
                                            disabled={deletingId === room._id}
                                            onClick={() => handleDelete(room)}
                                        >
                                            <i className='fa-solid fa-trash-can' aria-hidden='true'></i>
                                            {deletingId === room._id ? 'Eliminando…' : 'Eliminar'}
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className='rooms-admin__empty'>
                        <span><i className='fa-solid fa-bed' aria-hidden='true'></i></span>
                        <h2>No encontramos habitaciones</h2>
                        <p>{busqueda ? 'Prueba con otro término de búsqueda.' : 'Crea la primera habitación para comenzar a gestionar el inventario.'}</p>
                        {!busqueda && <Link to='/form-habitaciones'>Crear habitación</Link>}
                    </div>
                )}
            </main>

            {modal ? <EditModal close={setModal} habitacion={habitacion} /> : null}
        </div>
    );
}

export default ListHabs;
