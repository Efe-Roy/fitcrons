import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/auth/login";
import Dashboard from "./pages/dashboard";
import ReactToPrint from "./pages/ReactToPrint";

function App() {

  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/toprint/:id" element={<ReactToPrint />} />

        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;