import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../assets/css/DashboardAdmin.css';
import AdminNavBar from '../components/Dashboards/Admin_NavBar';
import photoAdmin from '../assets/img/perfilADMIN.png';
import { api } from '../utils/peticiones';

function Dashboard() {
  const [habitaciones, setHabitaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncError, setSyncError] = useState(false);

  useEffect(() => {
    let mounted = true;

    axios.get(api)
      .then((response) => {
        if (!mounted) return;
        setHabitaciones(Array.isArray(response.data) ? response.data : []);
        setSyncError(false);
      })
      .catch(() => {
        if (!mounted) return;
        setSyncError(true);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

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
              <span>Sesión activa</span>
              <strong>Administrador Hotelia</strong>
              <small>Acceso a gestión de habitaciones</small>
            </div>
            <span className='admin-profile-card__status'>En línea</span>
          </div>
        </section>

        {syncError && (
          <div className='admin-sync-alert' role='status'>
            <i className='fa-solid fa-triangle-exclamation' aria-hidden='true'></i>
            <div>
              <strong>No fue posible sincronizar el inventario.</strong>
              <span>El panel sigue disponible, pero las métricas dependen del API histórico de Hotelia.</span>
            </div>
          </div>
        )}

        <section className='admin-stats' aria-label='Resumen de habitaciones'>
          <article className='admin-stat-card'>
            <span className='admin-stat-card__icon'><i className='fa-solid fa-hotel' aria-hidden='true'></i></span>
            <div>
              <span>Total</span>
              <strong>{loading ? '—' : stats.total}</strong>
              <small>Habitaciones registradas</small>
            </div>
          </article>
          <article className='admin-stat-card'>
            <span className='admin-stat-card__icon is-success'><i className='fa-solid fa-circle-check' aria-hidden='true'></i></span>
            <div>
              <span>Disponibles</span>
              <strong>{loading ? '—' : stats.available}</strong>
              <small>Listas para reservar</small>
            </div>
          </article>
          <article className='admin-stat-card'>
            <span className='admin-stat-card__icon is-neutral'><i className='fa-solid fa-ban' aria-hidden='true'></i></span>
            <div>
              <span>No disponibles</span>
              <strong>{loading ? '—' : stats.unavailable}</strong>
              <small>Fuera de disponibilidad</small>
            </div>
          </article>
          <article className='admin-stat-card'>
            <span className='admin-stat-card__icon is-warning'><i className='fa-solid fa-screwdriver-wrench' aria-hidden='true'></i></span>
            <div>
              <span>Mantenimiento</span>
              <strong>{loading ? '—' : stats.maintenance}</strong>
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
