import React, { useState } from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [registerInput, setRegisterInput] = useState({
    fullname: "",
    email: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setRegisterInput({ ...registerInput, [e.target.name]: e.target.value });
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    // axios.get("/sanctum/csrf-cookie").then(() => {
    const data = {
      name: registerInput.fullname,
      email: registerInput.email,
      password: registerInput.password,
    };

    axios
      .post(`register`, data)
      .then((res) => {
        if (res.data.statusCode === 200) {
          localStorage.setItem("auth_token", res.data._Token);
          localStorage.setItem("auth_name", res.data.username);
          Swal.fire("Success", res.data.message, "success").then(() => {
            navigate("/");
          });
        } else {
          setRegisterInput({
            ...registerInput,
            error_list: res.data.validation_errors,
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // });
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>Register</h4>
              </div>
              <div className="card-body">
                <form onSubmit={registerSubmit}>
                  <div className="form-group mb-3">
                    <label>FullName</label>
                    <input
                      type="text"
                      name="fullname"
                      onChange={handleInput}
                      value={registerInput.fullname}
                      className="form-control"
                    />
                    <span>{registerInput.error_list.name}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                      type="text"
                      name="email"
                      onChange={handleInput}
                      value={registerInput.email}
                      className="form-control"
                    />
                    <span>{registerInput.error_list.email}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      onChange={handleInput}
                      value={registerInput.password}
                      className="form-control"
                    />
                    <span>{registerInput.error_list.password}</span>
                  </div>

                  <div className="form-group mb-3">
                    <button type="submit" className="btn btn-primary">
                      Sign up
                    </button>
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

export default Register;
