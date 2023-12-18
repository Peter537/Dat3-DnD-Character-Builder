/* eslint-disable react/prop-types */
import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom"; // Assuming you're using React Router for navigation
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../General/styles/General.css";
import AddClass from "./AddClass/AddClass";

function General({ charInfo, setCharInfo }) {
    const changeRace = (event) => {
      setCharInfo({
        ...charInfo,
        race: event.target.value,
      });
      console.log(charInfo.race);
    };
  
    const addClass = () => {
      setCharInfo({
        ...charInfo,
        classes: [...charInfo.classes, { name: '', level: '' }],
      });
    };
  
    const changeBackground = (event) => {
      setCharInfo({
        ...charInfo,
        background: event.target.value,
      });
      console.log(charInfo.background);
    };
  
    return (
      <>
        <div className="dropdown-area row">
          <div className="col-md-4">
            <label>
              Race
              <input list="races" onChange={changeRace} value={charInfo.race} />
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
              <input list="backgrounds" onChange={changeBackground} />
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
            
            {charInfo.classes.map((item, index) => (
              <AddClass
                key={index}
                charInfo={charInfo}
                setCharInfo={setCharInfo}
                index={index}
              />
            ))}
            
            <button type="button" onClick={addClass}>
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
              }}
            ></textarea>
          </div>
        </div>
      </>
    );
  }
  
  export default General;
