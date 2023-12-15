import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleRegister(e) {
    e.preventDefault();

    // Check if email, username, password, and confirmPassword are not empty
    if (
      email.trim() === "" ||
      username.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      // Display an error message or handle the empty fields
      alert("Please fill out all fields.");
      return;
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      // Display an error message or handle the password mismatch
      alert("Passwords do not match.");
      return;
    }

    // TODO: Implement registration logic here
    window.location.replace("/L/Login");
  }

  return (
    <>
      <div className="row">
        <div className="col-auto ms-5 mt-5">
          <h1 className="mb-4">Register</h1>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div id="emailHelp" className="form-text">
                This email is what you will use to login to the system.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                aria-describedby="usernameHelp"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div id="usernameHelp" className="form-text">
                This username is what will be displayed to other users.
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline-danger"
              style={{ width: "100%" }}
              onClick={handleRegister}
            >
              Submit
            </button>
          </form>
          <Link id="login" className="form-text" to={"/L/Login"}>
            If you already have an account, please login here
          </Link>
        </div>
        <div className="col-auto"></div>
      </div>
    </>
  );
}

export default Register;
