/* eslint-disable react/prop-types */
import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom"; // Assuming you're using React Router for navigation
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../General/styles/General.css";

function General({ charInfo, setCharInfo}) {

  const changeRace = (event) => {

    setCharInfo({
      ...charInfo,
      race: event.target.value,
    });
    console.log(charInfo.race);
  };

  const addClass = (event) => {

    const newClassName = document.getElementById("classInput").value;


    setCharInfo({
      ...charInfo,
      class: [...charInfo.class,
    
    ],
    });
    console.log(charInfo.class);
  };




  return (
    <>
      <div className="dropdown-area row">
        <div className="col-md-4">
          <label>
            Race
            <input list="races" onChange={changeRace} value={charInfo.race}/>
          </label>
          <datalist id="races">
            <option value="Bard" />
            <option value="Joe" />
            <option value="Cleric" />
            <option value="Barbarian" />
          </datalist>

          <div style={{ margin: "5%" }}></div>

          <label>
            Background
            <input list="backgrounds" />
          </label>
          <datalist id="backgrounds">
            <option value="Background1" />
            <option value="Background2" />
            <option value="Background3" />
            <option value="Background4" />
          </datalist>
        </div>

        <div className="col-md-4">
          <h1 style={{ textDecoration: "underline" }}>Classes</h1>

          <button type="button" className="" onClick={addClass}>
            {" "}
            + Add Class
          </button>
        </div>

        <div className="col-md-4">
          <h2>Information</h2>
          <textarea
            style={{
              borderRadius: "5%",
              width: "60%",
              height: "100%",
            }}></textarea>
        </div>
      </div>
    </>
  );
}

export default General;
