import React, { useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'

import '../assets/css/FormHab.css'
import Footer from '../components/Footer/Footer'
import Nevera from '../assets/img/iconos/nevera.png'
import AdminNavBar from '../components/Dashboards/Admin_NavBar';
// import Admin_NavBar from '../components/Dashboards/Admin_NavBar'

const FormHab = () => {
    /*1.Inicializamos los inputs en el estado, para poder recibir los valores que se digiten 
    en él y controlarlos */
    const [data, setData] = useState({
        id: "",
        _id: "",
        nombrehab: "",
        capacidad: "",
        valornoche: "",
        camas: "",
        descripcion: "",
        img: "",
        cajafuerte: false,
        tv: false,
        wifi: false,
        nevera: false,
        banio: false,
        estado:""
    })
    /*2. Se usa la función handleChange para que cada vez que haya un cambio en el input
    guarde el name y el value del mismo */



    const handleChange = ({ target }) => {
        // console.log(target.value)
        
        //Cada vez que haya un cambio se va a guardar el valor en el estado data
        setData({
            
            ...data,
            // [target.name]: target.value
            [target.name]: target.name === 'img'?target.files[0]:target.value
        })
    }

    /*4. Crear petición asíncrona*/
    const url = "https://hoteliakuepa.herokuapp.com/habitaciones";

    /*3. funcion para procesar el envío del formulario*/
    const handleSubmit = async (e) => {
        // console.log(data.nombrehab)
        // let data = new FormData();
        // console.log(data.nombrehab)
        // data.append('_id', data._id)
        // data.append('nombrehab', data.nombrehab)
        // data.append('capacidad', data.capacidad)
        // data.append('camas', data.camas)
        // data.append('descripcion', data.descripcion)
        // data.append('wifi', data.wifi)
        // data.append('tv', data.tv)    
        // data.append('banio', data.banio)
        // data.append('cajafuerte', data.cajafuerte)
        // data.append('nevera', data.nevera)
        // data.append('valornoche', data.valornoche)
        // data.append('estado', data.estado)
        // data.append('img', data.img)
        // data.append('__v', data.__v)
        // data.append('reservas', data.reservas)
        
        let config = {
            header : {
              'Content-Type' : 'multipart/form-data'
            }
          }

        e.preventDefault();
        const response = await axios.post(url, data, config);//await espera hasta que se ejcute la petición
        // console.log(response);
        if (response.status === 200) {
            Swal.fire(
                'Guardado!',
                `La habitación <strong> ${response.data.nombrehab}</strong> ha sido registrada exitosamente!`,
                'success'
            )

        } else {
            Swal.fire(
                'Error!',
                'Hubo un problema al registrar la habitación!',
                'error'
            )
        }
    }
    
    return (
        <div>
            <AdminNavBar/>

            <div className='container-form-habs'>
                <h1>CREAR HABITACIÓN</h1>

                <form id='formulario' onSubmit={handleSubmit}>

                    <div className='line1-habitacion'>
                        <div className='flex-form' id='grupo__nohab'>
                            <label className='formulario__label'>No. de Hab</label>
                            
                            <input
                                required
                                className='no-hab' 
                                placeholder="Ingrese el número de la habitación"
                                type='number' 
                                name='_id' 
                                value={data._id}
                                onChange={handleChange}
                                />

                        </div>

                        <div className='flex-form nombrehab'>
                            <label className='formulario__label'>Nombre de Habitación</label>
                            <input 
                                required 
                                placeholder="Ej: President's Suite"
                                className='no-hab' 
                                type='text' 
                                name='nombrehab'
                                value={data.nombrehab}
                                onChange={handleChange} 
                                />

                        </div>
                    </div>

                    <div className='line2-habitacion'>
                        <div className='select-estado-form flex-form'>
                            <label className='formulario__label estado-label'>Estado</label>
                            <select name="estado" className='estado-form' onChange={handleChange}>
                                <option value={data.estado} className='estado-form-yes'>DISPONIBLE</option>
                                <option value={data.estado} className='estado-form-no'selected>NO DISPONIBLE</option>
                                <option value={data.estado} className='estado-form-upkeep'>EN MANTENIMIENTO</option>
                            </select>
                        </div>
                        <div className='flex-form flex-form-line2'>
                            <label className='formulario__label'>Capacidad de Personas</label>
                            <input  
                                required
                                type='number' 
                                name='capacidad' 
                                value={data.capacidad}
                                onChange={handleChange} 
                                />
                        </div>
                        <div className='flex-form flex-form-line2'>
                            <label className='formulario__label'>Precio</label>
                            <input  
                                required
                                placeholder="Ej: 000000"
                                className='precio-form' 
                                type='number' 
                                name='valornoche' 
                                value={data.valornoche}
                                onChange={handleChange} 
                                />
                        </div>
                        <div className='flex-form flex-form-line2'>
                            <label className='formulario__label'>No. de Camas</label>
                            <input  
                                required
                                className='camas-input-form'
                                type='number' 
                                name='camas'
                                value={data.camas}
                                onChange={handleChange} 
                                />
                        </div>

                    </div>

                    <div className='line3-habitacion'>
                        <div className='flex-form'>
                            <label className='formulario__label'>Descripción</label>
                            <textarea
                                required
                                value={data.descripcion}
                                onChange={handleChange} 
                                placeholder="Ingrese la descripción de la habitación" 
                                id="story" 
                                rows="5" 
                                cols="33" 
                                className='textarea' 
                                name='descripcion' />
                        </div>

                    </div>

                    <div className='flex-fotos-observ'>
                        <div className='line4-habitacion'>
                            <div className='flex-form2  file-select-form'>
                                <label>Fotos</label>
                                <div className='flex-select-form'>
                                    <input
                                        name='img'
                                        required
                                        onChange={handleChange}
                                        className='fotos-edit-form'
                                        type='file' />
                                </div>
                            </div>
                        </div>

                        <div className='line5-habitacion'>
                            <div className='flex-form2'>
                                <h3>Observaciones adicionales</h3>

                                <div className='flex-si-no'>
                                    <div className='lines-form'>

                                        <div className='observ-form'>
                                            <div className='cajafuerte'>
                                                <i className="fa-solid fa-vault"></i>
                                                <p>Caja fuerte</p>
                                            </div>

                                            <div className='selectors-radio'>
                                                <input
                                                    type="radio"
                                                    name="cajafuerte"
                                                    onChange={handleChange}
                                                    value={"Si"}
                                                />
                                                <label className='formulario__label'>Si</label>
                                            </div>

                                            <div className='selectors-radio'>
                                                <input
                                                    type="radio"
                                                    name="cajafuerte"
                                                    onChange={handleChange}
                                                    value={"No"}
                                                />
                                                <label className='formulario__label'>No</label>
                                            </div>
                                        </div>

                                        <div className='observ-form'>
                                            <p className='wifi'><i className="fa-solid fa-wifi"></i>WI-FI</p>
                                            <div className='selectors-radio'>
                                                <input
                                                    type="radio"
                                                    name='wifi'
                                                    onChange={handleChange}
                                                    value={"Si"} />
                                                <label className='formulario__label'>Si</label>
                                            </div>

                                            <div className='selectors-radio'>
                                                <input
                                                    type="radio"
                                                    name='wifi'
                                                    onChange={handleChange}
                                                    value={"No"} />
                                                <label className='formulario__label'>No</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='lines-form'>
                                        <div className='observ-form'>
                                            <img src={Nevera} alt='nevera' className='nevera' />
                                            <p>Nevera</p>
                                            <div className='selectors-radio'>
                                                <input
                                                    type="radio"
                                                    name='nevera'
                                                    onChange={handleChange}
                                                    value={"Si"} />
                                                <label className='formulario__label'>Si</label>
                                            </div>

                                            <div className='selectors-radio'>
                                                <input
                                                    type="radio"
                                                    name='nevera'
                                                    onChange={handleChange}
                                                    value={"No"} />
                                                <label className='formulario__label'>No</label>
                                            </div>
                                        </div>

                                        <div className='observ-form'>
                                            <p><i className="fa-solid fa-tv"></i>TV</p>
                                            <div className='selectors-radio'>
                                                <input type="radio"
                                                    name='tv'
                                                    onChange={handleChange}
                                                    value={"Si"} />
                                                <label className='formulario__label'>Si</label>
                                            </div>

                                            <div className='selectors-radio'>
                                                <input type="radio"
                                                    name='tv'
                                                    onChange={handleChange}
                                                    value={"No"} />
                                                <label className='formulario__label'>No</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='lines-form'>
                                        <div className='observ-form'>
                                            <p><i className="fa-solid fa-bath"></i>Baño</p>
                                            <div className='selectors-radio'>
                                                <input
                                                    type="radio"
                                                    name='banio'
                                                    onChange={handleChange}
                                                    value={"Si"} />
                                                <label className='formulario__label'>Si</label>
                                            </div>

                                            <div className='selectors-radio'>
                                                <input
                                                    type="radio"
                                                    name='banio'
                                                    onChange={handleChange}
                                                    value={"No"} />
                                                <label className='formulario__label'>No</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className='btn-form-hab'>
                        <button className='crear-form' type='submit'>CREAR HABITACIÓN</button>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    )
}

export default FormHab