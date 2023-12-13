import React, { useState } from "react";

// import assets
import "./style/login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
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

    e.preventDefault();
    onLogin();
  }

  return (
    <>
      <div className="row" style={{ minWidth: "100vw" }}>
        <div className="col-auto">
          <div className="background-image container-fluid"></div>
        </div>
        <div className="col-auto" style={{ marginTop: "5rem" }}>
          <div className="row">
            <div className="col-auto">
              <h1>Login</h1>
              <form>
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
                  className="btn btn-primary"
                  onClick={handleLogin}
                >
                  Submit
                </button>
              </form>
            </div>
            <div className="col-auto"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
