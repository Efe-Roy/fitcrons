import React, { useEffect, useState } from 'react'
import AdminPage from './Admin'
import MemberPage from './Member';
import { useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../redux/features/authSlice';

const Dashboard = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const dispatch = useDispatch();

    const {state} = useLocation();
    let boolStatus = state? true : false
    // console.log({
    //   "boolStatus": boolStatus,
    //   "state": state
    // })

    const { user } = useSelector(state => state.auth);

    // useEffect(() => {
    //   setTimeout(() => {
    //     toast.success(state);
    //   }, 1000);
      
    // }, [boolStatus])


    useEffect(() => {
      if (user?.role === 'trainer') {
        setIsAdmin(true);
      }

      if (user?.user_id) {
        const currentTime = new Date().getTime();
        const expirationDate = new Date(user?.token_expires).getTime();
        if (currentTime > expirationDate) {
          dispatch(clearUser());
        } 

      } else{
        window.location.href = "/";
      }
    }, []);

    return (
    <div>
      {/* {JSON.stringify(user?.token_expires)} */}
        {isAdmin ? <AdminPage /> : <MemberPage />}
    </div>
  )
}

export default Dashboard