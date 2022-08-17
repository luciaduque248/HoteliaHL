import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EditModal from '../Admin/EditModal'

import FormHab from '../Admin/FormHab'
import ListHabs from '../Admin/ListHabs'
import Inicio from '../pages/Inicio'
import Login from '../pages/Login'
import Perfil from '../Admin/Dashboard'

function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Inicio/>} ></Route>

            <Route path='/list-habitaciones' element={<ListHabs/>} ></Route>
            <Route path='/form-habitaciones' element={<FormHab/>} ></Route>
            <Route path='/login' element={<Login/>} ></Route>
            <Route path='/perfil' element={<Perfil/>} ></Route>

        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes