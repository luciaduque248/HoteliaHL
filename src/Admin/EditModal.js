import React, { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import { fileToDataUrl, updateRoom } from '../utils/demoHotelia';
import '../assets/css/Edit.css';

const amenities = [
    { name: 'wifi', label: 'Wi-Fi', icon: 'fa-wifi' },
    { name: 'tv', label: 'Televisión', icon: 'fa-tv' },
    { name: 'nevera', label: 'Nevera', icon: 'fa-snowflake' },
    { name: 'cajafuerte', label: 'Caja fuerte', icon: 'fa-vault' },
    { name: 'banio', label: 'Baño privado', icon: 'fa-bath' },
];

const normalizeAmenity = (value) => {
    const normalized = String(value ?? '').trim().toLowerCase();
    return ['si', 'sí', 'true'].includes(normalized) || value === true ? 'si' : 'no';
};

function EditModal({ habitacion, close }) {
    const [room, setRoom] = useState(() => ({
        ...habitacion,
        newImage: null,
        wifi: normalizeAmenity(habitacion.wifi),
        tv: normalizeAmenity(habitacion.tv),
        nevera: normalizeAmenity(habitacion.nevera),
        cajafuerte: normalizeAmenity(habitacion.cajafuerte),
        banio: normalizeAmenity(habitacion.banio),
    }));
    const [saving, setSaving] = useState(false);

    const handleClose = useCallback(() => close(false), [close]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') handleClose();
        };

        document.addEventListener('keydown', handleKeyDown);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [handleClose]);

    const handleValues = ({ target }) => {
        if (target.type === 'file') {
            setRoom((current) => ({ ...current, newImage: target.files?.[0] || null }));
            return;
        }
        setRoom((current) => ({ ...current, [target.name]: target.value }));
    };

    const handleEdit = async (event) => {
        event.preventDefault();

        try {
            setSaving(true);
            const imageData = room.newImage ? await fileToDataUrl(room.newImage) : room.imageData;
            const { newImage, ...changes } = room;

            updateRoom(habitacion._id, {
                ...changes,
                imageData,
            });

            await Swal.fire({
                title: 'Cambios guardados',
                text: `${room.nombrehab || 'La habitación'} fue actualizada correctamente.`,
                icon: 'success',
                confirmButtonColor: '#0f6f79',
            });
            handleClose();
        } catch (error) {
            await Swal.fire({
                title: 'No se pudieron guardar los cambios',
                text: 'No pudimos actualizar los datos de esta demo. Inténtalo nuevamente.',
                icon: 'error',
                confirmButtonColor: '#0f6f79',
            });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className='edit-modal-backdrop' role='presentation' onMouseDown={handleClose}>
            <section
                className='edit-modal'
                role='dialog'
                aria-modal='true'
                aria-labelledby='edit-room-title'
                onMouseDown={(event) => event.stopPropagation()}
            >
                <header className='edit-modal__header'>
                    <div>
                        <span className='admin-eyebrow'>Edición</span>
                        <h2 id='edit-room-title'>Editar habitación</h2>
                        <p>Actualiza la información del inventario y guarda los cambios cuando esté lista.</p>
                    </div>
                    <button type='button' className='edit-modal__close' onClick={handleClose} aria-label='Cerrar edición'>
                        <i className='fa-solid fa-xmark' aria-hidden='true'></i>
                    </button>
                </header>

                <form className='edit-room-form' onSubmit={handleEdit}>
                    <div className='edit-room-form__scroll'>
                        <section className='edit-room-section'>
                            <div className='edit-room-section__heading'>
                                <span><i className='fa-solid fa-circle-info' aria-hidden='true'></i></span>
                                <div>
                                    <h3>Información general</h3>
                                    <p>Datos principales de la habitación.</p>
                                </div>
                            </div>

                            <div className='edit-room-grid edit-room-grid--two'>
                                <label className='edit-field'>
                                    <span>Número</span>
                                    <input disabled value={room._id || ''} name='_id' type='number' />
                                </label>
                                <label className='edit-field'>
                                    <span>Nombre de habitación</span>
                                    <input required value={room.nombrehab || ''} onChange={handleValues} name='nombrehab' type='text' />
                                </label>
                            </div>

                            <div className='edit-room-grid edit-room-grid--four'>
                                <label className='edit-field'>
                                    <span>Estado</span>
                                    <select name='estado' value={room.estado || 'Disponible'} onChange={handleValues}>
                                        <option value='Disponible'>Disponible</option>
                                        <option value='No disponible'>No disponible</option>
                                        <option value='En mantenimiento'>En mantenimiento</option>
                                    </select>
                                </label>
                                <label className='edit-field'>
                                    <span>Capacidad</span>
                                    <input required min='1' value={room.capacidad || ''} onChange={handleValues} name='capacidad' type='number' />
                                </label>
                                <label className='edit-field'>
                                    <span>Precio / noche</span>
                                    <input required min='0' value={room.valornoche || ''} onChange={handleValues} name='valornoche' type='number' />
                                </label>
                                <label className='edit-field'>
                                    <span>Camas</span>
                                    <input required min='1' value={room.camas || ''} onChange={handleValues} name='camas' type='number' />
                                </label>
                            </div>

                            <label className='edit-field'>
                                <span>Descripción</span>
                                <textarea required rows='4' value={room.descripcion || ''} onChange={handleValues} name='descripcion' />
                            </label>
                        </section>

                        <section className='edit-room-section'>
                            <div className='edit-room-section__heading'>
                                <span><i className='fa-solid fa-image' aria-hidden='true'></i></span>
                                <div>
                                    <h3>Fotografía</h3>
                                    <p>Puedes conservar la imagen actual o seleccionar una nueva.</p>
                                </div>
                            </div>

                            <label className='edit-file-field'>
                                <i className='fa-solid fa-cloud-arrow-up' aria-hidden='true'></i>
                                <div>
                                    <strong>{room.newImage ? room.newImage.name : 'Cambiar fotografía'}</strong>
                                    <span>{room.newImage ? 'Nueva imagen seleccionada' : 'La imagen actual se mantendrá si no eliges otra.'}</span>
                                </div>
                                <b>Elegir archivo</b>
                                <input type='file' name='img' accept='image/*' onChange={handleValues} />
                            </label>
                        </section>

                        <section className='edit-room-section'>
                            <div className='edit-room-section__heading'>
                                <span><i className='fa-solid fa-sparkles' aria-hidden='true'></i></span>
                                <div>
                                    <h3>Servicios incluidos</h3>
                                    <p>Activa o desactiva las comodidades de la habitación.</p>
                                </div>
                            </div>

                            <div className='edit-amenity-grid'>
                                {amenities.map((amenity) => (
                                    <fieldset className='edit-amenity' key={amenity.name}>
                                        <legend>
                                            <i className={`fa-solid ${amenity.icon}`} aria-hidden='true'></i>
                                            {amenity.label}
                                        </legend>
                                        <div>
                                            <label className={room[amenity.name] === 'si' ? 'is-selected' : ''}>
                                                <input type='radio' name={amenity.name} value='si' checked={room[amenity.name] === 'si'} onChange={handleValues} />
                                                Sí
                                            </label>
                                            <label className={room[amenity.name] === 'no' ? 'is-selected' : ''}>
                                                <input type='radio' name={amenity.name} value='no' checked={room[amenity.name] === 'no'} onChange={handleValues} />
                                                No
                                            </label>
                                        </div>
                                    </fieldset>
                                ))}
                            </div>
                        </section>
                    </div>

                    <footer className='edit-modal__footer'>
                        <button type='button' className='edit-modal__cancel' onClick={handleClose}>Cancelar</button>
                        <button type='submit' className='edit-modal__save' disabled={saving}>
                            {saving ? <i className='fa-solid fa-circle-notch fa-spin' aria-hidden='true'></i> : <i className='fa-solid fa-check' aria-hidden='true'></i>}
                            {saving ? 'Guardando…' : 'Guardar cambios'}
                        </button>
                    </footer>
                </form>
            </section>
        </div>
    );
}

export default EditModal;
