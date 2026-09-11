import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import Swal from 'sweetalert2';

import Logo from '../assets/img/logo-login.png';
import '../assets/css/Login.css';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const validate = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = 'Ingresa tu correo electrónico.';
        } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
            errors.email = 'Ingresa un correo electrónico válido.';
        }

        if (!values.contraseña) {
            errors.contraseña = 'Ingresa tu contraseña.';
        } else if (!/^.{8,12}$/.test(values.contraseña)) {
            errors.contraseña = 'La contraseña debe tener entre 8 y 12 caracteres.';
        }

        return errors;
    };

    const handleLogin = async (values, { setSubmitting }) => {
        const isAdmin = values.email === 'admin@hotelia.com' && values.contraseña === 'adminhl12';
        const isGuest = values.email === 'jfajardo@hotelia.com' && values.contraseña === 'userhl12';

        if (isAdmin) {
            navigate('/list-habitaciones');
            return;
        }

        if (isGuest) {
            navigate('/');
            return;
        }

        setSubmitting(false);
        await Swal.fire({
            icon: 'error',
            title: 'No pudimos iniciar sesión',
            text: 'Revisa tu correo y contraseña e inténtalo nuevamente.',
            confirmButtonColor: '#0f6f79',
        });
    };

    return (
        <main className='bg-login'>
            <div className='login-backdrop' aria-hidden='true'></div>

            <Link to='/' className='volver-login' aria-label='Volver al inicio'>
                <i className='fa-solid fa-arrow-left' aria-hidden='true'></i>
                <span>Volver</span>
            </Link>

            <section className='login-card' aria-labelledby='login-title'>
                <div className='login-brand'>
                    <img src={Logo} alt='Hotelia' />
                </div>

                <div className='login-heading'>
                    <span>Bienvenido de nuevo</span>
                    <h1 id='login-title'>Inicia sesión</h1>
                    <p>Accede para continuar con tu reserva o administrar Hotelia.</p>
                </div>

                <Formik
                    initialValues={{ email: '', contraseña: '' }}
                    validate={validate}
                    onSubmit={handleLogin}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        isSubmitting,
                        setValues,
                        setTouched,
                        setErrors,
                    }) => {
                        const fillDemoCredentials = (email, contraseña) => {
                            setValues({ email, contraseña });
                            setTouched({});
                            setErrors({});
                        };

                        return (
                            <form className='formulario-login' onSubmit={handleSubmit} noValidate>
                                <div className='demo-access' aria-label='Accesos de demostración'>
                                    <div className='demo-access-heading'>
                                        <span>Explora el proyecto</span>
                                        <p>Completa las credenciales con un solo clic.</p>
                                    </div>

                                    <div className='demo-access-actions'>
                                        <button
                                            type='button'
                                            className='demo-access-button demo-access-button--admin'
                                            onClick={() => fillDemoCredentials('admin@hotelia.com', 'adminhl12')}
                                        >
                                            <span className='demo-access-icon' aria-hidden='true'>
                                                <i className='fa-solid fa-user-shield'></i>
                                            </span>
                                            <span className='demo-access-copy'>
                                                <strong>Entrar como administrador demo</strong>
                                                <small>Dashboard y gestión de habitaciones</small>
                                            </span>
                                        </button>

                                        <button
                                            type='button'
                                            className='demo-access-button'
                                            onClick={() => fillDemoCredentials('jfajardo@hotelia.com', 'userhl12')}
                                        >
                                            <span className='demo-access-icon' aria-hidden='true'>
                                                <i className='fa-solid fa-user'></i>
                                            </span>
                                            <span className='demo-access-copy'>
                                                <strong>Entrar como usuario demo</strong>
                                                <small>Experiencia pública de Hotelia</small>
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                <div className='login-divider' aria-hidden='true'>
                                    <span>o ingresa manualmente</span>
                                </div>

                                <div className='form-login-group'>
                                    <label htmlFor='email'>Correo electrónico</label>
                                    <div className={`login-input-shell ${touched.email && errors.email ? 'has-error' : ''}`}>
                                        <i className='fa-regular fa-envelope' aria-hidden='true'></i>
                                        <input
                                            type='email'
                                            id='email'
                                            name='email'
                                            placeholder='nombre@correo.com'
                                            autoComplete='email'
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            aria-invalid={Boolean(touched.email && errors.email)}
                                            aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                                        />
                                    </div>
                                    {touched.email && errors.email && <div id='email-error' className='error'>{errors.email}</div>}
                                </div>

                                <div className='form-login-group'>
                                    <div className='password-label-row'>
                                        <label htmlFor='contraseña'>Contraseña</label>
                                    </div>
                                    <div className={`login-input-shell ${touched.contraseña && errors.contraseña ? 'has-error' : ''}`}>
                                        <i className='fa-solid fa-lock' aria-hidden='true'></i>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id='contraseña'
                                            name='contraseña'
                                            placeholder='Tu contraseña'
                                            autoComplete='current-password'
                                            value={values.contraseña}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            aria-invalid={Boolean(touched.contraseña && errors.contraseña)}
                                            aria-describedby={touched.contraseña && errors.contraseña ? 'password-error' : undefined}
                                        />
                                        <button
                                            type='button'
                                            className='password-toggle'
                                            onClick={() => setShowPassword((visible) => !visible)}
                                            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                            aria-pressed={showPassword}
                                        >
                                            <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden='true'></i>
                                        </button>
                                    </div>
                                    {touched.contraseña && errors.contraseña && <div id='password-error' className='error'>{errors.contraseña}</div>}
                                </div>

                                <button className='login-submit' type='submit' disabled={isSubmitting}>
                                    {isSubmitting ? 'Ingresando…' : 'Iniciar sesión'}
                                    {!isSubmitting && <i className='fa-solid fa-arrow-right' aria-hidden='true'></i>}
                                </button>
                            </form>
                        );
                    }}
                </Formik>

                <p className='login-note'>
                    ¿Necesitas ayuda con tu reserva? <a href='mailto:reservas@hotelia.com'>Escríbenos</a>.
                </p>
            </section>
        </main>
    );
};

export default Login;
