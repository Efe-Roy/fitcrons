import React,{useEffect, useRef, useState} from 'react';
import { useReactToPrint } from "react-to-print";
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ReactToPrint = () => {
  const {id} = useParams();
  const [dataInit, setDataInit] = useState([])
  const [memData, setMemData] = useState([])

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


  useEffect(() => {
    const fetchData = async() => {
      try {
        const res1 = await axios.get(`http://127.0.0.1:8000/api/fitness/list-create-update/${id}/`);
        if(res1.data?.length > 0){
          setDataInit(res1.data);
        } else{
            setDataInit([]);
        }

        const res2 = await axios.get(`http://127.0.0.1:8000/api/auth/me/${id}/`);
        setMemData(res2.data);
        calculateResults(res2.data);
          
      } catch (error) {
          console.log(error)
      }
    };
    
    fetchData();
  }, [])

  console.log({
    "id": id,
    "dataInit": dataInit,
    "memData": memData,
    "results": results
  })
  
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Layout>
      <div className="container px-5 py-5 mx-auto bg-white">
        <button onClick={handlePrint} className="bg-blue-400 px-1 py-2 rounded-lg mb-5">  Button PDF </button>
        <div ref={componentRef} className="">
            
          <h1 className="bg-black text-white text-sm py-3 font-bold title-font text-center mt-10 sm:text-lg">ESQUEMA DE ENTRENAMIENTO</h1>
          <div className="flex flex-col p-3">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                      <div className="overflow-hidden">
                          <table className="min-w-full border text-center text-sm text-sm font-light dark:border-neutral-500">
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
                                          {memData?.name}
                                      </td>
                                      <td
                                          className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                          {memData?.objective === "increase_mass" ? "Aumento de masa muscular" : null }
                                          {memData?.objective === "fat_percent_reduction" ? "Reduccion de porcentajes de grasa" : null }
                                          {memData?.objective === "maintenance" ? "Mantenimiento" : null }
                                          {memData?.objective === "definition" ? "Definición" : null }
                                      </td>
                                      <td
                                          className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                          {memData?.height}
                                      </td>
                                      <td
                                          className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                          {memData?.weight}
                                      </td>
                                      <td
                                          className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                          {memData?.age}
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4">{memData?.factor}</td>
                                  </tr>
                                  <tr className="border-b dark:border-neutral-500">
                                      <td
                                          className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                                          OBSERVACIONES:
                                      </td>
                                      <td
                                          colSpan={5}
                                          className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                          {memData?.comment}
                                      </td>
                                    
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          </div>


          <div className="flex flex-col my-4 md:flex-row">

              <div className="flex flex-col px-3 md:w-1/2">
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-1">
                      <div className="inline-block min-w-full py-2 sm:px-6 lg:px-1">
                          <div className="overflow-hidden">
                              <table className="min-w-full border text-center text-sm text-sm font-light dark:border-neutral-500">
                                  <thead className="border-b font-medium dark:border-neutral-500">
                                      <tr className='border-b'>
                                          <th scope="col" colSpan={5} className="px-6 py-4">CALORIES</th>
                                      </tr>
                                      <tr>
                                          <th
                                              scope="col"
                                              className="border-r px-1 py-4 dark:border-neutral-500">
                                              IMB
                                          </th>
                                          <th
                                              scope="col"
                                              className="border-r px-1 py-4 dark:border-neutral-500">
                                              CURRENT
                                          </th>
                                          <th
                                              scope="col"
                                              className="border-r px-1 py-4 dark:border-neutral-500">
                                              MAINTENANCE
                                          </th>
                                          <th
                                              scope="col"
                                              className="border-r px-1 py-4 dark:border-neutral-500">
                                              REDUCTION
                                          </th>
                                          <th scope="col" className="px-1 py-4">INCREASE</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      <tr className="border-b dark:border-neutral-500">
                                          <td
                                              className="whitespace-nowrap border-r px-1 py-4 dark:border-neutral-500">
                                              {Math.ceil(results?.bmr)}
                                          </td>
                                          <td
                                              className="whitespace-nowrap border-r px-1 py-4 dark:border-neutral-500">
                                              {memData?.calories}
                                          </td>
                                          <td
                                              className="whitespace-nowrap border-r px-1 py-4 dark:border-neutral-500">
                                              {Math.ceil(results?.maintenance)}
                                          </td>
                                          <td
                                              className="whitespace-nowrap border-r px-1 py-4 dark:border-neutral-500">
                                              {Math.ceil(results?.reduction)}
                                          </td>
                                          <td className="whitespace-nowrap px-1 py-4">{Math.ceil(results?.increase)}</td>
                                      </tr>
                                  </tbody>
                              </table>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="flex flex-col px-3 md:w-1/2">
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-1">
                      <div className="inline-block min-w-full py-2 sm:px-6 lg:px-1">
                          <div className="overflow-hidden">
                              <table className="min-w-full border text-center text-sm text-sm font-light dark:border-neutral-500">
                                  <thead className="border-b font-medium dark:border-neutral-500">
                                      <tr className='border-b'>
                                          <th scope="col" colSpan={5} className="px-6 py-4">RECOMMENDED BASE INTAKE</th>
                                      </tr>
                                      <tr>
                                          <th
                                              scope="col"
                                              className="border-r px-6 py-4 dark:border-neutral-500">
                                              PROTEIN
                                          </th>
                                          <th
                                              scope="col"
                                              className="border-r px-6 py-4 dark:border-neutral-500">
                                              GREASE
                                          </th>
                                          <th
                                              scope="col"
                                              className="border-r px-6 py-4 dark:border-neutral-500">
                                              CARBS
                                          </th>
                                          <th
                                              scope="col"
                                              className="border-r px-6 py-4 dark:border-neutral-500">
                                              FIBRE
                                          </th>
                                          <th scope="col" className="px-6 py-4">WATER</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      <tr className="border-b dark:border-neutral-500">
                                          <td
                                              className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                              {Math.ceil(results?.recommendedProtein)}
                                          </td>
                                          <td
                                              className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                              {Math.ceil(results?.recommendedFats)}
                                          </td>
                                          <td
                                              className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                              {Math.ceil(results?.recommendedCarbs)}
                                          </td>
                                          <td
                                              className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                              {Math.ceil(results?.recommendedFiber)}
                                          </td>
                                          <td className="whitespace-nowrap px-6 py-4">{results?.recommendedWater}</td>
                                      </tr>
                                  </tbody>
                              </table>
                          </div>
                      </div>
                  </div>
              </div>
              
          </div>


          <h1 className="bg-black text-white text-sm py-3 mt-24 font-bold title-font text-center sm:text-lg">ESQUEMA DE ENTRENAMIENTO</h1>
          <div className="flex flex-col px-5 pb-24 justify-center items-center">
            {dataInit?.map((field, index) => (
              <div className='mb-8' key={field.id}>
                <div className="flex justify-center">
                  <div className='font-bold'>
                    <label className="">DÍA {index + 1}:</label>
                    <span>{field.week_days}</span>
                  </div>
                </div>

                <ul className='border my-3 p-2 rounded-md dark:border-neutral-500'>
                  {field?.gym_activities?.map((activity, activityIndex) => (
                    <li key={activityIndex}>

                      <div className="flex">
                        <div className="grow-0 ">
                          <label className='border text-center text-sm dark:border-neutral-500'>GRUPO MUSCULAR</label>
                          <div className=" border text-center text-sm dark:border-neutral-500">{activity.muscule_group}</div>
                        </div>
                        <div className="grow">
                          <React.Fragment>
                            <div className="grid grid-cols-10">
                              <div className=" col-span-3 text-center border dark:border-neutral-500">934</div>
                              <div className=" col-span-7 text-center border dark:border-neutral-500">MESOCYCLE DURATION:</div>
                            </div>

                            <div className="grid grid-cols-10">
                              <div className=" border text-center text-sm dark:border-neutral-500">EJERCICIO</div>
                              <div className=" border text-center text-sm dark:border-neutral-500">ELEMENTO</div>
                              <div className=" border text-center text-sm dark:border-neutral-500">PESO</div>
                              <div className=" border text-center text-sm dark:border-neutral-500">S</div>
                              <div className=" border text-center text-sm dark:border-neutral-500">R</div>
                              <div className=" border text-center text-sm dark:border-neutral-500">D</div>
                              <div className=" border text-center text-sm dark:border-neutral-500">PRINCIPIO</div>
                              <div className=" border text-center text-sm dark:border-neutral-500">SEG</div>
                              <div className=" border text-center text-sm dark:border-neutral-500">RIR</div>

                              {activity?.nestedArray?.map((nested, i) => (
                                <React.Fragment key={i} >
                                  <div className=" border text-center text-sm dark:border-neutral-500">{nested.exercise}</div>
                                  <div className=" border text-center text-sm dark:border-neutral-500">{nested.element}</div>
                                  <div className=" border text-center text-sm dark:border-neutral-500">{nested.weight}</div>
                                  <div className=" border text-center text-sm dark:border-neutral-500">{nested.data_s}</div>
                                  <div className=" border text-center text-sm dark:border-neutral-500">{nested.data_r}</div>
                                  <div className=" border text-center text-sm dark:border-neutral-500">{nested.data_d}</div>
                                  <div className=" border text-center text-sm dark:border-neutral-500">{nested.principle}</div>
                                  <div className=" border text-center text-sm dark:border-neutral-500">{nested.seg}</div>
                                  <div className=" border text-center text-sm dark:border-neutral-500">{nested.rir}</div>
                                </React.Fragment>
                              ))}
                            </div>

                            <hr />
                          </React.Fragment>
                        </div>
                      </div>

                    </li>
                  ))}
              </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ReactToPrint