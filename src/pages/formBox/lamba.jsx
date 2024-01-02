import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import GymActivity from "./gymActivity";
import axios from "axios";
import { weekDayDelete } from "../../redux/features/fitnessSlice";
import { useDispatch } from "react-redux";
import API from "../../redux/api";

const MyForm = ({dataInit, memb_ID}) => {
  const initialState = [
    {
      "week_days": "",
      "gym_activities": [
        {
          muscule_group: "",
          nestedArray: [
            {
              exercise: "",
              element: "",
              weight: "",
              data_s: "",
              data_r: "",
              data_d: "",
              principle: "",
              seg: "",
              rir: "",
            },
          ],
        },
      ],
    },
  ]
  const { register, handleSubmit, control, setValue, getValues } = useForm({
    defaultValues: {
      formData: initialState,
    },
  });

  // const defaultFormData = dataInit || initialState;
  const defaultFormData = dataInit?.length > 0 ? dataInit : initialState;

  useEffect(() => {
    setValue("formData", defaultFormData);
  }, [dataInit, setValue]);

  // console.log("fd",dataInit)
  const { fields, append, remove } = useFieldArray({
    control,
    name: "formData",
  });

  const onSubmit = (data) => {
    // console.log(data);

    if(dataInit?.length > 0){
      // console.log("Put Update", data.formData)
      API.put(`/api/fitness/list-create-update/${memb_ID}/`, data.formData)
      .then(res => {
        // console.log(res.data)
        alert("Created Successdully")
      })
      .catch(err => {
        console.log(err.request.response);
      });
    } else {
      // console.log("Post Create")
      API.post(`/api/fitness/list-create-update/${memb_ID}/`, data)
      .then(res => {
        // console.log(res.data)
        alert("Created Successdully")
      })
      .catch(err => {
        console.log(err.request.response);
      });
    }
};

const dispatch = useDispatch();

const handleData = (formData) => {
  if(formData.id){
    dispatch(weekDayDelete(formData.id))
  }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-col px-5 py-24 justify-center items-center">
          {fields.map((field, index) => (
            <div key={field.id}>
              <div className="flex mt-12">
                {index > 0 && (
                  <button
                    type="button"
                    className="bg-red-500 rounded-lg py-1 px-3 text-white"
                    onClick={() => {
                      const formData = getValues("formData")[index];
                      handleData(formData);
                      remove(index);
                    }}
                    
                  >
                    Remove Activity
                  </button>
                )}
                {index === fields.length - 1 && (
                  <button
                    type="button"
                    className="bg-blue-500 rounded-lg py-1 px-3 text-white"
                    onClick={() =>
                      append({
                        "week_days": "",
                        "gym_activities": [
                          {
                            muscule_group: "",
                            nestedArray: [
                              {
                                exercise: "",
                                element: "",
                                weight: "",
                                data_s: "",
                                data_r: "",
                                data_d: "",
                                principle: "",
                                seg: "",
                                rir: "",
                              },
                            ],
                          },
                        ],
                      })
                    }
                  >
                    Add Activity
                  </button>
                )}
              </div>
              <div className="flex justify-center">
                <div>
                  <label className="text-white">DÍA {index + 1}:</label>
                  <select 
                    className="bg-opacity-50 mx-auto rounded border border-amber-300 text-base outline-none py-1 px-3"
                    {...register(`formData[${index}].week_days`)}
                    defaultValue={field['week_days']}
                  >
                    <option value="">--Select--</option>
                    <option value="Tension Mecanica">Tension Mecanica</option>
                    <option value="Estres Metabolico">Estres Metabolico</option>
                    <option value="Rutina Hibrida">Rutina Hibrida</option>
                    <option value="Circuito Metabolico">Circuito Metabolico</option>
                    <option value="Cardio Hiit">Cardio Hiit</option>
                    <option value="Cardio Liss">Cardio Liss</option>
                    <option value="Descanso">Descanso</option>
                  </select>
                </div>
              </div>

              <GymActivity gymIndex={index} {...{ control, register, getValues }} />
            </div>
          ))}
          <button
            className="bg-green-600 text-white py-1 px-3 rounded-xl"
            type="submit"
          >
            {dataInit?.length > 0? "actualizar" : "Enviar"}
          </button>
        </div>
      </section>
    </form>
  );
};

export default MyForm;
