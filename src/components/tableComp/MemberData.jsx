import React, { useState } from 'react'
import { Modal } from 'antd';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import API from '../../redux/api';

const MemberData = ({memData}) => {
    const [isModalOpen3, setIsModalOpen3] = useState(false);
    const showModal3 = () => {
        setIsModalOpen3(true);

        setValue3("name", memData?.UserData?.name)
        setValue3("gender", memData?.MembershipData?.gender)
        setValue3("height", memData?.MembershipData?.height)
        setValue3("weight", memData?.MembershipData?.weight)
        setValue3("age", memData?.MembershipData?.age)
        setValue3("calories", memData?.MembershipData?.calories)
        setValue3("factor", memData?.MembershipData?.factor)
        setValue3("not_sure", memData?.MembershipData?.not_sure)
        setValue3("objective", memData?.MembershipData?.MembershipData?.objective)
        setValue3("email", memData?.UserData?.email)
        setValue3("phone", memData?.UserData?.phone)
        setValue3("comment", memData?.MembershipData?.comment)
    };
    const handleOk3 = () => setIsModalOpen3(false);
    const handleCancel3 = () => setIsModalOpen3(false);



    // Form 3
    const { register: register3, handleSubmit: handleSubmit3, setValue: setValue3 } = useForm();
    const onSubmit3 = (formData) => {
        // console.log('data:', formData);
        API.put(`/api/auth/me/${memData?.id}/`)
        .then(res => {
        //   console.log(res.data)
          handleCancel3()
        })
        .catch(err => {
          console.log(err.request.response);
        });
    };

  return (
    <React.Fragment>
        <Modal 
            title="Datos del Asesorado" open={isModalOpen3} onOk={handleOk3} onCancel={handleCancel3}  
            footer={[
                // <button key="ok" onClick={handleCancel} className="mx-1 rounded-lg px-10 font-medium text-white py-2.5 whitespace-nowrap bg-green-500">Enviar</button>,
                // <button key="cancel" onClick={handleOk} className="mx-1 rounded-lg px-10 font-medium text-white py-2.5 whitespace-nowrap bg-red-500">Cancelar</button>
            ]}
        >
            <div className="border-b border-gray-900/10 pb-12">
                <form className="space-y-6" onSubmit={handleSubmit3(onSubmit3)}>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="sm:col-span-4">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Nombre
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    required
                                    name="name"
                                    {...register3("name")}
                                    placeholder='Ingrese el nombre del asesorado'
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:italic placeholder:text-slate-400 placeholder:px-2 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                                Sexo
                            </label>
                            <div className="mt-2">
                                <select
                                    name="gender"
                                    {...register3("gender")}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option>Seleccione el Sexo</option>
                                    <option value='male'>Hombre</option>
                                    <option value='female'>Mujer</option>
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                            <label htmlFor="height" className="block text-sm font-medium leading-6 text-gray-900">
                                Estatura
                            </label>
                            <div className="mt-2">
                                <input
                                type="number"
                                required
                                name="height"
                                {...register3("height")}
                                placeholder='Ingrese la estatura'
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:italic placeholder:text-slate-400 placeholder:px-2 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="weight" className="block text-sm font-medium leading-6 text-gray-900">
                                Peso Actual
                            </label>
                            <div className="mt-2">
                                <input
                                type="number"
                                required
                                name="weight"
                                {...register3("weight")}
                                placeholder='Ingrese el peso actual'
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:italic placeholder:text-slate-400 placeholder:px-2 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">
                                Edad
                            </label>
                            <div className="mt-2">
                                <input
                                type="number"
                                required
                                name="age"
                                {...register3("age")}
                                placeholder='Ingrese la edad'
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:italic placeholder:text-slate-400 placeholder:px-2 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="calories" className="block text-sm font-medium leading-6 text-gray-900">
                                Calorías Actuales
                            </label>
                            <div className="mt-2">
                                <input
                                type="number"
                                required
                                name="calories"
                                {...register3("calories")}
                                placeholder='Ingrese las caloría actuales'
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:italic placeholder:text-slate-400 placeholder:px-2 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="factor" className="block text-sm font-medium leading-6 text-gray-900">
                                Factor Actividad
                            </label>
                            <div className="mt-2">
                                <select
                                    name="factor"
                                    {...register3("factor")}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option value=""></option>
                                    <option value="1.2">1.2  = Sedentario</option>
                                    <option value="1.375">1.375 = Ligeramente Activa</option>
                                    <option value="1.55">1.55 = Moderadamente Activa</option>
                                    <option value="1.725">1.725 = Muy Activo</option>
                                    <option value="1.9">1.9 = Súper activo</option>
                                </select>

                            </div>
                        </div>

                        <div className="flex items-center gap-x-3 sm:col-span-2">
                            <input
                                name="not_sure"
                                {...register3("not_sure")}
                                type="checkbox"
                                className="h-4 w-4 border-gray-300 text-amber-600 focus:ring-amber-600"
                            />
                            <label htmlFor="No-sabe" className="block text-sm font-medium leading-6 text-gray-900">
                                No sabe
                            </label>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="objective" className="block text-sm font-medium leading-6 text-gray-900">
                                Objetivo
                            </label>
                            <div className="mt-2">
                                <select
                                    name="objective"
                                    {...register3("objective")}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option value="">Seleccione el Objetivo</option>
                                    <option value="increase_mass">Aumento de masa muscular</option>
                                    <option value="fat_percent_reduction">Reduccion de porcentajes de grasa</option>
                                    <option value="maintenance">Mantenimiento</option>
                                    <option value="definition">Definición</option>
                                </select>

                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                type="email"
                                required
                                name="email"
                                {...register3("email")}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:italic placeholder:text-slate-400 placeholder:px-2 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                phone
                            </label>
                            <div className="mt-2">
                                <input
                                type="number"
                                required
                                name="phone"
                                {...register3("phone")}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:italic placeholder:text-slate-400 placeholder:px-2 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900">
                                Comentarios Adicionales
                            </label>
                            <div className="mt-2">
                                <textarea
                                    name="comment"
                                    required
                                    {...register3("comment")}
                                    placeholder='En esta sección escribe las notas adicionales sobre el asesorado (máximo 500 carácteres)'
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:italic placeholder:text-slate-400 placeholder:px-2 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                    </div>
                    <button 
                        type="submit"
                        className="flex mx-auto px-10 font-medium rounded-lg text-white py-2.5 bg-gradient-to-r whitespace-nowrap from-red-500 to-amber-500"
                    >Enviar</button>
                </form>
            </div>
        </Modal>


        <h1 className="sm:text-lg text-sm font-bold title-font text-center text-white mt-10">DATOS DEL ASESORADO</h1>
        <div className="flex flex-col p-3">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full border text-center text-sm font-light text-white dark:border-neutral-500">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                <th
                                    scope="col"
                                    className="border-r px-6 py-4 dark:border-neutral-500">
                                    NOMBRE
                                </th>
                                <th
                                    scope="col"
                                    className="border-r px-6 py-4 dark:border-neutral-500">
                                    OBJETIVO
                                </th>
                                <th
                                    scope="col"
                                    className="border-r px-6 py-4 dark:border-neutral-500">
                                    ESTATURA
                                </th>
                                <th
                                    scope="col"
                                    className="border-r px-6 py-4 dark:border-neutral-500">
                                    PESO
                                </th>
                                <th
                                    scope="col"
                                    className="border-r px-6 py-4 dark:border-neutral-500">
                                    EDAD
                                </th>
                                <th scope="col" className="px-6 py-4"> FACTOR ACTIVIDAD</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b dark:border-neutral-500">
                                    <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                                        {memData?.UserData?.name}
                                    </td>
                                    <td
                                        className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                        {memData?.MembershipData?.objective === "increase_mass" ? "Aumento de masa muscular" : null }
                                        {memData?.MembershipData?.objective === "fat_percent_reduction" ? "Reduccion de porcentajes de grasa" : null }
                                        {memData?.MembershipData?.objective === "maintenance" ? "Mantenimiento" : null }
                                        {memData?.MembershipData?.objective === "definition" ? "Definición" : null }
                                    </td>
                                    <td
                                        className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                        {memData?.MembershipData?.height}
                                    </td>
                                    <td
                                        className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                        {memData?.MembershipData?.weight}
                                    </td>
                                    <td
                                        className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                        {memData?.MembershipData?.age}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">{memData?.MembershipData?.factor}</td>
                                </tr>
                                <tr className="border-b dark:border-neutral-500">
                                    <td
                                        className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                                        OBSERVACIONES:
                                    </td>
                                    <td
                                        colSpan={4}
                                        className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                        {memData?.MembershipData?.comment}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <>
                                            <button disabled={memData?.UserData?.email? false : true} onClick={showModal3} className="mx-1 rounded-lg px-10 font-medium text-white py-2.5 whitespace-nowrap bg-amber-500">Edit Data</button>
                                            <button className="mx-1 rounded-lg px-10 font-medium text-white py-2.5 whitespace-nowrap bg-red-500">Delete Data</button>
                                        </>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}

export default MemberData