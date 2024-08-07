import { Navigate, Outlet } from "react-router-dom";

import React from "react";
import { useSelector } from "react-redux";

const Auth = () => {
  const token = useSelector((state) => state.auth.token);
  return token ? <Outlet /> : <Navigate replace to={"/login"} />;
};

export default Auth;
