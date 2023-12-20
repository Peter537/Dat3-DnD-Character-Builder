/* eslint-disable react/prop-types */
import MyNavbar from "../EditorNav/EditorNav";
import Stats from "../Stats/Stats";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../EditorPage/EditorPage.css";

// Import assets
import ENav from "../EditorNav/EditorNav";

function EditorPage({charInfo, setCharInfo}) {
 

  return (
    <div className="editorpage-container">
      <h1 className="text-center">Editor Page</h1>
      <div className="row" style={{ margin: "3%" }}></div>
      <Stats charInfo={charInfo} setCharInfo={setCharInfo} />

      <div className="row" style={{ margin: "5%" }}></div>
      <ENav />
      <div>
      <Outlet/>
      </div>
    </div>
  );
}

export default EditorPage;
