import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/admin/AdminLayout"; // Importing AdminLayout component
import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap CSS
import Home from "./components/frontend/Home"; // Importing Home component
import Login from "./components/frontend/auth/Login"; // Importing Login component
import Register from "./components/frontend/auth/Register"; // Importing Register component
import axios from "axios"; // Importing Axios library
import { Navigate } from "react-router-dom";
import AdminPrivateRoute from "./AdminPrivateRoute";
// import AdminPrivateRoute from "./AdminPrivateRoute";
// import AdminRoutes from "./AdminRoutes";

// Configuring default Axios settings
// axios.defaults.baseURL = "http://127.0.0.1:8000/"; // Setting base URL for API requests
// axios.defaults.headers.post["Content-Type"] = "application/json"; // Setting content type for POST requests
// axios.defaults.headers.post["Accept"] = "application/json"; // Setting accept header for POST requests
// axios.defaults.withCredentials = true; // Allowing sending cookies with cross-origin requests

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

function App() {
  // const navigate = useNavigate();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
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

        {/* <Route path="/admin/*" element={<AdminLayout />} /> */}

        {/* <Route path="/admin/*" element={<AdminRoutes />} /> */}
        {/* <AdminPrivateRoute exact path="/" element={<AdminLayout />} /> */}
        <Route exact path="/admin" element={<AdminPrivateRoute />}>
          <Route exact path="/admin" element={<AdminLayout />} />
          <Route exact path="/admin/dashboard" element={<AdminLayout />} />
          <Route exact path="/admin/profile" element={<AdminLayout />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
