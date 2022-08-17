import axios from 'axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { api } from '../utils/peticiones';
import Nevera from '../assets/img/iconos/nevera.png'

import '../assets/css/Edit.css'

function EditModal({ habitacion, close }) {
    const handleEdit = async (e) => {

        let data = new FormData();
        data.append('_id', room._id)
        data.append('nombrehab', room.nombrehab)
        data.append('capacidad', room.capacidad)
        data.append('camas', room.camas)
        data.append('descripcion', room.descripcion)
        data.append('wifi', room.wifi)
        data.append('tv', room.tv)    
        data.append('banio', room.banio)
        data.append('cajafuerte', room.cajafuerte)
        data.append('nevera', room.nevera)
        data.append('valornoche', room.valornoche)
        data.append('estado', room.estado)
        data.append('img', room.img)
        data.append('__v', room.__v)
        data.append('reservas', room.reservas)

        let config = {
            header : {
              'Content-Type' : 'multipart/form-data'
            }
          }
        // e.preventDefault()
        console.log(`${api}${habitacion._id}`)
        const response = await axios.put(`${api}${habitacion._id}`, data, config);//await espera hasta que se ejcute la petición
        console.log(response);
        if (response.status === 200) {
            Swal.fire(
                'Guardado!',
                `El personaje <strong> ${habitacion.nombrehab}</strong> ha sido guardado exitosamente!`,
                'success'
            )
            handleClose();
        } else {
            Swal.fire(
                'Error!',
                'Hubo un problema al registrar el personaje!',
                'error'
            )
        }
    }

    const handleClose = () => {
        close(false)
    }

    const [room, setRoom] = useState(habitacion)

    const handleValues = (event) => {
        if(event.target.files){
            console.log(event.target.files)
            setRoom({ ...room, [event.target.name]: event.target.files[0] })
        }else{
            setRoom({ ...room, [event.target.name]: event.target.value })
        }
    }

    return (
        <div>
            <div className='modalEdit' id='modal'>
                <div className='editar-modal'>

                    <div className='closeModal'>
                        <button onClick={handleClose} className=''/>
                    </div>
                    
                    <div className='title-modal'>
                        <h1>EDITAR HABITACIÓN</h1>
                    </div>

                    <form onSubmit={handleEdit} className='form-modal'>
                        
                        <div className='info-modal'>
                            <div className='info1'>

                                <div className='lines-hz-edit'>
                                    <div className='each-option-vertical hab-general'>
                                        <label>No. de Hab </label>
                                        <input 
                                            disabled 
                                            value={room._id} 
                                            onChange={handleValues} 
                                            name='_id' 
                                            id='_id' 
                                            className='nohab' 
                                            type='number' />
                                    </div>

                                    <div className='each-option-vertical hab-general'>
                                        <label>Nombre de Habitación </label>
                                        <input 
                                            value={room.nombrehab} 
                                            onChange={handleValues} 
                                            name='nombrehab' 
                                            id='nombrehab' 
                                            className='habitacion-edit' 
                                            type='text' />
                                    </div>
                                </div>
                                
                                <div className='lines-hz-edit vertical-rs'>
                                    <div className='each-option-vertical'>
                                        <label>Capacidad de Personas </label>
                                        <input value={room.capacidad} onChange={handleValues} name='capacidad' id='capacidad' type='number' />
                                    </div>

                                    <div className='each-option-vertical'>
                                        <label>Precio </label>
                                        <input value={room.valornoche} onChange={handleValues} name='valornoche' id='valornoche' className='price-edit' type='number' />
                                    </div>

                                    <div className='each-option-vertical'>
                                        <label>No. de Camas </label>
                                        <input value={room.camas} onChange={handleValues} name='camas' id='camas' className='' type='number' />
                                    </div>
                                </div>

                                <div className='lines-hz-edit'>
                                    <div className='each-option-vertical'>
                                        <label>Descripción</label>
                                        <textarea value={room.descripcion} onChange={handleValues} id="descripcion" name="descripcion" rows="5"  className='' />
                                    </div>
                                </div>

                            </div>

                            <div className='info2'>
                                <div className='each-option-vertical ' >
                                    <label>Foto</label>
                                    <div className=''>
                                        <input
                                        onChange={handleValues} 
                                            filename={room.img}
                                            name='img'
                                            id='img'
                                            className='fotos-edit'
                                            type='file' />
                                    </div>
                                </div>

                                <div className='each-option-vertical'>
                                    <label>Estado</label>
                                    <select name="estado" className=''>
                                        <option 
                                            value={habitacion.estado} 
                                            selected={habitacion.estado === "Disponible" ? true : false} className='estado-form-yes'>DISPONIBLE
                                        </option>
                                        
                                        <option 
                                            value={habitacion.estado} 
                                            selected={habitacion.estado === "No disponible" ? true : false}     className='estado-form-no'>NO DISPONIBLE
                                        </option>
                                        
                                        <option 
                                            value={habitacion.estado} 
                                            selected={habitacion.estado === "En mantenimiento" ? true : false} className='estado-form-upkeep'>EN MANTENIMIENTO
                                        </option>
                                    </select>
                                </div>
                                
                                <div className='each-option-vertical'>
                                    <h3>Observaciones adicionales</h3>

                                    <div className='each-observation-hz'>
                                        <div className='observ-vertical'>
                                            <div className='line-hz-note'>
                                                <div className='item-edit'>
                                                    <div className='name-items'>
                                                        <i className="fa-solid fa-vault"></i>
                                                        <p>Caja fuerte</p>
                                                    </div>

                                                    <div className='selectors'>
                                                        <input
                                                            value={true}
                                                            name='cajafuerte'
                                                            id='cajafuerte'
                                                            type="radio"
                                                            checked={room.cajafuerte === "si" ? true : false}
                                                            onChange={(e)=>handleValues({...e, target:{name: 'cajafuerte',value: "si"}})} />
                                                        <label>Si</label>
                                                    </div>

                                                    <div className='selectors'>
                                                        <input
                                                            value={false}
                                                            name='cajafuerte'
                                                            id='cajafuerte'
                                                            type="radio"
                                                            checked={room.cajafuerte === "no" ? true : false}
                                                            onChange={(e)=>handleValues({...e, target:{name: 'cajafuerte',value: "no"}})} />
                                                        <label >No</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='line-hz-note'>
                                                <div className='item-edit'>
                                                    <div className='name-items'>
                                                        <i className="fa-solid fa-wifi"></i>
                                                        <p>WI-FI</p>
                                                    </div>
                                                    <div className='selectors'>
                                                        <input
                                                            name='wifi'
                                                            id='wifi'
                                                            type="radio"
                                                            onChange={(e)=>handleValues({...e, target:{name: 'wifi',value: "si"}})}
                                                            checked={room.wifi === "si" ? true : false} />
                                                        <label>Si</label>
                                                    </div>

                                                    <div className='selectors'>
                                                        <input
                                                            name='wifi'
                                                            id='wifi'
                                                            type="radio"
                                                            onChange={(e)=>handleValues({...e, target:{name: 'wifi',value: "no"}})}
                                                            checked={room.wifi === "no" ? true : false} />
                                                        <label>No</label>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>

                                        <div className='observ-vertical'>
                                            <div className='line-hz-note'>
                                                <div className='item-edit'>
                                                    <div className='name-items'>
                                                        <img src={Nevera} alt='nevera' />
                                                        <p>Nevera</p>
                                                    </div>

                                                    <div className='selectors'>
                                                        <input
                                                            name='nevera'
                                                            id='nevera'
                                                            type="radio"
                                                            onChange={(e)=>handleValues({...e, target:{name: 'nevera',value: "si"}})}
                                                            checked={room.nevera === "si" ? true : false} />
                                                        <label>Si</label>
                                                    </div>

                                                    <div className='selectors'>
                                                        <input
                                                            name='nevera'
                                                            id='nevera'
                                                            type="radio"
                                                            onChange={(e)=>handleValues({...e, target:{name: 'nevera',value: "no"}})}
                                                            checked={room.nevera === "no" ? true : false} />
                                                        <label >No</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='line-hz-note'>
                                                <div className='item-edit'>
                                                    <div className='name-items'>
                                                        <i className="fa-solid fa-tv"></i>
                                                        <p>TV</p>
                                                    </div>
                                                    <div className='selectors'>
                                                        <input
                                                            name='tv'
                                                            id='tv'
                                                            type="radio"
                                                            onChange={(e)=>handleValues({...e, target:{name: 'tv',value: "si"}})}
                                                            checked={room.tv === "si" ? true : false} />
                                                        <label>Si</label>
                                                    </div>

                                                    <div className='selectors'>
                                                        <input
                                                            name='tv'
                                                            id='tv'
                                                            type="radio"
                                                            onChange={(e)=>handleValues({...e, target:{name: 'tv',value: "no"}})}
                                                            checked={room.tv === "no" ? true : false} />
                                                        <label >No</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='observ-vertical'>
                                            <div className='line-hz-note'>
                                                <div className='item-edit'>
                                                    <div className='name-items'>
                                                        <i className="fa-solid fa-bath"></i>
                                                        <p>Baño</p>
                                                    </div>
                                                    <div className='selectors'>
                                                        <input
                                                            name='banio'
                                                            id='banio'
                                                            type="radio"
                                                            onChange={(e)=>handleValues({...e, target:{name: 'banio',value: "si"}})}
                                                            checked={room.banio === "si" ? true : false} />
                                                        <label>Si</label>
                                                    </div>

                                                    <div className='selectors'>
                                                        <input
                                                            name='banio'
                                                            id='banio'
                                                            type="radio"
                                                            onChange={(e)=>handleValues({...e, target:{name: 'banio',value: "no"}})}
                                                            checked={room.banio === "no" ? true : false} />
                                                        <label >No</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div className='button-save-edit'>
                            <button onClick={() => handleEdit()} type='button'>GUARDAR CAMBIOS</button>
                        </div>
                    </form>

                </div>

            </div>
        </div>
    )
}

export default EditModal