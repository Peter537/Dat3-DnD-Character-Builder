import React from "react";

function Login({ onLogin }) {
  return (
    <>
      <h1 onClick={() => onLogin(true)}>Login</h1>
    </>
  );
}

export default Login;
