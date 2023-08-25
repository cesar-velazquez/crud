import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { EMPTY_FORM_VALUES } from '../shared/constants';

const ModalForm = ({
    isShowModal,
    imageBase64,
    createUser,
    isUserUpdate,
    UpdateUser,
    setIsShowModal,
    setIsUserUpdate,
    handleImageChange,

}) => {

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm();


    const submit = (data) => {
        data.image_url = imageBase64;

        if (isUserUpdate) {
            UpdateUser(data, reset)
        } else {
            createUser(data, reset)
        }
    }

    //función para que cierre el modal 
    const handleClickCloseModal = () => {
        setIsShowModal(false);
        reset(EMPTY_FORM_VALUES);
        setIsUserUpdate(null);

        // Eliminar la imagen de localStorage
        localStorage.removeItem('image_url');
    };

    useEffect(() => {
        if (isUserUpdate) {
            reset(isUserUpdate)
        }
    }, [isUserUpdate])

    return (
        <section className={`fixed bg-purple-400/60 dark:bg-black/60 left-0 right-0 top-0 bottom-0 flex justify-center items-center transition-[opacity_transform] duration-500 ${isShowModal ? "visible opacity-100 scale-100" : "invisible opacity-0 scale-0"} `}>
            <form onSubmit={handleSubmit(submit)}
                className='bg-purple-400 grid gap-2 p-4 relative m-3 sm:w-[350px] dark:bg-black dark:text-white dark:transition-colors duration-1000 dark:duration-1000 border-[1px] '>
                <button onClick={handleClickCloseModal} type="button" className='text-black font-extrabold bg-white absolute right-3 top-2 p-1  flex justify-center rounded-full'>X</button>
                <h2 className='text-black dark:text-white font-bold text-center'>{isUserUpdate ? "Editar Usuario" : "Nuevo Usuario"}</h2>
                <div className='grid' >
                    <label className='py-1' htmlFor="first_name">Nombre</label>
                    <input className='text-center outline-none border-2 border-slate-400/20 dark:bg-[#222838]' id='first_name' type="text" placeholder='Escribe tu nombre...'
                        {...register("first_name", {
                            required: {
                                value: true,
                                message: "Este campo es requerido"
                            },
                            maxLength: {
                                value: 15,
                                message: "Longitud excedida (máximo 15 caracteres)"
                            },
                            minLength: {
                                value: 3,
                                message: "Es demasiado corto el nombre"
                            }
                        })}
                    />
                    {errors.first_name && <p className='text-red-500'>{errors.first_name.message}</p>}
                </div>
                <div className='grid'>
                    <label className='py-1' htmlFor="last_name">Apellidos</label>
                    <input
                        className='text-center outline-none border-2 border-slate-400/20 bg-[#e7e9ee] dark:bg-[#222838]'
                        placeholder='Escribe tu apellido...'
                        id='last_name'
                        type="text"
                        {...register("last_name", {
                            required: {
                                value: true,
                                message: "Este campo es requerido"
                            },
                            maxLength: {
                                value: 30,
                                message: "Longitud excedida (máximo 15 caracteres)"
                            },
                            minLength: {
                                value: 5,
                                message: "Es demasiado corto el apellido"
                            },
                            pattern: {
                                value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g,
                                message: "Escriba solo letras"
                            }
                        })} />
                    {errors.last_name && <p className='text-red-500'>{errors.last_name.message}</p>}
                </div>
                <div className='grid'>
                    <label
                        className='py-1'
                        htmlFor="email">Correo</label>
                    <input
                        className='text-center outline-none border-2 border-slate-400/20 bg-[#e7e9ee] dark:bg-[#222838]'
                        placeholder='Escribe tu correo...'
                        id='email' type="email"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Este campo es requerido"
                            },
                            pattern: {
                                value: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
                                message: "esriba un email valido"
                            }
                        })} />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                <div className='grid'>
                    <label
                        className='py-1'
                        htmlFor="password">Contraseña</label>
                    <input
                        className='text-center outline-none border-2 border-slate-400/20 bg-[#e7e9ee] dark:bg-[#222838]'
                        placeholder='Escribe tu contraseña...'
                        id='password' type="password"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Este campo es requerido"
                            },
                            pattern: {
                                value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                                message: "esriba una contraseña fuerte"
                            }
                        })} />
                    {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                </div>
                <div className='grid'>
                    <label
                        className='py-1'
                        htmlFor="birthday">Cumpleaños</label>
                    <input
                        className='text-center outline-none border-2 border-slate-400/20 bg-[#e7e9ee] dark:bg-[#222838]'
                        id='birthday' type="date"
                        {...register("birthday", {
                            required: {
                                value: true,
                                message: "Este campo es requerido"
                            },
                        })} />
                    {errors.birthday && <p className='text-red-500'>{errors.birthday.message}</p>}
                </div>

                {/* inicio foto */}
                <div className='grid'>
                    <label className='py-1' htmlFor="image_url">Foto</label>
                    <input
                        className='text-center outline-none border-2 border-slate-400/20 bg-[#e7e9ee] dark:bg-[#222838]'
                        id='image_url'
                        type="file"
                        onChange={handleImageChange}
                    />
                    {imageBase64 && (
                        <img src={imageBase64} alt="Preview" className="flex m-auto mt-2 w-[150px] max-h-40" />
                    )}
                </div>

                {/* fin foto */}
                <button className='dark:transition-colors duration-1000 dark:duration-1000 font-bold bg-black text-white p-2 hover:bg-white hover:text-black'>{isUserUpdate ? "Guardar Cambios" : "Agregar nuevo usuario"}</button>
            </form>
        </section>
    )
}

export default ModalForm
