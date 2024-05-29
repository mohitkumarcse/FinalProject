import React, { useState } from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
  };

  const loginSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };

    axios
      .post(`login`, data)
      .then((res) => {
        if (res.data.statusCode === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          Swal.fire("Success", res.data.message, "success");
          if (res.data.username === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/");
          }
        } else if (res.data.statusCode === 401) {
          Swal.fire("Error", res.data.message, "error");
        } else {
          setLoginInput({
            ...loginInput,
            error_list: res.data.validation_errors,
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="contaner py-5">
        <div className="row  justify-content-center ">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h1>Login</h1>
              </div>
              <div className="card-body">
                <form onSubmit={loginSubmit}>
                  <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                      type="text"
                      name="email"
                      value={loginInput.email}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span>{loginInput.error_list.email}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Password</label>
                    <input
                      type="text"
                      name="password"
                      value={loginInput.password}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span>{loginInput.error_list.password}</span>
                  </div>

                  <div className="form-group mb-3">
                    <button className="btn btn-primary">Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
