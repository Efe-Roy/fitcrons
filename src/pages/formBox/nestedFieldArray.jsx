import React from "react";
import { useFieldArray } from "react-hook-form";
import { MdAddCircle, MdRemoveCircle } from "react-icons/md";
import { exercisesDelete } from "../../redux/features/fitnessSlice";
import { useDispatch } from "react-redux";

const NestedFieldArray = ({ gymIndex, activityIndex, control, register, getValues, subCat }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `formData.${gymIndex}.gym_activities.${activityIndex}.nestedArray`
  });

  const dispatch = useDispatch();

  const handleData = (formData) => {
    if(formData.id){
      dispatch(exercisesDelete(formData.id))
    }
  };
  
  return (
    <React.Fragment>
      <div className="grid grid-cols-10">
        <div className="text-white col-span-3 text-center border">934</div>
        <div className="text-white col-span-7 text-center border">MESOCYCLE DURATION:</div>
      </div>

      <div className="grid grid-cols-10">
        <div className="text-white border text-center">EJERCICIO</div>
        <div className="text-white border text-center">ELEMENTO</div>
        <div className="text-white border text-center">PESO</div>
        <div className="text-white border text-center">S</div>
        <div className="text-white border text-center">R</div>
        <div className="text-white border text-center">D</div>
        <div className="text-white border text-center">PRINCIPIO</div>
        <div className="text-white border text-center">SEG</div>
        <div className="text-white border text-center">RIR</div>
        <div className="text-white border text-center">Acción</div>
        {fields.map((nested, i) => (
          <React.Fragment key={i} >
           
            <select
              {...register(`formData[${gymIndex}].gym_activities[${activityIndex}].nestedArray[${i}].exercise`)}
              defaultValue={nested.exercise}
              className="mr-1 mb-1 p-1.5 rounded-md text-center"
            >
              <option value="">--Select--</option>
              {subCat[activityIndex] &&
                subCat[activityIndex].map((c, iV) => (
                  <option key={iV} value={c}>
                    {c}
                  </option>
              ))}
            </select>

            <select
              {...register(`formData[${gymIndex}].gym_activities[${activityIndex}].nestedArray[${i}].element`)}
              defaultValue={nested.element}
              className="mr-1 mb-1 p-1.5 rounded-md text-center"
            >
              <option value="">--Select--</option>
              <option value="Mancuerna" >Mancuerna</option>
              <option value="Barra">Barra</option>
              <option value="Banda">Banda</option>
              <option value="Polea">Polea</option>
              <option value="Disco">Disco</option>
              <option value="Kettlebell" >Kettlebell</option>
              <option value="Pesa Rusa" >Pesa Rusa</option>
              <option value="No Aplica" >No Aplica</option>
              <option value="Máquina" >Máquina</option>
              <option value="Barra Z">Barra Z</option>
            </select>

            <input
              type="number"
              className="mr-1 mb-1 p-1.5 rounded-md text-center"
              {...register(`formData[${gymIndex}].gym_activities[${activityIndex}].nestedArray[${i}].weight`)}
              defaultValue={nested.weight}
              placeholder="Enter weight"
            />

            <select
              {...register(`formData[${gymIndex}].gym_activities[${activityIndex}].nestedArray[${i}].data_s`)}
              defaultValue={nested.data_s}
              className="mr-1 mb-1 p-1.5 rounded-md text-center"
            >
              <option value="">--Select--</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>

            <select
              className="mr-1 mb-1 p-1.5 rounded-md text-center"
              {...register(`formData[${gymIndex}].gym_activities[${activityIndex}].nestedArray[${i}].data_r`)}
              defaultValue={nested.data_r}
            >
              <option value="">--Select--</option>
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

            <select
              className="mr-1 mb-1 p-1.5 rounded-md text-center"
              {...register(`formData[${gymIndex}].gym_activities[${activityIndex}].nestedArray[${i}].data_d`)}
              defaultValue={nested.data_d}
            >
              <option value="">--Select--</option>
              <option value="30s">30s</option>
              <option value="60s">60s</option>
              <option value="90s">90s</option>
              <option value="120s">120s</option>
              <option value="150s">150s</option>
              <option value="180s">180s</option>
            </select>

            <select
              className="mr-1 mb-1 p-1.5 rounded-md text-center"
              {...register(`formData[${gymIndex}].gym_activities[${activityIndex}].nestedArray[${i}].principle`)}
              defaultValue={nested.principle}
            >
              <option value="">--Select--</option>
              <option value="Explosivo">Explosive</option>
              <option value="Mas explosivo">Mas explosivo</option>
              <option value="Negativo">Negativo</option>
              <option value="Mas negativo 6s">Mas negativo 6s</option>
              <option value="Negativo/Explosivo">Negativo/Explosivo</option>
              <option value="Explosivo/Negativo">Explosivo/Negativo</option>
              <option value="Explosivo/Auxotonico">Explosivo/Auxotonico</option>
              <option value="Explosivo/Mas explosivo">Explosivo/Mas explosivo</option>
              <option value="Doble angulo">Doble angulo</option>
              <option value="Doble angulo/Negativo">Doble angulo/Negativo</option>
              <option value="Entrenamiento De Pico">Entrenamiento De Pico</option>
              <option value="Auxotonico">Auxotonico</option>
              <option value="Auxotonico/Negativo">Auxotonico/Negativo</option>
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

            <select
              className="mr-1 mb-1 p-1.5 rounded-md text-center"
              {...register(`formData[${gymIndex}].gym_activities[${activityIndex}].nestedArray[${i}].seg`)}
              defaultValue={nested.seg}
            >
              <option value="">--Select--</option>
              <option value="5sg">5sg</option>
              <option value="8sg">8sg</option>
              <option value="10sg">10sg</option>
              <option value="N/A">N/A</option>
            </select>
            
            <select
              className="mr-1 mb-1 p-1.5 rounded-md text-center"
              {...register(`formData[${gymIndex}].gym_activities[${activityIndex}].nestedArray[${i}].rir`)}
              defaultValue={nested.rir}
            >
              <option value="">--Select--</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="N/A" >N/A</option>
            </select>

            <div className="flex text-center">
              {i > 0 && (
                <MdRemoveCircle type="button" className="text-white text-lg" 
                  onClick={() => {
                    const formData = getValues(`formData.${gymIndex}.gym_activities.${activityIndex}.nestedArray`)[i];
                    handleData(formData);
                    remove(i);
                  }}
                />
              )}
              {i === fields.length - 1 && (
                <MdAddCircle
                  type="button"
                  className="text-white text-lg"
                  onClick={() =>
                    append({
                      exercise: "",
                      element: "",
                      weight: "",
                      data_s: "",
                      data_r: "",
                      data_d: "",
                      principle: "",
                      seg: "",
                      rir: "",
                    })
                  }
                />
              )}
            </div>

          </React.Fragment>
        ))}
      </div>

      <hr />
    </React.Fragment>
  );
};

export default NestedFieldArray