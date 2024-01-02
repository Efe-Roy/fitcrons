import React, { useState } from 'react'
// import BGImg from '../assets/Banner.jpg'
import Layout from '../components/Layout'
import { Modal } from 'antd';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import NutritionFact from '../components/tableComp/NutritionFact';
import MemberData from '../components/tableComp/MemberData';
import MyForm from './formBox/lamba';
import { ToastContainer, toast } from "react-toastify";
import { Link } from 'react-router-dom';
import API from '../redux/api';
const BGImg = '/static/general/Banner.jpg'

const AdminPage = () => {
    const [member, setMembers] = useState([])
    const [memData, setMemData] = useState([])
    const [dataInit, setDataInit] = useState([])

    const getMembers = () => {
        API.get('/api/auth/memberlist/')
        .then(res => {
        //   console.log(res.data)
          setMembers(res.data)
        })
        .catch(err => {
          console.log(err.request.response);
        });
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => setIsModalOpen(false);
    const handleCancel = () => setIsModalOpen(false);
    
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const showModal2 = () => {
        setIsModalOpen2(true);
        getMembers();
    };
    const handleOk2 = () => setIsModalOpen2(false);
    const handleCancel2 = () => setIsModalOpen2(false);
    
    
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
        })
        .catch(err => {
          console.log(err.request.response);
          alert(err.request.response)
        });
    };

    // Form 2
    const { register: register2, handleSubmit: handleSubmit2 } = useForm();
    const onSubmit2 = async (formData) => {
        // console.log('data:', formData);
        const {memberID} = formData;
        try {
            const res1 = await API.get(`/api/auth/me/${memberID}/`);
            setMemData(res1.data);
            handleCancel2();
            calculateResults(res1.data);

            const res2 = await API.get(`/api/fitness/list-create-update/${memberID}/`);
            // console.log("c", res2.data);
            if(res2.data?.length > 0){
                // console.log("Has Data")
                setDataInit(res2.data);
            } else{
                setDataInit([]);
            }

            
        } catch (error) {
            console.log(error)
        }
    };



  const [results, setResults] = useState({
    bmr: 0,
    maintenance: 0,
    reduction: 0,
    increase: 0,
    recommendedProtein: 0,
    recommendedFats: 0,
    recommendedCarbs: 0,
    recommendedFiber: 0,
    recommendedWater: 0,
  });

  const calculateResults = (data) => {
    // Calculate BMR (Basal Metabolic Rate) using Harris-Benedict equation
    let calculatedBMR = 0;
    const { weight, height, age, gender, factor } = data;

    if (gender === 'male') {
      calculatedBMR = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else {
      calculatedBMR = 447.593 + 9.247 * weight + 3.098 * height - 4.330 * age;
    }

    // Use the provided activity level as a multiplier
    const calorieMultiplier = factor;

    // Calculate calorie goals
    const maintenanceResult = calculatedBMR * calorieMultiplier;
    const reductionResult = calculatedBMR * calorieMultiplier * 0.8; // 20% calorie reduction
    const increaseResult = calculatedBMR * calorieMultiplier * 1.2; // 20% calorie increase

    // Calculate recommended macronutrient intake based on goals
    const proteinRatio = 0.15; // 15% of total calories from protein
    const fatsRatio = 0.25; // 25% of total calories from fats
    const carbsRatio = 0.60; // 60% of total calories from carbohydrates

    const recommendedProtein = maintenanceResult * proteinRatio / 4; // 4 calories per gram of protein
    const recommendedFats = maintenanceResult * fatsRatio / 9; // 9 calories per gram of fats
    const recommendedCarbs = maintenanceResult * carbsRatio / 4; // 4 calories per gram of carbohydrates

    // Calculate recommended fiber intake (e.g., 14 grams per 1,000 calories)
    const recommendedFiber = (maintenanceResult / 1000) * 14;

    // Calculate recommended water intake (e.g., 30-35 mL per kg of body weight)
    const recommendedWater = weight * 30; // Adjust as needed

    setResults({
      bmr: calculatedBMR,
      maintenance: maintenanceResult,
      reduction: reductionResult,
      increase: increaseResult,
      recommendedProtein,
      recommendedFats,
      recommendedCarbs,
      recommendedFiber,
      recommendedWater,
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
        <Modal 
            title="Seleccionar Esquema Existente" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2}  
            footer={[
                // <button key="ok" onClick={handleCancel} className="mx-1 rounded-lg px-10 font-medium text-white py-2.5 whitespace-nowrap bg-green-500">Enviar</button>,
                // <button key="cancel" onClick={handleOk} className="mx-1 rounded-lg px-10 font-medium text-white py-2.5 whitespace-nowrap bg-red-500">Cancelar</button>
            ]}
        >
            <div className="border-b border-gray-900/10 pb-12">
                <form className="space-y-6" onSubmit={handleSubmit2(onSubmit2)}>
                    <div className="mt-10 grid grid-cols-1  sm:grid-cols-6">

                        <div className="col-span-full">
                            <label htmlFor="memberID" className="block text-sm font-medium leading-6 text-gray-900">
                                Seleccione el Asesorado
                            </label>
                            <div className="mt-2">
                                <select
                                    name="memberID"
                                    {...register2("memberID")}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                >
                                    <option>Seleccione el Sexo</option>
                                    {member?.map((m, i)=>(
                                        <option key={i} value={m.id}>{m.name}</option>
                                    ))}
                                </select>
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


        <section className="body-font">
            <div className='container px-5 pb-24 mx-auto'>
                <div className="rounded-lg  h-64 overflow-hidden">
                    <img alt="content" className="object-cover object-center h-full w-full" src={BGImg} />
                </div>

                <div className="flex justify-center my-5">
                    <button onClick={showModal} className="mx-1 rounded-lg px-10 font-medium text-white py-2.5 whitespace-nowrap bg-blue-500"> Register New Mentee</button>
                    <button onClick={showModal2} className="mx-1 rounded-lg px-10 font-medium text-white py-2.5 whitespace-nowrap bg-gray-500">  Use Existing Counseling</button>
                </div>

                <MemberData memData={memData} />
                <NutritionFact memData={memData} results={results} />

                {memData.id && <MyForm dataInit={dataInit} memb_ID={memData.id} /> }
                {memData.id && <Link to={`/toprint/${memData.id}`} className="bg-white px-1 py-2 rounded-lg mb-5" >Generar PDF</Link> }

                

            </div>
        </section>
    </Layout>
  )
}

export default AdminPage