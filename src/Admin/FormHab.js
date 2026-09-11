import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

import '../assets/css/FormHab.css';
import AdminNavBar from '../components/Dashboards/Admin_NavBar';
import { createRoom, fileToDataUrl } from '../utils/demoHotelia';

const initialRoom = {
    _id: '',
    nombrehab: '',
    capacidad: '',
    valornoche: '',
    camas: '',
    descripcion: '',
    img: null,
    cajafuerte: 'no',
    tv: 'no',
    wifi: 'no',
    nevera: 'no',
    banio: 'no',
    estado: 'Disponible',
};

const amenityOptions = [
    { name: 'wifi', label: 'Wi-Fi', icon: 'fa-wifi' },
    { name: 'tv', label: 'Televisión', icon: 'fa-tv' },
    { name: 'nevera', label: 'Nevera', icon: 'fa-snowflake' },
    { name: 'cajafuerte', label: 'Caja fuerte', icon: 'fa-vault' },
    { name: 'banio', label: 'Baño privado', icon: 'fa-bath' },
];

function FormHab() {
    const [data, setData] = useState(initialRoom);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = ({ target }) => {
        const value = target.type === 'file' ? target.files?.[0] || null : target.value;
        setData((current) => ({ ...current, [target.name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setSubmitting(true);
            const imageData = data.img ? await fileToDataUrl(data.img) : null;

            createRoom({
                ...data,
                img: undefined,
                imageData,
                imageKey: imageData ? undefined : 'hotel',
            });

            await Swal.fire({
                title: 'Habitación creada',
                text: `${data.nombrehab || 'La habitación'} fue agregada al inventario demo.`,
                icon: 'success',
                confirmButtonColor: '#0f6f79',
            });

            navigate('/list-habitaciones');
        } catch (error) {
            const duplicate = error?.message === 'ROOM_EXISTS';
            await Swal.fire({
                title: duplicate ? 'Número de habitación repetido' : 'No se pudo crear la habitación',
                text: duplicate
                    ? 'Usa un número diferente porque esa habitación ya existe en el inventario.'
                    : 'No pudimos guardar los datos en la demo. Inténtalo nuevamente.',
                icon: 'error',
                confirmButtonColor: '#0f6f79',
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className='admin-page'>
            <AdminNavBar />

            <main className='room-form-page'>
                <header className='room-form-page__header'>
                    <div>
                        <span className='admin-eyebrow'>Alta de habitación</span>
                        <h1>Nueva habitación</h1>
                        <p>Completa la información principal, el estado y los servicios antes de agregarla al inventario demo.</p>
                    </div>
                    <Link to='/list-habitaciones' className='room-form-page__back'>
                        <i className='fa-solid fa-arrow-left' aria-hidden='true'></i>
                        Volver al inventario
                    </Link>
                </header>

                <form className='room-form' onSubmit={handleSubmit}>
                    <section className='room-form__panel'>
                        <div className='room-form__section-heading'>
                            <span className='room-form__section-icon'><i className='fa-solid fa-circle-info' aria-hidden='true'></i></span>
                            <div>
                                <h2>Información general</h2>
                                <p>Datos con los que se identificará la habitación.</p>
                            </div>
                        </div>

                        <div className='room-form__grid room-form__grid--two'>
                            <label className='room-field'>
                                <span>Número de habitación</span>
                                <input required min='1' type='number' name='_id' value={data._id} onChange={handleChange} placeholder='Ej. 204' />
                            </label>

                            <label className='room-field'>
                                <span>Nombre de habitación</span>
                                <input required type='text' name='nombrehab' value={data.nombrehab} onChange={handleChange} placeholder='Ej. Suite Hotelia' />
                            </label>
                        </div>

                        <div className='room-form__grid room-form__grid--four'>
                            <label className='room-field'>
                                <span>Estado</span>
                                <select name='estado' value={data.estado} onChange={handleChange}>
                                    <option value='Disponible'>Disponible</option>
                                    <option value='No disponible'>No disponible</option>
                                    <option value='En mantenimiento'>En mantenimiento</option>
                                </select>
                            </label>

                            <label className='room-field'>
                                <span>Capacidad</span>
                                <div className='room-field__with-icon'>
                                    <i className='fa-solid fa-users' aria-hidden='true'></i>
                                    <input required min='1' type='number' name='capacidad' value={data.capacidad} onChange={handleChange} placeholder='2' />
                                </div>
                            </label>

                            <label className='room-field'>
                                <span>Precio por noche</span>
                                <div className='room-field__with-icon'>
                                    <span className='room-field__currency'>$</span>
                                    <input required min='0' type='number' name='valornoche' value={data.valornoche} onChange={handleChange} placeholder='220000' />
                                </div>
                            </label>

                            <label className='room-field'>
                                <span>Número de camas</span>
                                <div className='room-field__with-icon'>
                                    <i className='fa-solid fa-bed' aria-hidden='true'></i>
                                    <input required min='1' type='number' name='camas' value={data.camas} onChange={handleChange} placeholder='1' />
                                </div>
                            </label>
                        </div>

                        <label className='room-field'>
                            <span>Descripción</span>
                            <textarea required rows='5' name='descripcion' value={data.descripcion} onChange={handleChange} placeholder='Describe el espacio, la experiencia y los aspectos que diferencian esta habitación.' />
                            <small>{data.descripcion.length} caracteres</small>
                        </label>
                    </section>

                    <section className='room-form__panel'>
                        <div className='room-form__section-heading'>
                            <span className='room-form__section-icon'><i className='fa-solid fa-image' aria-hidden='true'></i></span>
                            <div>
                                <h2>Fotografía</h2>
                                <p>Selecciona la imagen principal que se mostrará a los huéspedes.</p>
                            </div>
                        </div>

                        <label className='room-file-field'>
                            <span className='room-file-field__icon'><i className='fa-solid fa-cloud-arrow-up' aria-hidden='true'></i></span>
                            <span className='room-file-field__copy'>
                                <strong>{data.img ? data.img.name : 'Seleccionar fotografía'}</strong>
                                <small>Para esta demo, la imagen queda guardada localmente en tu navegador.</small>
                            </span>
                            <span className='room-file-field__button'>Elegir archivo</span>
                            <input type='file' name='img' accept='image/*' onChange={handleChange} />
                        </label>
                    </section>

                    <section className='room-form__panel'>
                        <div className='room-form__section-heading'>
                            <span className='room-form__section-icon'><i className='fa-solid fa-sparkles' aria-hidden='true'></i></span>
                            <div>
                                <h2>Servicios incluidos</h2>
                                <p>Indica qué comodidades están disponibles en esta habitación.</p>
                            </div>
                        </div>

                        <div className='amenity-grid'>
                            {amenityOptions.map((amenity) => (
                                <fieldset className='amenity-control' key={amenity.name}>
                                    <legend>
                                        <i className={`fa-solid ${amenity.icon}`} aria-hidden='true'></i>
                                        {amenity.label}
                                    </legend>
                                    <div className='amenity-control__options'>
                                        <label className={data[amenity.name] === 'si' ? 'is-selected' : ''}>
                                            <input type='radio' name={amenity.name} value='si' checked={data[amenity.name] === 'si'} onChange={handleChange} />
                                            Sí
                                        </label>
                                        <label className={data[amenity.name] === 'no' ? 'is-selected' : ''}>
                                            <input type='radio' name={amenity.name} value='no' checked={data[amenity.name] === 'no'} onChange={handleChange} />
                                            No
                                        </label>
                                    </div>
                                </fieldset>
                            ))}
                        </div>
                    </section>

                    <div className='room-form__footer'>
                        <div>
                            <strong>Revisa los datos antes de guardar.</strong>
                            <span>Podrás editar la habitación posteriormente desde el inventario.</span>
                        </div>
                        <button type='submit' disabled={submitting}>
                            {submitting ? <i className='fa-solid fa-circle-notch fa-spin' aria-hidden='true'></i> : <i className='fa-solid fa-plus' aria-hidden='true'></i>}
                            {submitting ? 'Creando…' : 'Crear habitación'}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default FormHab;
