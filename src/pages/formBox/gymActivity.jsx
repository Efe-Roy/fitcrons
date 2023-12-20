import React from 'react'
import { useFieldArray } from "react-hook-form";
import { MdAddCircle, MdRemoveCircle } from "react-icons/md";
import NestedFieldArray from './nestedFieldArray';
import { MusculeGroup } from '../../components/particles/getData';
import { gymActivitiesDelete } from '../../redux/features/fitnessSlice';
import { useDispatch } from 'react-redux';

const GymActivity = ({ gymIndex, control, register, getValues }) => {
    const { fields, remove, append } = useFieldArray({
        control,
        name: `formData.${gymIndex}.gym_activities`
    });

  const [subCat, setSubCat] = React.useState([""]);

  const handleMGChange = (event, index) => {
    const selectedMGValue = event.target.value;
    const selectedMGData = MusculeGroup.find(
      (mg) => mg.name === selectedMGValue
    );
    setSubCat((prevSubCat) => {
      const newSubCat = [...prevSubCat];
      newSubCat[index] = selectedMGData ? selectedMGData.subSector : [];
      return newSubCat;
    });
  };

  const dispatch = useDispatch();

  const handleData = (formData) => {
    if(formData.id){
      dispatch(gymActivitiesDelete(formData.id))
    }
  };
  // console.log("subCat data", subCat)

  return (
    <React.Fragment>
        <ul className='border my-3 p-2 rounded-md'>
            {fields.map((activity, activityIndex) => (
              <li key={activityIndex}>
                <div className='flex'>
                  {activityIndex === fields.length - 1 && (
                    <MdAddCircle
                        type="button"
                        className="text-white text-lg"
                        onClick={() =>
                          append({
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
                          })
                        }
                    />
                  )}
                  {activityIndex > 0 && 
                    <MdRemoveCircle className="text-white text-lg" type="button" 
                      onClick={() => {
                        const formData = getValues(`formData.${gymIndex}.gym_activities`)[activityIndex];
                        handleData(formData);
                        remove(activityIndex);
                      }}
                    />
                  }
                </div>

                <div className="flex">
                  <div className="grow-0 ">
                    {/* <label className='text-white border text-center'>CALORIC OBJECTIVE:</label> <br />  */}
                    <label className='text-white text-center'>GRUPO MUSCULAR</label>
                    <select
                      {...register(`formData[${gymIndex}].gym_activities[${activityIndex}].muscule_group`)}
                      defaultValue={activity.muscule_group}
                      onChange={(event) => handleMGChange(event, activityIndex)}
                      className="mr-1 mb-1 p-1.5 rounded-md"
                    >
                      <option value="">--Select--</option>
                      {MusculeGroup.map((mg, i) => (
                        <option key={i} value={mg.name}>
                          {mg.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grow">
                    <NestedFieldArray gymIndex={gymIndex} activityIndex={activityIndex} subCat={subCat} {...{ control, register, getValues }}  />
                  </div>
                </div>

              </li>
            ))}
        </ul>
    </React.Fragment>
  )
}

export default GymActivity