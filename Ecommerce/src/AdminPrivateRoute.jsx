import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const AdminPrivateRoute = () => {
  const [authentication, setAuthentication] = useState(false);
  const [loading, setLoadning] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/checkingAuthenticated")
      .then((res) => {
        if (res.status === 200) {
          setAuthentication(true);
        }
        setLoadning(fasle);
      })

      .catch((error) => {
        console.error("Error checking authentication:", error);
        setLoadning(false);
      });
    return () => {
      setAuthentication(false);
    };
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  console.log(authentication);
  return authentication ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminPrivateRoute;
