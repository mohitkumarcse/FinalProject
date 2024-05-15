import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    axios.post(`logout`).then((res) => {
      console.log("&&&&&");
      if (res.data.statusCode === 200) {
        localStorage.removeItem("auth_name");
        localStorage.removeItem("auth_token");
        Swal.fire("Success", res.data.message, "success");
        navigate("/");
      }
    });
  };

  let AuthButton = "";

  if (!localStorage.getItem("auth_token")) {
    AuthButton = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/login">
            Login
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/register">
            Register
          </Link>
        </li>
      </ul>
    );
  } else {
    AuthButton = (
      <li className="nav-item">
        <button type="submit" onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </li>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark  bg-primary shadow sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="#">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="#">
                About
              </Link>
            </li>
            {AuthButton}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
