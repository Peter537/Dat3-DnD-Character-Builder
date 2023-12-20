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
import EditorPage from "./components/Editor/EditorPage/EditorPage";
import General from "./components/Editor/General/General";
import Features from "./components/Editor/Features/Features";
import CharactersPage from "./pages/CharactersPage/CharactersPage";

function App() {
  //#region Login methods
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("token") || false
  );

  useEffect(() => {
    if (localStorage.getItem("token")) {
      sessionStorage.setItem("token", true);
      setIsAuthenticated(true);
    }
  }, []);

  function login(token) {
    setIsAuthenticated(token !== null);
    sessionStorage.setItem("token", token);
  }

  function logout() {
    setIsAuthenticated(false);
    sessionStorage.removeItem("token");
  }

  //#endregion

  document
    .getElementsByTagName("body")[0]
    .setAttribute(
      "data-bs-theme",
      sessionStorage.getItem("theme") || sessionStorage.setItem("theme", "dark")
    );

  const [charInfo, setCharInfo] = useState({
    name: "",
    level: 0,
    stats: {
      str: 0,
      dex: 0,
      con: 0,
      int: 0,
      wis: 0,
      cha: 0,
    },
    race: "",
    background: {
      name: "",
      features: [],
      skills: [],
      toolprof: [],
      langprof: [],
    },
    classes: [],
  });

  return (
    <>
      <BrowserRouter>
        <header>
          <Header isAuthenticated={isAuthenticated} logout={logout} />
        </header>
        <div>
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/l" element={<LoginRegister />}>
              <Route
                path="login"
                element={<Login onLogin={(token) => login(token)} />}
              />
              <Route path="register" element={<Register />} />
            </Route>
            <Route path="/profile" element={<MyProfile />} />
            <Route
              path="/editor"
              element={
                <EditorPage charInfo={charInfo} setCharInfo={setCharInfo} />
              }
            >
              <Route
                path="general"
                element={
                  <General charInfo={charInfo} setCharInfo={setCharInfo} />
                }
              />
              <Route
                path="features"
                element={
                  <Features charInfo={charInfo} setCharInfo={setCharInfo} />
                }
              />
              <Route path="spells" element={<h1>spellspage</h1>} />
            </Route>
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
