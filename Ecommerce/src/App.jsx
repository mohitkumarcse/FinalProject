import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminLayout from "./layouts/admin/AdminLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from "./components/frontend/auth/Login";
import Register from "./components/frontend/auth/Register";
import axios from "axios";
import AdminPrivateRoute from "./AdminPrivateRoute";
import Page403 from "./components/errors/Page403";
import Page404 from "./components/errors/Page404";
import "./App.css";
import PublicRoutes from "./PublicRoutes";
import FrontendLayout from "./layouts/frontend/FrontendLayout";

// Configuring default Axios settings
axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
// axios.defaults.headers.post["Content-Type"] = "application/json"; // Setting content type for POST requests
// axios.defaults.headers.post["Accept"] = "application/json"; // Setting accept header for POST requests
// axios.defaults.withCredentials = true; // Allowing sending cookies with cross-origin requests

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="*" element={<FrontendLayout />} />
        </Route>

        <Route path="/page403" element={<Page403 />} />
        <Route path="/page404" element={<Page404 />} />
        <Route
          path="/login"
          element={
            localStorage.getItem("auth_token") ? <Navigate to="/" /> : <Login />
          }
        />
        <Route
          path="/register"
          element={
            localStorage.getItem("auth_token") ? (
              <Navigate to="/" />
            ) : (
              <Register />
            )
          }
        />

        <Route exact path="/admin" element={<AdminPrivateRoute />}>
          <Route exact path="/admin/*" element={<AdminLayout />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
