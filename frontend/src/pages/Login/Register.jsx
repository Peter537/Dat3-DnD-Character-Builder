import React from "react";

function Register() {
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
              />
              <div id="usernameHelp" className="form-text">
                This username is what will be displayed to other users.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input type="password" className="form-control" id="password" />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline-danger"
              style={{ width: "100%" }}
            >
              Submit
            </button>
          </form>
        </div>
        <div className="col-auto"></div>
      </div>
    </>
  );
}

export default Register;
