import React, { useState, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const AdminPrivateRoute = () => {
  const navigate = useNavigate();
  const [authentication, setAuthentication] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/checkingAuthenticated").then((res) => {
      console.log("++++", res.status);
      if (res.status === 200) {
        setAuthentication(true);
      }
      setLoading(false);
    });
  }, []);

  axios.interceptors.response.use(
    undefined,
    function axiosRetryInterceptors(err) {
      if (err.response && err.response.status == 401) {
        Swal.fire("Unauthorized", err.response.data.message, "warning");
        navigate("/");
      }

      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 403) {
        Swal.fire("Forbidden", error.response.data.message, "warning");
        navigate("/Page403");
      }
      if (error.response.status === 404) {
        Swal.fire("Page Not Found", "url/page not found", "warning");
        navigate("/Page404");
      }
      return Promise.reject(error);
    }
  );

  if (loading) {
    return <h1>Loading...</h1>;
  }

  console.log(authentication);
  return authentication ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminPrivateRoute;
