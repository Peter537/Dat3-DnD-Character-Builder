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
                If you have forgotten your email, please contact an admin.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input type="password" className="form-control" id="password" />
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
