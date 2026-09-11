import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import '../assets/css/DashboardAdmin.css';
import '../assets/css/AdminDemoPolish.css';
import AdminNavBar from '../components/Dashboards/Admin_NavBar';
import photoAdmin from '../assets/img/perfilADMIN.png';
import { getRooms } from '../utils/demoHotelia';

function Dashboard() {
  const habitaciones = getRooms();

  const stats = useMemo(() => {
    const normalize = (value) => String(value || '').trim().toLowerCase();
    const available = habitaciones.filter((room) => normalize(room.estado) === 'disponible').length;
    const maintenance = habitaciones.filter((room) => normalize(room.estado).includes('mantenimiento')).length;
    const unavailable = Math.max(habitaciones.length - available - maintenance, 0);

    return {
      total: habitaciones.length,
      available,
      unavailable,
      maintenance,
    };
  }, [habitaciones]);

  return (
    <div className='admin-page'>
      <AdminNavBar />

      <main className='admin-dashboard'>
        <section className='admin-dashboard__hero'>
          <div>
            <span className='admin-eyebrow'>Panel administrativo</span>
            <h1>Controla Hotelia desde un solo lugar.</h1>
            <p>Consulta el estado de las habitaciones, crea nuevos espacios y mantén la información del hotel actualizada.</p>
            <div className='admin-dashboard__actions'>
              <Link to='/form-habitaciones' className='admin-primary-action'>
                <i className='fa-solid fa-plus' aria-hidden='true'></i>
                Nueva habitación
              </Link>
              <Link to='/list-habitaciones' className='admin-secondary-action'>
                Ver habitaciones
                <i className='fa-solid fa-arrow-right' aria-hidden='true'></i>
              </Link>
            </div>
          </div>

          <div className='admin-profile-card'>
            <img src={photoAdmin} alt='' aria-hidden='true' />
            <div>
              <span>Sesión demo activa</span>
              <strong>Administrador Hotelia</strong>
              <small>Acceso a gestión completa de habitaciones</small>
            </div>
            <span className='admin-profile-card__status'>En línea</span>
          </div>
        </section>

        <div className='admin-demo-banner' role='status'>
          <i className='fa-solid fa-database' aria-hidden='true'></i>
          <div>
            <strong>Inventario demo disponible</strong>
            <span>El panel ya no depende del API histórico. Los cambios del CRUD se guardan localmente en este navegador.</span>
          </div>
        </div>

        <section className='admin-stats' aria-label='Resumen de habitaciones'>
          <article className='admin-stat-card'>
            <span className='admin-stat-card__icon'><i className='fa-solid fa-hotel' aria-hidden='true'></i></span>
            <div>
              <span>Total</span>
              <strong>{stats.total}</strong>
              <small>Habitaciones registradas</small>
            </div>
          </article>
          <article className='admin-stat-card'>
            <span className='admin-stat-card__icon is-success'><i className='fa-solid fa-circle-check' aria-hidden='true'></i></span>
            <div>
              <span>Disponibles</span>
              <strong>{stats.available}</strong>
              <small>Listas para reservar</small>
            </div>
          </article>
          <article className='admin-stat-card'>
            <span className='admin-stat-card__icon is-neutral'><i className='fa-solid fa-ban' aria-hidden='true'></i></span>
            <div>
              <span>No disponibles</span>
              <strong>{stats.unavailable}</strong>
              <small>Fuera de disponibilidad</small>
            </div>
          </article>
          <article className='admin-stat-card'>
            <span className='admin-stat-card__icon is-warning'><i className='fa-solid fa-screwdriver-wrench' aria-hidden='true'></i></span>
            <div>
              <span>Mantenimiento</span>
              <strong>{stats.maintenance}</strong>
              <small>Requieren revisión</small>
            </div>
          </article>
        </section>

        <section className='admin-dashboard__grid'>
          <article className='admin-management-card'>
            <div className='admin-management-card__icon'>
              <i className='fa-solid fa-bed' aria-hidden='true'></i>
            </div>
            <div>
              <span className='admin-eyebrow'>Inventario</span>
              <h2>Gestionar habitaciones</h2>
              <p>Busca, revisa, edita o elimina habitaciones desde una vista organizada y responsive.</p>
            </div>
            <Link to='/list-habitaciones'>Abrir inventario <i className='fa-solid fa-arrow-right' aria-hidden='true'></i></Link>
          </article>

          <article className='admin-management-card'>
            <div className='admin-management-card__icon'>
              <i className='fa-solid fa-circle-plus' aria-hidden='true'></i>
            </div>
            <div>
              <span className='admin-eyebrow'>Alta de habitación</span>
              <h2>Crear nueva habitación</h2>
              <p>Registra capacidad, precio, estado, fotografía y servicios incluidos en una sola pantalla.</p>
            </div>
            <Link to='/form-habitaciones'>Crear habitación <i className='fa-solid fa-arrow-right' aria-hidden='true'></i></Link>
          </article>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
