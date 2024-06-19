import React from "react";
import { useSelector } from "react-redux";
import { AUTH_STATE } from "../store/app/authSlice";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuth, isAdmin }) => {
  const { profile, auth } = useSelector((store) => store.auth);

  if (!profile || auth === AUTH_STATE.unauth) {
    return <Navigate to={"/login"} />;
  }

  if (isAuth) {
    return <Component />;
  }

  if (isAdmin && profile.role === "admin") {
    return <Component />;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default PrivateRoute;
