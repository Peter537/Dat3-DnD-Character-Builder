import React from "react";
import { Link } from "react-router-dom";

import "./style/Header.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import logo from "./assets/logo.png";

function Header() {
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      style={{ maxHeight: "5rem" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="logo" className="logo" />
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
          <div className="navbar-nav">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/features">
              Features
            </Link>
            <Link className="nav-link" to="/pricing">
              Pricing
            </Link>
            <a className="nav-link disabled" aria-disabled="true">
              Disabled
            </a>
          </div>
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to="/login">
              Login / Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
