import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

import { api } from '../utils/peticiones';
import FallbackRoom from '../assets/img/hotel-1.png';
import '../assets/css/ListHabs.css';
import EditModal from './EditModal';
import AdminNavBar from '../components/Dashboards/Admin_NavBar';

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
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        if (modal) return undefined;

        let active = true;
        setLoading(true);

        axios.get(api)
            .then((response) => {
                if (!active) return;
                setHabitaciones(Array.isArray(response.data) ? response.data : []);
                setLoadError(false);
            })
            .catch(() => {
                if (!active) return;
                setLoadError(true);
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };
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
            text: `${room.nombrehab || `Habitación ${room._id}`} se eliminará del inventario.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#9f3f3f',
            reverseButtons: true,
        });

        if (!result.isConfirmed) return;

        try {
            setDeletingId(room._id);
            await axios.delete(`${api}${room._id}`);
            setHabitaciones((current) => current.filter((item) => item._id !== room._id));
            await Swal.fire({
                title: 'Habitación eliminada',
                text: 'El inventario fue actualizado correctamente.',
                icon: 'success',
                confirmButtonColor: '#0f6f79',
            });
        } catch (error) {
            await Swal.fire({
                title: 'No se pudo eliminar',
                text: 'El API no completó la solicitud. Inténtalo nuevamente.',
                icon: 'error',
                confirmButtonColor: '#0f6f79',
            });
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className='admin-page'>
            <AdminNavBar />

            <main className='rooms-admin'>
                <section className='rooms-admin__header'>
                    <div>
                        <span className='admin-eyebrow'>Inventario</span>
                        <h1>Habitaciones</h1>
                        <p>Consulta el inventario, busca por nombre, número o estado y administra cada habitación.</p>
                    </div>
                    <Link to='/form-habitaciones' className='rooms-admin__create'>
                        <i className='fa-solid fa-plus' aria-hidden='true'></i>
                        Nueva habitación
                    </Link>
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

                {loadError && (
                    <div className='rooms-admin__notice' role='status'>
                        <i className='fa-solid fa-triangle-exclamation' aria-hidden='true'></i>
                        <div>
                            <strong>No pudimos cargar el inventario.</strong>
                            <span>El API histórico de Hotelia no está respondiendo en este momento.</span>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className='admin-room-grid' aria-label='Cargando habitaciones'>
                        {[1, 2, 3].map((item) => <div className='admin-room-skeleton' key={item} />)}
                    </div>
                ) : habitacionesFiltradas.length > 0 ? (
                    <div className='admin-room-grid'>
                        {habitacionesFiltradas.map((room) => (
                            <article className='admin-room-card' key={room._id}>
                                <div className='admin-room-card__media'>
                                    <img
                                        src={room.img ? `https://hoteliakuepa.herokuapp.com${room.img}` : FallbackRoom}
                                        alt={room.nombrehab || 'Habitación de Hotelia'}
                                        onError={(event) => {
                                            event.currentTarget.onerror = null;
                                            event.currentTarget.src = FallbackRoom;
                                        }}
                                    />
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
                                            <strong>{Number(room.valornoche || 0).toLocaleString('es-CO')}</strong>
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
                ) : !loadError ? (
                    <div className='rooms-admin__empty'>
                        <span><i className='fa-solid fa-bed' aria-hidden='true'></i></span>
                        <h2>No encontramos habitaciones</h2>
                        <p>{busqueda ? 'Prueba con otro término de búsqueda.' : 'Crea la primera habitación para comenzar a gestionar el inventario.'}</p>
                        {!busqueda && <Link to='/form-habitaciones'>Crear habitación</Link>}
                    </div>
                ) : null}
            </main>

            {modal ? <EditModal close={setModal} habitacion={habitacion} /> : null}
        </div>
    );
}

export default ListHabs;
