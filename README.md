# HoteliaHL

HoteliaHL es una aplicación web de hotelería construida con React. Incluye una experiencia pública para descubrir el hotel y sus habitaciones, un flujo de inicio de sesión, una cuenta de huésped demo y un panel administrativo para gestionar habitaciones.

## ✨ Actualización de experiencia

La interfaz fue revisada sobre el proyecto existente —sin reconstruirlo desde cero— aplicando criterios de interacción inspirados en `apple-design` y una revisión completa de consistencia visual, movimiento, accesibilidad y responsive.

Principales mejoras:

- jerarquía visual y navegación responsive más claras;
- feedback inmediato al presionar botones y controles;
- animaciones cortas, reversibles y respetuosas de `prefers-reduced-motion`;
- carruseles utilizables con mouse, touch y swipe;
- tarjetas de habitaciones sin dependencia de `hover` para revelar información;
- formulario de búsqueda adaptado a móvil;
- mapa interactivo embebido en la Home;
- login con accesos demo para administrador y huésped;
- panel de huésped con reservaciones e información personal;
- dashboard administrativo y CRUD de habitaciones con el mismo sistema visual de la Home;
- estilos globales con tokens para color, radio, sombra, tipografía y movimiento;
- mejoras de semántica, foco visible y etiquetas ARIA.

## 🛏️ CRUD demo autosuficiente

El antiguo API de Hotelia ya no es necesario para la demostración del portafolio. El inventario de habitaciones funciona localmente en el navegador:

- crear habitaciones;
- editar habitaciones;
- eliminar habitaciones;
- restaurar los datos originales de la demo;
- conservar cambios mediante `localStorage` cuando está disponible;
- continuar funcionando con respaldo en memoria si el almacenamiento del navegador falla.

La Home y el panel administrativo consumen la misma fuente de datos demo, evitando que una caída de un servicio externo deje el proyecto inutilizable.

## 🧰 Stack

- React 18
- React Router 6
- Formik
- React Slick
- SweetAlert2
- CSS responsive
- localStorage para la persistencia de la demo

## 🚀 Scripts

```bash
npm install
npm start
```

Para generar una build de producción:

```bash
npm run build
```

## 📁 Estructura principal

```text
src/
├── Admin/              # CRUD y vistas administrativas
├── assets/             # CSS e imágenes
├── components/         # Header, footer, home y dashboards
├── pages/              # Inicio, login y cuenta de huésped
├── routes/             # Rutas de la aplicación
└── utils/              # Datos y persistencia de la demo
```

## ⚠️ Estado del proyecto

Este repositorio nació como un proyecto académico y actualmente está preparado como demostración funcional para portafolio. El CRUD se ejecuta del lado del cliente y sus datos no representan información real de un hotel.

El inicio de sesión es igualmente un mecanismo de demostración implementado en frontend. **No debe considerarse autenticación segura para producción.** Para convertir Hotelia en un producto real, autenticación, autorización, reservaciones e inventario deberían moverse a un backend y una base de datos persistente.

## 🎨 Criterio de diseño

La actualización prioriza comportamiento y consistencia antes que copiar una estética específica: controles que responden al toque, movimiento con tiempos cortos, colores con significado estable, superficies legibles y layouts que se adaptan sin saltos entre desktop y móvil.

## 🌐 Despliegue

La versión pública del portafolio se publica mediante Vercel desde la rama `main`.
