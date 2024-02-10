import React from 'react'
import Layout from '../../components/Layout'
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { authLogin } from "../../redux/features/authSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowAltCircleRight, FaAt, FaLock } from "react-icons/fa";

const Login = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (formData) => {
        // console.log(formData);
        const { username, password } = formData;

        if (username && password) {
            dispatch(authLogin({ formData, toast, navigate }));
        }
        else {
            toast.error("Username or Password empty");
        }
    };

    return (
        <Layout>
            <div className="flex min-h-full items-center flex-col justify-center px-6 py-12 lg:px-8">
                <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">
                    <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
                    Bienvenido de nuevo
                    </div>
                    <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
                    Ingrese sus credenciales para acceder a su cuenta
                    </div>

                    <div className="mt-10">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col mb-5">
                                <label
                                className="mb-1 text-xs tracking-wide text-gray-600"
                                >
                                Dirección de correo electrónico:
                                </label>
                                <div className="relative">
                                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                    <FaAt className="text-brightRed" />
                                </div>

                                <input
                                    type="email"
                                    name="username"
                                    {...register("username")}
                                    className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                                    placeholder="Enter your email"
                                />
                                </div>
                            </div>
                            <div className="flex flex-col mb-5">
                                <label
                                className="mb-1 text-xs tracking-wide text-gray-600"
                                >
                                Contraseña:
                                </label>
                                <div className="relative">
                                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                    <FaLock className="text-brightRed" />
                                </div>

                                <input
                                    type="password"
                                    name="password"
                                    {...register("password")}
                                    className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                                    placeholder="Enter your password"
                                />
                                </div>
                            </div>

                            <div className="flex w-full">
                                <button
                                type="submit"
                                className="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-brightRed hover:bg-brightRedLight
                                    rounded-2xl py-2 w-full transition duration-150 ease-in"
                                >
                                <span className="mr-2 uppercase">Iniciar sesión</span>
                                <span>
                                    <FaArrowAltCircleRight />
                                </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="flex justify-center items-center mt-6">
                    <div className="inline-flex items-center text-gray-200 font-medium text-xs text-center">
                        <span className="ml-2">
                            Has olvidado tu contraseña?
                            <Link to="/changepass" className="text-xs ml-2 text-brightRedLight font-semibold">
                            Cambia ahora
                            </Link>
                        </span>
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default Login