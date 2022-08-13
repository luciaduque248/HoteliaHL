import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { api } from '../utils/peticiones';
import Nevera from '../assets/img/iconos/nevera.png'
import Footer from '../components/Footer/Footer';
import ModalEdit from '../Admin/Modal'

import '../assets/css/ListHabs.css';
import EditModal from './EditModal';


function ListHabs() {
    const [habitaciones, setHabitaciones] = useState([]);
    const [habitacion, setHabitacion] = useState({})
    const [modal, setModal] = useState(false);
    
    const [busqueda, setBusqueda] = useState("")

    const peticionGet = async () => {
        await axios.get(api)
            .then(response => {
                console.log(response.data)
                setHabitacion(response.data);
                setHabitaciones(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        if(!modal){
            peticionGet();
        }
    }, [modal])

    const handleChange = e => {
        // console.log(e.target.value)
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    }

    const filtrar=()=>{
        let resultadosBusqueda = habitaciones.filter((habitacion)=> habitacion._id.toString().toLowerCase().includes(busqueda.toLowerCase())
          || habitacion.nombrehab.toString().toLowerCase().includes(busqueda.toLowerCase())
          );
        return resultadosBusqueda
      }

    useEffect(() => {
        if (!modal)
            axios(api).then(res => {
                console.log(res)
                setHabitaciones(res.data)
            })

    }, [modal])

    // useEffect(() => {
    //     filtrar(busqueda)
    // }, [busqueda])

    // const handleSelect = async(room, selectedStatus) =>{
    //     const response = await axios.put(`${api}${room._id}`, {...room, estado: selectedStatus});

    // }

    return (
        <div>
            <div className='nav-bar-list'>Header</div>

            <div className='container-list-habs'>
                <h1>HABITACIONES</h1>

                <div className='busqueda-rooms'>
                    <input className='inputBuscar' placeholder={'Que habitación desea buscar?'} onChange={(e)=>setBusqueda(e.target.value)} />
                    {/* <button><i className="fa-solid fa-magnifying-glass"></i></button> */}
                </div>

                <div className='cards-list-habitaciones'>
                    {habitaciones &&
                        filtrar().map(habitacion => (
                            <div className='list-cards-vertical' key={habitacion._id}>
                                <div className='info-image-card'>
                                    <div className='cards-horizontal' key={habitacion._id}>
                                        <div className='description-room'>
                                            <div className='info-list'>
                                                <h1 >{habitacion.nombrehab}</h1>
                                                <p >{habitacion.descripcion}</p>

                                                <div className='price-list'>
                                                    <h1>PRECIO</h1>
                                                    <p>{habitacion.valornoche} COP / NOCHE</p>
                                                </div>
                                            </div>

                                            <div className='details'>
                                                <div className="lines">
                                                    <div className='each-thing'>
                                                        <i className="fa-solid fa-bed"></i>
                                                        <p>{habitacion.camas} cama(s)</p>
                                                    </div>
                                                    <div className='each-thing'>
                                                        <i className="fa-solid fa-vault"></i>
                                                        <p>{habitacion.cajafuerte === 'si' ? "Si" : "No"}</p>
                                                    </div>
                                                </div>

                                                <div className="lines rs-320px">
                                                    <div className='each-thing'>
                                                        <i className="fa-solid fa-tv"></i>
                                                        <p>{habitacion.tv === 'si' ? "Si" : "No"}</p>
                                                    </div>
                                                    <div className='each-thing'>
                                                        <i className="fa-solid fa-wifi"></i>
                                                        <p>{habitacion.wifi === 'si' ? "Si" : "No"}</p>
                                                    </div>
                                                </div>

                                                <div className="lines rs-320px">
                                                    <div className='each-thing'>
                                                        <img src={Nevera} alt='nevera' />
                                                        <p>{habitacion.nevera === 'si' ? "Si" : "No"}</p>
                                                    </div>
                                                    <div className='each-thing'>
                                                        <i className="fa-solid fa-bath"></i>
                                                        <p>{habitacion.banio === 'si' ? "Si" : "No"}</p>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => {
                                                        setModal(true)
                                                        setHabitacion(habitacion)
                                                        console.log(habitacion)
                                                    }}
                                                    className="edit-rooms">EDITAR
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='image-room'>
                                        <img src={`https://hoteliakuepa.herokuapp.com${habitacion.img}`} className="img-rooms" alt="fotos"/>
                                        {/* <img src={Habitacion} alt='foto' /> */}
                                    </div>
                                </div>

                            </div>
                        )
                        )
                    }
                </div>
                {
                    modal ? <EditModal close={setModal} habitacion={habitacion} /> : null
                }
            </div>

            <Footer />
        </div>
    )
}

export default ListHabs