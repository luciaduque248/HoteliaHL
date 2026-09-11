import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import FormHab from '../Admin/FormHab';
import ListHabs from '../Admin/ListHabs';
import Inicio from '../pages/Inicio';
import Login from '../pages/Login';
import Perfil from '../Admin/Dashboard';
import UserDashboard from '../pages/UserDashboard';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/login' element={<Login />} />
        <Route path='/mi-cuenta' element={<UserDashboard />} />
        <Route path='/perfil' element={<Perfil />} />
        <Route path='/list-habitaciones' element={<ListHabs />} />
        <Route path='/form-habitaciones' element={<FormHab />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
