import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {Modal, Spin, Pagination } from 'antd';
import Layout from "../../components/Layout";
import { useForm } from "react-hook-form";
import API from "../../redux/api";
const BGImg = '/static/general/Banner.jpg'


const UserList = () => {
  const [dataSource, setDataSource] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchRecords();
  }, [currentPage]);

  const fetchRecords = () => {
    setIsLoading(true);
    API.get(`/api/auth/memberlist/?page=${currentPage}&PageSize=${pageSize}`)
    .then((res) => {
    //   console.log(res.data)
      setDataSource(res?.data?.results);
      setTotalRecords(res.data.count);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching records:", error.request.response);
      setIsLoading(false);
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => setIsModalOpen(false);
    const handleCancel = () => setIsModalOpen(false);

    // Form 1
    const { register: register1, handleSubmit: handleSubmit1, reset } = useForm();
    const onSubmit1 = (formData) => {
        // console.log(formData);

        API.post(`/api/auth/register-member/`, formData)
        .then(res => {
        //   console.log(res.data)
          alert(res.data.message)
          handleCancel()
          reset();
          window.location.reload();
        })
        .catch(err => {
          console.log(err.request.response);
          alert(err.request.response)
        });
    };
  return (
    <Layout>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Modal 
          title="Datos del Asesorado" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}  
          footer={[
              // <button key="ok" onClick={handleCancel} className="mx-1 rounded-lg px-10 font-medium text-white py-2.5 whitespace-nowrap bg-green-500">Enviar</button>,
              // <button key="cancel" onClick={handleOk} className="mx-1 rounded-lg px-10 font-medium text-white py-2.5 whitespace-nowrap bg-red-500">Cancelar</button>
          ]}
      >
          <div className="border-b border-gray-900/10 pb-12">
              <form className="space-y-6" onSubmit={handleSubmit1(onSubmit1)}>
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
                                  {...register1("name")}
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
                                  {...register1("gender")}
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
                              {...register1("height")}
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
                              {...register1("weight")}
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
                              {...register1("age")}
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
                              {...register1("calories")}
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
                                  {...register1("factor")}
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
                              {...register1("not_sure")}
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
                                  {...register1("objective")}
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

                      <div className="sm:col-span-2">
                          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                              Email
                          </label>
                          <div className="mt-2">
                              <input
                              type="email"
                              required
                              name="email"
                              {...register1("email")}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:italic placeholder:text-slate-400 placeholder:px-2 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                              />
                          </div>
                      </div>

                      <div className="sm:col-span-2">
                          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                              password
                          </label>
                          <div className="mt-2">
                              <input
                              type="password"
                              required
                              name="password"
                              {...register1("password")}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:italic placeholder:text-slate-400 placeholder:px-2 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                              />
                          </div>
                      </div>

                      <div className="sm:col-span-2">
                          <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                              phone
                          </label>
                          <div className="mt-2">
                              <input
                              type="number"
                              required
                              name="phone"
                              {...register1("phone")}
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
                                  {...register1("comment")}
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

      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

        <div className="rounded-lg  h-64 overflow-hidden">
            <img alt="content" className="object-cover object-center h-full w-full" src={BGImg} />
        </div>
        
        <div className="sm:flex sm:justify-between sm:items-center my-8">

            {/* Left: Avatars */}
            <span className="font-black uppercase">...</span>

            {/* Right: Actions */}
              <button
                onClick={showModal}
                className="px-5 py-2 rounded-lg bg-brightRed hover:bg-amber-600 text-white"
              >
                  <span className="">Registrar nuevo usuario</span>
              </button>  

        </div>

        <h1 className="sm:text-lg text-sm font-bold title-font text-center text-white mt-10">ARCHIVO NO ASIGNADO</h1>
        <div className="flex flex-col p-3">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full border text-center text-sm font-light text-white dark:border-neutral-500">
                            <thead className="border-b font-bold bg-amber-500 dark:border-neutral-500">
                                <tr>
                                <th
                                    scope="col"
                                    className="border-r px-6 py-4 dark:border-neutral-500">
                                    DIRECCIÓN DE CORREO ELECTRÓNICO
                                </th>
                                <th
                                    scope="col"
                                    className="border-r px-6 py-4 dark:border-neutral-500">
                                    NOMBRE DE USUARIO
                                </th>
                                <th
                                    scope="col"
                                    className="border-r px-6 py-4 dark:border-neutral-500">
                                    PHONE NUMBER
                                </th>
                                <th
                                    scope="col"
                                    className="border-r px-6 py-4 dark:border-neutral-500">
                                    ACCIÓN
                                </th>
                                </tr>
                            </thead>
                            <tbody>

                                {isLoading ? (
                                  <tr>
                                    <td colSpan="5" className='text-center py-24'>
                                      <Spin size="large" />
                                      Loading...
                                    </td>
                                  </tr>
                                ) : (
                                  dataSource?.map((item, i) => (
                                    <tr className="border-b dark:border-neutral-500" key={i}>
                                      <td className='whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500'>{item?.user?.email}</td>
                                      <td className='whitespace-nowrap border-r uppercase px-6 py-4 font-medium dark:border-neutral-500'>{item?.user?.name}</td>
                                      <td className='whitespace-nowrap border-r uppercase px-6 py-4 font-medium dark:border-neutral-500'>{item?.user?.phone}</td>
                                      <td className='whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500 text-amber-500'> 
                                        <Link to={`/detail/${item?.user?.id}`} ><FaEye /></Link>
                                      </td>
                                    </tr>
                                  ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex justify-center">
          <div className='bg-white p-3 my-5 rounded-3xl'>
            <Pagination
              current={currentPage}
              total={totalRecords}
              pageSize={pageSize}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default UserList;
