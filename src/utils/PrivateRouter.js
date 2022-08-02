import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRouter({ isAuth, children, redirectPath }) {
  const token = localStorage.getItem("token");
  return isAuth || token ? children : <Navigate to={redirectPath} replace />;
}

export default PrivateRouter;
