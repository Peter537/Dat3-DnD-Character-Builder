import React from "react";

// import assets
import "./style/login.css";

function Login({ onLogin }) {
  return (
    <>
      <div className="row" style={{ minWidth: "100vw" }}>
        <div className="col-auto">
          <div className="background-image container-fluid"></div>
        </div>
        <div className="col-auto" style={{ marginTop: "5rem" }}>
          <div className="row">
            <div className="col-auto">
              <h1 onClick={() => onLogin(true)}>Login</h1>
            </div>
            <div className="col-auto"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
