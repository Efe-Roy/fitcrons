import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../redux/features/authSlice';
// import logo from '../img/logo.png'
// import axios from 'axios';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        // console.log("logout")
        dispatch(clearUser());
        navigate('/')
        
        
        // axios.post(`http://127.0.0.1:8000/api/auth/logout/`)
        // .then(res => {
        //   console.log(res.data)
        // })
        // .catch(err => {
        //   console.log(err.request.response);
        // });
    };

    const { user } = useSelector(state => state.auth);
    
  return (
    <React.Fragment>
        <nav className="relative container mx-auto p-6">
            <div className="flex items-center justify-between">
                <Link to='/' className="pt-2 text-white text-3xl font-extrabold">
                    FITCRONS
                </Link>
                <div className="hidden space-x-6 md:flex">
                    {user?.user_id && 
                        <Link to="/dashboard" className="hover:text-darkGrayishBlue text-textLight">Panel</Link>
                    }
                    <Link to="#" className="hover:text-darkGrayishBlue text-textLight">Comunidad</Link>
                </div>
                <div>

                {user?.user_id? 
                    <button 
                        onClick={handleLogout}
                        className="hidden p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight md:block"
                    >Cerrar sesión</button> :

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