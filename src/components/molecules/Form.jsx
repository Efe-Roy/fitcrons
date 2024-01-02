import React, { useState } from "react";

const Form = () => {
  const [heightValue, setHeightValue] = useState("");
  const [weightValue, setWeightValue] = useState("");
  const [bmiValue, setBmiValue] = useState("");
  const [bmiMessage, setBmiMessage] = useState("");

  const calculateBmi = (event) => {
    event.preventDefault();
    if (heightValue && weightValue) {
      const heightInMeters = Number(heightValue) / 100;
      const bmi = (Number(weightValue) / (heightInMeters * heightInMeters)).toFixed(2);
      setBmiValue(bmi);

      let message = "";
      if (Number(bmi) < 18.5) {
        message = "You are Underweight";
      } else if (Number(bmi) >= 18.5 && Number(bmi) < 25) {
        message = "You are Normal weight";
      } else if (Number(bmi) >= 25 && Number(bmi) < 30) {
        message = "You are Overweight";
      } else {
        message = "You are Obese";
      }
      setBmiMessage(message);
    } else {
      setBmiValue("");
      setBmiMessage("");
    }
  };

  return (
    <main className="w-full grid gap-6 pb-10 md:pb-0">
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="height" className="uppercase text-sm text-zinc-200 font-bold">
        Altura
        </label>
        <div className="w-full relative">
          <input
            type="number"
            placeholder="Introduce tu altura"
            className="w-full h-12 pl-4 pr-8 text-zinc-400 outline-none transition-all duration-200 focus:border-amber-500 border border-zinc-400 bg-transparent"
            value={heightValue}
            onChange={(event) => setHeightValue(event.target.value)}
          />
          <span className="absolute text-zinc-200 font-bold top-3 right-4">
            cm
          </span>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        <label htmlFor="weight" className="uppercase text-sm text-zinc-200 font-bold">
        Peso
        </label>
        <div className="w-full relative">
          <input
            type="number"
            placeholder="Introduce tu peso"
            className="w-full h-12 pl-4 pr-8 text-zinc-400 outline-none transition-all duration-200 focus:border-amber-500 border border-zinc-400 bg-transparent"
            value={weightValue}
            onChange={(event) => setWeightValue(event.target.value)}
          />
          <span className="absolute text-zinc-200 font-bold top-3 right-4">
            kg
          </span>
        </div>
      </div>

      <div className="w-full mt-4">
        <button
          onClick={calculateBmi}
          type="button"
          className="px-6 py-3 bg-gradient-to-r from-red-500 to-amber-500 text-zinc-200 text-sm uppercase font-semibold"
        >
          Calcular ahora
        </button>
      </div>

      {bmiValue && (
        <div className="w-full flex flex-col p-4 bg-zinc-700">
          <h2 className="text-zinc-200 text-lg">
          Su IMC es <span className="font-extrabold">{bmiValue}</span>
          </h2>
          <p className="text-amber-500">
            {bmiMessage}
          </p>
        </div>
      )}
    </main>
  );
};

export default Form;
