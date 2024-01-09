import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../redux/features/authSlice';
import InactivityDetector from '../InactivityDetector ';
import Cookies from 'js-cookie';
import API from '../../redux/api';

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

    
  return (
    <React.Fragment>
        <InactivityDetector onLogout={handleLogout} />

        <nav className="relative container mx-auto p-6">
            <div className="flex items-center justify-between">
                <Link to='/' className="pt-2 text-white text-3xl font-extrabold">
                    FITCRONS
                </Link>
                <div className="hidden space-x-6 md:flex">
                    {user_id && 
                        <Link to="/dashboard" className="hover:text-darkGrayishBlue text-textLight">Panel</Link>
                    }
                    {/* <Link to="#" className="hover:text-darkGrayishBlue text-textLight">Comunidad</Link> */}
                </div>
                <div>

                {user_id? 
                    <div className='flex uppercase'>
                        <span className='mr-5 text-white font-black'>{username}</span>
                        <button 
                            onClick={handleLogout}
                            className="hidden p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight md:block"
                        >Cerrar sesión</button> 
                    </div>
                    :

                    <Link
                        to="/login"
                        className="hidden p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight md:block"
                    >Acceso</Link>
                }
                
                </div>
        
                {/* <!-- Hamburger Icon --> */}
                <button
                    id="menu-btn"
                    className="block hamburger md:hidden focus:outline-none"
                >
                    <span className="hamburger-top"></span>
                    <span className="hamburger-middle"></span>
                    <span className="hamburger-bottom"></span>
                </button>
            </div>
    
            {/* <!-- Mobile Menu --> */}
            <div className="md:hidden">
                <div
                    id="menu"
                    className="absolute flex-col items-center hidden self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md"
                >
                    <Link to="#">Pricing</Link>
                    <Link to="#">Product</Link>
                    <Link to="#">About Us</Link>
                    <Link to="#">Careers</Link>
                    <Link to="#">Community</Link>
                </div>
            </div>
        </nav>
    </React.Fragment>
  )
}

export default Navbar