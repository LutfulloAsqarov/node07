import React, { Fragment } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./page/home/Home";
import Login from "./page/login/Login";
import Register from "./page/register/Register";
import Auth from "./page/auth/Auth";

const App = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Auth />}>
          <Route index path="home" element={<Home />} />
        </Route>
      </Routes>
    </Fragment>
  );
};

export default App;
