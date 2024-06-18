import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


function RequireAuth({ allowedRoles }) {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  console.log(isLoggedIn);
  console.log(role == "USER");
  console.log(role === "ADMIN");
  console.log("log");

  return isLoggedIn && allowedRoles.find((myRole) => myRole == role) ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to="/denied" />
  ) : (
    <Navigate to="/login" />
  );
}

export default RequireAuth;
