import React, { useState } from "react";

// import assets
import "./style/login.css";
import { Outlet } from "react-router-dom";

function LoginRegister() {
  return (
    <>
      <div className="row" style={{ minWidth: "100vw" }}>
        <div className="col-auto">
          <div className="background-image container-fluid"></div>
        </div>
        <div className="col-sm-7" style={{ marginTop: "var(--header-height)" }}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default LoginRegister;
