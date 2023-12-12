import React from "react";

function Login() {
  return (
    <>
      <h1 onClick={sessionStorage.setItem("token", 1234)}>Login</h1>
    </>
  );
}

export default Login;
