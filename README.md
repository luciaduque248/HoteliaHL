# HoteliaHL

HoteliaHL es una aplicación web de hotelería construida con React. Incluye una experiencia pública para descubrir el hotel y sus habitaciones, un flujo de inicio de sesión y vistas administrativas para gestionar habitaciones.

## ✨ Actualización de experiencia

La interfaz fue revisada sobre el proyecto existente —sin reconstruirlo desde cero— aplicando criterios de interacción inspirados en `apple-design` y las skills de revisión de animación descritas en la guía de diseño utilizada para este proyecto.

Principales mejoras:

- jerarquía visual y navegación responsive más claras;
- feedback inmediato al presionar botones y controles;
- animaciones cortas, reversibles y respetuosas de `prefers-reduced-motion`;
- carruseles utilizables con mouse, touch y swipe;
- tarjetas de habitaciones sin dependencia de `hover` para revelar información;
- estados de carga y fallback visual si el API histórico no responde;
- formulario de búsqueda adaptado a móvil;
- login con validación sin efectos secundarios, botón para mostrar contraseña y estados de error accesibles;
- estilos globales con tokens para color, radio, sombra, tipografía y movimiento;
- mejoras de semántica, foco visible y etiquetas ARIA.

## 🧰 Stack

- React 18
- React Router 6
- Axios
- Formik
- React Slick
- SweetAlert2
- CSS responsive

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
├── pages/              # Inicio y login
├── routes/             # Rutas de la aplicación
└── utils/              # Configuración del API
```

## ⚠️ Estado del proyecto

Este repositorio nació como un proyecto académico y conserva una integración con un API histórico alojado en Heroku. La home incluye contenido de respaldo para que la experiencia visual no quede vacía si ese servicio no está disponible.

El inicio de sesión actual sigue siendo un mecanismo de demostración implementado en frontend. **No debe considerarse autenticación segura para producción.** Para publicar el proyecto como producto real, el siguiente paso es mover autenticación y autorización a un backend o proveedor de identidad y proteger las rutas administrativas.

## 🎨 Criterio de diseño

La actualización prioriza comportamiento y consistencia antes que copiar una estética específica: controles que responden al toque, movimiento con tiempos cortos, colores con significado estable, superficies legibles y layouts que se adaptan sin saltos entre desktop y móvil.
