import React, { useState } from "react";

// import assets
import "./style/login.css";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Please fill out all fields.");
      return;
    }
    // TODO: add login logic

    const login = "Yes";
    if (document.getElementById("keepLoggedIn").checked) {
      localStorage.setItem("token", login);
    }
    sessionStorage.setItem("token", login);

    onLogin();
  }

  return (
    <>
      <div className="row">
        <div className="col-auto ms-5 mt-5">
          <h1 className="mb-4">Login</h1>
          <form className="p-2 border rounded border-opacity-25 border-secondary">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div id="emailHelp" className="form-text">
                If you have forgotten your email, please contact an admin.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="keepLoggedIn"
              />
              <label className="form-check-label" htmlFor="keepLoggedIn">
                Keep me logged in
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-outline-danger"
              style={{ width: "100%" }}
              onClick={handleLogin}
            >
              Submit
            </button>
          </form>
          <Link id="register" className="form-text" to={"/L/Register"}>
            If you don't have an account, please register here
          </Link>
        </div>
        <div className="col-auto"></div>
      </div>
    </>
  );
}

export default Login;
