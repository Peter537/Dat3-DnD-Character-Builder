import MyNavbar from "../EditorNav/EditorNav";
import Stats from "../Stats/Stats";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../EditorPage/EditorPage.css";

// Import assets
import ENav from "../EditorNav/EditorNav";

function EditorPage() {
 

  return (
    <div className="editorpage-container">
      <h1>Editor Page</h1>
      <Stats />

      <div className="row" style={{ margin: "5%" }}></div>
      <ENav />
      <div className="editorpage-tab">
      <Outlet/>
      </div>
    </div>
  );
}

export default EditorPage;
