import React, { useEffect, useState } from 'react'
import FormWe from '../components/tableComp/fomWe'
// import BGImg from '../assets/Banner.jpg'
import Layout from '../components/Layout'
import { Modal } from 'antd';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import NutritionFact from '../components/tableComp/NutritionFact';
import MemberData from '../components/tableComp/MemberData';
import API from '../redux/api';

const BGImg = '/static/general/Banner.jpg'
const MemberPage = () => {
    const userData = null
    const [memID, setMemID] = useState({})

    useEffect(() => {
      if (userData) {
        const userD = JSON.parse(userData);
        API.get(`/api/auth/me/${userD.user_id}/`)
        .then(res => {
        //   console.log(res.data)
        setMemID(res.data)
        calculateResults(res.data)
        })
        .catch(err => {
          console.log(err.request.response);
        });
      }
    }, [userData]);
    // console.log("memIDD", memID)

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
        <section className="body-font">
            <div className='container px-5 pb-24 mx-auto'>
                <div className="rounded-lg  h-64 overflow-hidden">
                    <img alt="content" className="object-cover object-center h-full w-full" src={BGImg} />
                </div>

                <MemberData memID={memID} />
                <NutritionFact memID={memID} results={results} />
                {memID.id && <FormWe memb_ID={memID.id} />}

            </div>
        </section>
    </Layout>
  )
}

export default MemberPage