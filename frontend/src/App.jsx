// Base imports
import React from "react";
import "./App.css";

// Component imports
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Header from "./components/Header/Header";

function App() {
  document
    .getElementsByTagName("body")[0]
    .setAttribute(
      "data-bs-theme",
      sessionStorage.getItem("theme") || sessionStorage.setItem("theme", "dark")
    );

  return (
    <>
      <BrowserRouter>
        <Header /> {/* TODO: Consider making auth a lifted state */}
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h1>404: Page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
