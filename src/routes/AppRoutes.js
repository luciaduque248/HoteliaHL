import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EditModal from '../Admin/EditModal'

import FormHab from '../Admin/FormHab'
import ListHabs from '../Admin/ListHabs'
import Inicio from '../pages/Inicio'
import Login from '../pages/Login'

function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Inicio/>} ></Route>


            <Route path='/Hotelia/list-habitaciones' element={<ListHabs/>} ></Route>
            <Route path='/Hotelia/form-habitaciones' element={<FormHab/>} ></Route>
            <Route path='/Hotelia/login' element={<Login/>} ></Route>

        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes