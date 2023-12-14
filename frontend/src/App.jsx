// Base imports
import React, { useState } from "react";
import "./App.css";

// Component imports
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import EditorPage from "./components/Editor/EditorPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("token") || false
  );

  function login(bool) {
    setIsAuthenticated(bool);
    sessionStorage.setItem("token", bool);
  }

  function logout() {
    setIsAuthenticated(false);
    sessionStorage.removeItem("token");
  }

  document
    .getElementsByTagName("body")[0]
    .setAttribute(
      "data-bs-theme",
      sessionStorage.getItem("theme") || sessionStorage.setItem("theme", "dark")
    );

  return (
    <>
      <BrowserRouter>
        <header>
          <Header isAuthenticated={isAuthenticated} />
        </header>
        <div className="container">
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/login" element={<Login onLogin={login} />} />
            <Route path="*" element={<h1>404: Page not found</h1>} />
            <Route path="/editor" element={<EditorPage/>} />
          </Routes>
        </div>
        {/* <footer>
          <Footer />
        </footer> 
        Consider if needed or not
        */}
      </BrowserRouter>
    </>
  );
}

export default App;
