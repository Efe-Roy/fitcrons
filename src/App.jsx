import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/auth/login";
import ReactToPrint from "./pages/ReactToPrint";
import UserList from "./pages/auth/userlist";
import DetailPage from "./pages/DetailPage";

function App() {

  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<UserList />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/toprint/:id" element={<ReactToPrint />} />

        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;