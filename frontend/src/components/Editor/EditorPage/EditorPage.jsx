import MyNavbar from "../EditorNav/EditorNav";
import Stats from "../Stats/Stats";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../EditorPage/EditorPage.css";

// Import assets
import ENav from "../EditorNav/EditorNav";

function EditorPage() {


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
    Race: [],
    Class: [],

  });

  return (
    <div className="editorpage-container">
      <h1>Editor Page</h1>
      <Stats />

      <div className="row" style={{ margin: "5%" }}></div>
      <ENav />
      <Outlet charinfo={charInfo} setCharInfo={setCharInfo} />
    </div>
  );
}

export default EditorPage;
