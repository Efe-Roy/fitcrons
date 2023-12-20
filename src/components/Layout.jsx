import React from "react";
import Navbar from "./organs/Navbar";
import Footer from "./organs/Footer";
import { ToastContainer, toast } from "react-toastify";

const Layout = ({children}) => {

  return (
    <div className="">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <Navbar />

      {children}
      
      <Footer />
    </div>
  );
};

export default Layout;
