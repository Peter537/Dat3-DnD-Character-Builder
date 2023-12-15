// Base imports
import React, { useEffect, useState } from "react";
import "./App.css";

// Component imports
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Header from "./components/Header/Header";
import MyProfile from "./pages/MyProfile/MyProfile";
import Footer from "./components/Footer/Footer";
import LoginRegister from "./pages/Login/LoginRegister";
import Register from "./pages/Login/Register";
import CharactersPage from "./pages/CharactersPage/CharactersPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("token") || false
  );

  useEffect(() => {
    if (localStorage.getItem("token")) {
      sessionStorage.setItem("token", true);
      setIsAuthenticated(true);
    }
  }, []);

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
            <Route path="/l" element={<LoginRegister />}>
              <Route path="login" element={<Login onLogin={login} />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/characters" element={<CharactersPage />} />
            <Route path="*" element={<h1>404: Page not found</h1>} />
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
