// Import packages
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Import assets
import "./style/Header.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import logoWhite from "./assets/logo-white.png";

function Header({ isAuthenticated }) {
  const [theme, setTheme] = useState(sessionStorage.getItem("theme"));
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      style={{ maxHeight: "5rem" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logoWhite} alt="logo" className="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          {/* Add locked by login pages here */}
          {isAuthenticated ? (
            <>
              <div className="navbar-nav">
                <div className="navbar-nav nav-item">
                  <Link className="nav-link navbar-brand text-light" to="/">
                    Home
                  </Link>
                </div>
              </div>
              <div className="navbar-nav ms-auto">
                <Link
                  className="nav-link navbar-brand text-light"
                  to="/MyProfile"
                >
                  <span className="p-2 border rounded-3 border-light">
                    My Profile
                  </span>
                </Link>
              </div>
            </>
          ) : (
            <div className="navbar-nav ms-auto">
              <Link className="nav-link navbar-brand text-light" to="/L/Login">
                <span className="me-2">Login</span>
                <span className="p-2 border rounded-3 border-light">
                  Register
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
