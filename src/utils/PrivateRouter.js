import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRouter({ isAuth, children, redirectPath }) {
  return isAuth ? children : <Navigate to={redirectPath} replace />;
}

export default PrivateRouter;
