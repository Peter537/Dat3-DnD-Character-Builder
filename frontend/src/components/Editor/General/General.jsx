/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";// Assuming you're using React Router for navigation
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../General/styles/General.css";
import AddClass from "./AddClass/AddClass";
import facade from "../../../util/api.mjs";

function General({ charInfo, setCharInfo }) {

const [latestInfo, setLatestInfo] = useState({
  attribute: "",
  value: "Information regarding you latest choice will be shown here.",
});


  
const [raceNames, setRaceNames] = useState([]);

  const changeRace = (event) => {
    
    setCharInfo({
      ...charInfo,
      data: {
        ...charInfo.data,
        race: event.target.value,
      }
    });

    setLatestInfo({
      attribute: "race",
      value: event.target.value,
    });
  };

  const addClass = () => {
    setCharInfo({
      ...charInfo,
      data: {
        ...charInfo.data,
      classes: [...charInfo.data.classes, { name: "", level: "" }],
      }
    });
    
  };

  const changeBackground = (event) => {
    setCharInfo({
      ...charInfo,
      data: {
        ...charInfo.data,
      background: event.target.value,
      }
    });

    setLatestInfo({
      attribute: "Background",
      value: event.target.value,
    });

  };


  useEffect(() => {


    // let description = facade.fetchData("race/" + latestInfo.attribute, false);
    // setLatestInfo({
    //   ...latestInfo,
    // });


  }, [latestInfo]);

async function getRaceNames() {

  return await facade.fetchData("race/all", false)
}

// async function that uses getRaceNames API to retrieve all the race-names
// and then sets the state of raceNames to the data retrieved
useEffect (() => {

  getRaceNames().then(data => {
    setRaceNames(data)
  })

  

}, [])







  return (
    <>
      <div className="dropdown-area row">
        <div className="col-md-4">
          <label>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Race
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                list="races"
                value={charInfo.data.race}
                aria-describedby="basic-addon1"
                onChange={changeRace}
              />
            </div>

            <datalist id="races">
            {raceNames?.map((name, index) => (
          <option key={index} value={name}>
            {name}
          </option>
        ))}
            </datalist>
          </label>
          <div style={{ margin: "5%" }}></div>

          <label>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Background
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                list="backgrounds"
                aria-describedby="basic-addon1"
                onChange={changeBackground}
              />
            </div>

            <datalist id="backgrounds">
              <option value="Background1" />
              <option value="Background2" />
              <option value="Background3" />
              <option value="Background4" />
            </datalist>
          </label>
        </div>

        <div className="col-md-4">
          <h1 style={{ textDecoration: "underline" }}>Classes</h1>

          {charInfo.data.classes.map((item, index) => (
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
        
            }} disabled
            value={latestInfo.value}>
          </textarea>
        </div>
      </div>
    </>
  );
}

export default General;
