import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../redux/features/authSlice';
import InactivityDetector from '../InactivityDetector ';
import Cookies from 'js-cookie';
import API from '../../redux/api';
import { FaBars } from "react-icons/fa";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        try {
            const res = API.post(`/api/auth/logout/`);
            console.log("xcx", res.data);
            Cookies.remove("userDataFit");
            navigate("/");
        } catch (error) {
          console.error("Not Authenticated")
        } 
      };

    const userDataCookie = Cookies.get("userDataFit");
    const user_id = userDataCookie ? JSON.parse(userDataCookie).user_id : null;
    const username = userDataCookie ? JSON.parse(userDataCookie).name : null;

    let [open,setOpen]=useState(false);
    
  return (
    <React.Fragment>
        <InactivityDetector onLogout={handleLogout} />

        <nav className="mx-auto max-w-7xl w-full px-5 pt-2 sm:px-8 md:px-14 lg:px-5 flex justify-between items-center">
            <Link to='/' className='text-white text-2xl font-black'>
                FITCRONS
            </Link>
            <div
                className={`duration-500 md:static absolute text-white md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto  w-full flex items-center px-5 00 ease-in ${open ? 'top-20 ':'top-[-490px]'}`}>
                <ul className="z-40 flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
                    {user_id? 
                        <li>
                            <Link to="/dashboard" className="hover:text-gray-500">Panel</Link>
                        </li> : <>
                        <li>
                            <a className="hover:text-gray-500" href="#">Acerca de</a>
                        </li>
                        <li>
                            <a className="hover:text-gray-500" href="#">Blogs</a>
                        </li>
                        <li>
                            <a className="hover:text-gray-500" href="#">Contacto</a>
                        </li>
                        </>
                    }
                </ul>

                <ul
                    className={`z-40
                    md:hidden bg-white text-black fixed w-full top-0 overflow-y-auto bottom-0 py-24 pl-4
                    duration-500 ${open ? "left-0" : "left-[-100%]"}
                    `}
                >
                    <li>
                        <a href="#" className="py-7 px-3 inline-block">
                        Home
                        </a>
                    </li>
                    <div className="py-5">
                        <Link to='/login'
                            className="px-5 py-2 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear
                                    after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-brightRedLight
                                    bg-brightRed border-transparent hover:border-brightRedLight hover:after:opacity-100 hover:after:scale-[2.5] min-w-max text-white"
                        >
                            <span className="relative z-[5]">
                            Acceso
                            </span>
                        </Link>
                    </div>
                </ul>
            </div>
            <div className="flex items-center gap-6">
                {user_id? 
                    <div className='flex uppercase'>
                        <span className='mr-5 text-white font-black'>{username}</span>
                        <button 
                            onClick={handleLogout}
                            className="hidden p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight md:block"
                        >Cerrar sesión</button> 
                    </div>
                    :
                    <Link to='/login'
                        className="px-5 py-2 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear
                                after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-brightRedLight
                                bg-brightRed border-transparent hover:border-brightRedLight hover:after:opacity-100 hover:after:scale-[2.5] min-w-max text-white"
                    >
                        <span className="relative z-[5]">
                        Acceso
                        </span>
                    </Link>
                }
                <button onClick={()=>setOpen(!open)} className="fixes text-brightRed z-50 text-3xl cursor-pointer md:hidden">
                <FaBars />
                </button>
            </div>
        </nav>
    </React.Fragment>
  )
}

export default Navbar