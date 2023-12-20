import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { MdAddCircle, MdRemoveCircle } from "react-icons/md";
import { MusculeGroup } from "../particles/getData";
// import axios from "axios";

const FormWe = ({memb_ID}) => {
  const [selectedMG, setSelectedMG] = useState([""]);
  const [subCat, setSubCat] = useState([""]);

  // console.log({
  //   "selectedMG": selectedMG,
  //   "subCat": subCat
  // })
  
  const { control, register, handleSubmit, setValue } = useForm({
    defaultValues: {
      muscule_group: [{ member: memb_ID, sector: "", subSector: "", elementD: "", data_s: "", data_r: "", data_d: "", beginning: "", data_sec: "", data_rir: "" }],
    },
  });

  const {
    fields: field1,
    append: append1,
    remove: remove1,
  } = useFieldArray({
    control,
    name: "muscule_group",
  });

  const handleMGChange = (event, index) => {
    const selectedMGValue = event.target.value;
    setSelectedMG((prevSelectedMG) => {
      const newSelectedMG = [...prevSelectedMG];
      newSelectedMG[index] = selectedMGValue;
      return newSelectedMG;
    });

    const selectedMGData = MusculeGroup.find(
      (mg) => mg.name === selectedMGValue
    );
    setSubCat((prevSubCat) => {
      const newSubCat = [...prevSubCat];
      newSubCat[index] = selectedMGData ? selectedMGData.subSector : [];
      return newSubCat;
    });
  };

  const onSubmit = (formData) => {
    // setValue("memb_ID", memb_ID)
    console.log("formData.muscule_group", formData.muscule_group);
    console.log("formData", formData);

    // console.log("updated form", data)
    
    // axios.post(`http://127.0.0.1:8000/api/fitness/exercise/`, formData.muscule_group)
    //     .then(res => {
    //       console.log(res.data)
    //       // alert(res.data.message)
    //     })
    //     .catch(err => {
    //       console.log(err.request.response);
    //       // alert(err.request.response)
    //     });
  };

  return (
    <section>
      <div className="flex flex-col text-center w-full mt-24">
        <select 
          className="bg-opacity-50 mx-auto w-1/3 rounded border border-amber-300 text-base outline-none py-1 px-3"
        >
            <option value="Tension Mecanica">Mechanical Stress</option>
            <option value="Estres Metabolico">Metabolic Stress</option>
            <option value="Rutina Hibrida">Hybrid Routine</option>
            <option value="Circuito Metabolico">Metabolic Circuit</option>
            <option value="Cardio Hiit">  Cardio Hiit</option>
            <option value="Cardio Liss"> Cardio Liss</option>
            <option value="Descanso">Rest</option>
        </select>
      </div>

      <form className="p-3" onSubmit={handleSubmit(onSubmit)}>

        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full border text-center text-sm font-light text-white dark:border-neutral-500">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr className="border-b">
                                    <th
                                        scope="col"
                                        colSpan={3}
                                        className="border-r px-6 py-4 dark:border-neutral-500">
                                        CALORIC OBJECTIVE:
                                    </th>
                                    <th
                                        scope="col"
                                        colSpan={3}
                                        className="border-r px-6 py-4 dark:border-neutral-500">
                                        934
                                    </th>
                                    <th scope="col" colSpan={6} className="px-6 py-4">MESOCYCLE DURATION:</th>
                                </tr>
                                <tr>
                                    <th
                                        scope="col"
                                        colSpan={3}
                                        className="border-r px-6 py-4 dark:border-neutral-500">
                                        MUSCLE GROUP
                                    </th>
                                    <th
                                        scope="col"
                                        className="border-r px-6 py-4 dark:border-neutral-500">
                                        EXERCISE
                                    </th>
                                    <th
                                        scope="col"
                                        className="border-r px-6 py-4 dark:border-neutral-500">
                                        ELEMENT
                                    </th>
                                    <th
                                        scope="col"
                                        className="border-r px-6 py-4 dark:border-neutral-500">
                                        WEIGHT
                                    </th>
                                    <th
                                        scope="col"
                                        className="border-r px-6 py-4 dark:border-neutral-500">
                                        S
                                    </th>
                                    <th
                                        scope="col"
                                        className="border-r px-6 py-4 dark:border-neutral-500">
                                        R
                                    </th>
                                    <th
                                        scope="col"
                                        className="border-r px-6 py-4 dark:border-neutral-500">
                                        D
                                    </th>
                                    <th
                                        scope="col"
                                        className="border-r px-6 py-4 dark:border-neutral-500">
                                        BEGINNING
                                    </th>
                                    <th
                                        scope="col"
                                        className="border-r px-6 py-4 dark:border-neutral-500">
                                        SEC
                                    </th>
                                    <th scope="col" colSpan={6} className="px-6 py-4">RIR</th>
                                </tr>
                            </thead>
                            <tbody>
                              {field1.map((field, index) => (
                                <tr key={field.id} className="border-b text-black dark:border-neutral-500">
                                  <th className="hidden">
                                    <input
                                      name={`muscule_group[${index}].member`}
                                      {...register(`muscule_group.${index}.member`)}
                                      type="text"
                                      className="bg-opacity-50 rounded border border-gray-300 text-base outline-none py-1 px-3"
                                      value={memb_ID}
                                      readOnly
                                    />
                                  </th>
                                  <th colSpan={3} className="whitespace-nowrap border-r px-3 py-4 dark:border-neutral-500">
                                    <div className="flex flex-row">
                                      <div className="text-white mr-2">
                                        {index > 0 && (
                                          <MdRemoveCircle
                                            className="text-lg"
                                            onClick={() => {
                                              remove1(index);
                                              setSelectedMG((prevSelectedMG) => {
                                                const newSelectedMG = [...prevSelectedMG];
                                                newSelectedMG.splice(index, 1);
                                                return newSelectedMG;
                                              });
                                              setSubCat((prevSubCat) => {
                                                const newSubCat = [...prevSubCat];
                                                newSubCat.splice(index, 1);
                                                return newSubCat;
                                              });
                                            }}
                                          />
                                        )}
                                        {index === field1.length - 1 && (
                                          <>
                                            <MdAddCircle
                                              onClick={() => {
                                                append1({ name: "", member: memb_ID });
                                                setSelectedMG((prevSelectedMG) => [
                                                  ...prevSelectedMG,
                                                  "",
                                                ]);
                                                setSubCat((prevSubCat) => [...prevSubCat, []]);
                                              }}
                                              className="text-lg"
                                            />
                                          </>
                                        )}
                                      </div>
                                      
                                      <div>
                                        <select
                                          name={`muscule_group[${index}].sector`}
                                          {...register(`muscule_group.${index}.sector`)}
                                          className="bg-opacity-50 w-full rounded border border-gray-300 text-base outline-none py-1 px-3"
                                          onChange={(event) => handleMGChange(event, index)}
                                        >
                                          <option value="">--Select--</option>
                                          {MusculeGroup.map((mg, i) => (
                                            <option key={i} value={mg.name}>
                                              {mg.name}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </th>
                                  <th className="whitespace-nowrap border-r px-3 py-4 dark:border-neutral-500">
                                    <div style={{ textAlign: "center" }}>
                                      <select
                                        name={`muscule_group[${index}].subSector`}
                                        {...register(`muscule_group.${index}.subSector`)}
                                        className="bg-opacity-50 w-full rounded border border-gray-300 text-base outline-none py-1 px-3"
                                      >
                                        <option value="">--Select--</option>
                                        {subCat[index] &&
                                          subCat[index].map((c, i) => (
                                            <option key={i} value={c}>
                                              {c}
                                            </option>
                                          ))}
                                      </select>
                                    </div>
                                  </th>
                                  <th className="whitespace-nowrap border-r px-3 py-4 dark:border-neutral-500">
                                    <div style={{ textAlign: "center" }}>
                                      <select
                                        name={`muscule_group[${index}].elementD`}
                                        {...register(`muscule_group.${index}.elementD`)}
                                        className="bg-opacity-50 w-full rounded border border-gray-300 text-base outline-none py-1 px-3"
                                      >
                                        <option value="">--Select--</option>
                                        <option value="Mancuerna" >Dumbbell</option>
                                        <option value="Barra">Bar</option>
                                        <option value="Banda">Band</option>
                                        <option value="Polea">Pulley</option>
                                        <option value="Disco">Disk</option>
                                        <option value="Kettlebell" >Kettlebell</option>
                                        <option value="Pesa Rusa" >Kettlebell</option>
                                        <option value="No Aplica" >Not applicable</option>
                                        <option value="Máquina" >Machine</option>
                                        <option value="Barra Z">Z-Bar</option>
                                      </select>
                                    </div>
                                  </th>
                                  <th className="whitespace-nowrap border-r px-1 py-4 dark:border-neutral-500">
                                    <div className="text-white">3KG</div>
                                  </th>
                                  <th className="whitespace-nowrap border-r px-1 py-4 dark:border-neutral-500">
                                    <div style={{ textAlign: "center" }}>
                                      <select
                                        name={`muscule_group[${index}].data_s`}
                                        {...register(`muscule_group.${index}.data_s`)}
                                        className="bg-opacity-50 w-full rounded border border-gray-300 text-base outline-none py-1 px-3"
                                      >
                                        <option value=""></option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                      </select>
                                    </div>
                                  </th>
                                  <th className="whitespace-nowrap border-r px-1 py-4 dark:border-neutral-500">
                                    <div style={{ textAlign: "center" }}>

                                      <select
                                        name={`muscule_group[${index}].data_r`}
                                        {...register(`muscule_group.${index}.data_r`)}
                                        className="bg-opacity-50 w-full rounded border border-gray-300 text-base outline-none py-1 px-3"
                                      >
                                        <option value=""></option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                        <option value="13">13</option>
                                        <option value="14">14</option>
                                        <option value="15">15</option>
                                        <option value="16">16</option>
                                        <option value="17">17</option>
                                        <option value="18">18</option>
                                        <option value="19">19</option>
                                        <option value="20">20</option>
                                        <option value="21">21</option>
                                        <option value="22">22</option>
                                        <option value="23">23</option>
                                        <option value="24">24</option>
                                        <option value="25">25</option>
                                        <option value="26">26</option>
                                        <option value="27">27</option>
                                        <option value="28">28</option>
                                        <option value="29">29</option>
                                        <option value="30">30</option>
                                      </select>
                                    </div>
                                  </th>
                                  <th className="whitespace-nowrap border-r px-1 py-4 dark:border-neutral-500">
                                    <div style={{ textAlign: "center" }}>
                                      <select
                                        name={`muscule_group[${index}].data_d`}
                                        {...register(`muscule_group.${index}.data_d`)}
                                        className="bg-opacity-50 w-full rounded border border-gray-300 text-base outline-none py-1 px-3"
                                      >
                                        <option value=""></option>
                                        <option value="30s">30s</option>
                                        <option value="60s">60s</option>
                                        <option value="90s">90s</option>
                                        <option value="120s">120s</option>
                                        <option value="150s">150s</option>
                                        <option value="180s">180s</option>
                                      </select>
                                    </div>
                                  </th>
                                  <th className="whitespace-nowrap border-r px-3 py-4 dark:border-neutral-500">
                                    <div style={{ textAlign: "center" }}>
                                      <select
                                        name={`muscule_group[${index}].beginning`}
                                        {...register(`muscule_group.${index}.beginning`)}
                                        className="bg-opacity-50 w-full rounded border border-gray-300 text-base outline-none py-1 px-3"
                                      >
                                        <option value=""></option>
                                        <option
                                          value="Explosivo"
                                        >
                                          Explosive
                                        </option>
                                        <option
                                          value="Mas explosivo"
                                        >
                                          More explosive
                                        </option>
                                        <option
                                          value="Negativo"
                                        >
                                          Negative
                                        </option>
                                        <option
                                          value="Mas negativo 6s"
                                        >
                                          More Negative 6s
                                        </option>
                                        <option
                                          value="Negativo/Explosivo"
                                        >
                                          Negative/Explosive
                                        </option>
                                        <option
                                          value="Explosivo/Negativo"
                                        >
                                          Explosive/Negative
                                        </option>
                                        <option
                                          value="Explosivo/Auxotonico"
                                        >
                                          Explosive/Auxotonic
                                        </option>
                                        <option
                                          value="Explosivo/Mas explosivo"
                                        >
                                          Explosive/More Explosive
                                        </option>
                                        <option
                                          value="Doble angulo"
                                        >
                                          Double Angle
                                        </option>
                                        <option
                                          value="Doble angulo/Negativo"
                                        >
                                          Dual Angle/Negative
                                        </option>
                                        <option
                                          value="Entrenamiento De Pico"
                                        >
                                          Peak Training
                                        </option>
                                        <option
                                          value="Auxotonico"
                                        >
                                          Auxotonic
                                        </option>
                                        <option
                                          value="Auxotonico/Negativo"
                                        >
                                          Auxotonic/Negative
                                        </option>
                                        <option
                                          value="Fallo Muscular Maximo"
                                        >
                                          Maximal Muscle Failure
                                        </option>
                                        <option
                                          value="Piramide Descendente"
                                        >
                                          Descending Pyramid
                                        </option>
                                        <option
                                          value="Piramide Ascendente"
                                        >
                                          Ascending Pyramid
                                        </option>
                                        <option
                                          value="Cluster"
                                        >
                                          Cluster
                                        </option>
                                        <option
                                          value="Rest Pause"
                                        >
                                          Rest Pause
                                        </option>
                                        <option
                                          value="Biseriado"
                                        >
                                          Biseriate
                                        </option>
                                        <option
                                          value="Hibrido"
                                        >
                                          Hybrid
                                        </option>
                                        <option
                                          value="Circuitos"
                                        >
                                          Circuits
                                        </option>
                                        <option
                                          value="Deficit Bilateral 1 Mano"
                                        >
                                          Bilateral Deficit 1 Hand
                                        </option>
                                        <option
                                          value="TUT (1 Minuto)"
                                        >
                                          TUT (1 minute)
                                        </option>
                                        <option
                                          value="Push Pull"
                                        >
                                          Push Pull
                                        </option>
                                        <option
                                          value="Inhibicion Reciproca"
                                        >
                                          Reciprocal Inhibition
                                        </option>
                                        <option
                                          value="C.M.V."
                                        >
                                          C.M.V.
                                        </option>
                                        <option
                                          value="Semana Descarga"
                                        >
                                          Week Download
                                        </option>
                                        <option
                                          value="Semana Descarga Parcial"
                                        >
                                          Partial Download Week
                                        </option>
                                        <option
                                          value="Semana Descarga Total"
                                        >
                                          Total Download Week
                                        </option>
                                        <option
                                          value="Descarga"
                                        >
                                          Discharge
                                        </option>
                                        <option
                                          value="Descarga Parcial"
                                        >
                                          Partial Discharge
                                        </option>
                                        <option
                                          value="Descarga Total"
                                        >
                                          Total Download
                                        </option>
                                        <option
                                          value="N/A"
                                        >
                                          N/A
                                        </option>
                                      </select>
                                      
                                    </div>
                                  </th>
                                  <th className="whitespace-nowrap border-r px-1 py-4 dark:border-neutral-500">
                                    <div style={{ textAlign: "center" }}>
                                      <select
                                        name={`muscule_group[${index}].data_sec`}
                                        {...register(`muscule_group.${index}.data_sec`)}
                                        className="bg-opacity-50 w-full rounded border border-gray-300 text-base outline-none py-1 px-3"
                                      >
                                        <option value=""></option>
                                        <option value="5sg">5sg</option>
                                        <option value="8sg">8sg</option>
                                        <option value="10sg">10sg</option>
                                        <option value="N/A">N/A</option>
                                      </select>
                                    </div>
                                  </th>
                                  <th className="whitespace-nowrap border-r px-1 py-4 dark:border-neutral-500">
                                    <div style={{ textAlign: "center" }}>
                                      <select
                                        name={`muscule_group[${index}].data_rir`}
                                        {...register(`muscule_group.${index}.data_rir`)}
                                        className="bg-opacity-50 w-full rounded border border-gray-300 text-base outline-none py-1 px-3"
                                      >
                                        <option value=""></option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="N/A" >N/A</option>
                                      </select>
                                    </div>
                                  </th>
                                </tr>
                              ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <button 
          type="submit"
          className="flex mx-auto px-10 font-medium text-white py-2.5 bg-gradient-to-r whitespace-nowrap from-red-500 to-amber-500"
        >Submit</button>
      </form>
    </section>
  );
};

export default FormWe;
