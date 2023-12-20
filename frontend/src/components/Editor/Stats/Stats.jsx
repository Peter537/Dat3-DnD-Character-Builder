/* eslint-disable react/prop-types */
import { useEffect } from "react";
import "../Stats/style/Stats.css";

function Stats({ charInfo, setCharInfo }) {
  const changeName = (event) => {
    setCharInfo({
      ...charInfo,
      name: event.target.value,
    });
  };

  const changeLevel = (event) => {
    setCharInfo({
      ...charInfo,
      level: event.target.value,
    });
  };

  const handleChange = (attribute, value) => {
    setCharInfo({
      ...charInfo,
      stats: {
        ...charInfo.stats,
        [attribute]: value,
      },
    });
  };


  useEffect(() => {
    console.log(charInfo);
  }, [charInfo]);

  return (
    <div className="stats-container">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-4 form-contain">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Name
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              aria-describedby="basic-addon1"
              onChange={changeName}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Lvl.</span>
            </div>
            <input
              type="number"
              className="form-control"
              aria-label="Amount (to the nearest dollar)"
              onChange={changeLevel}
            />
          </div>
        </div>
      </div>

      <div className="row stats-container">
        <button type="btn btn-primary">Roll stats</button>
        <div className="col-md-2">
          <label htmlFor="str">Str</label>
          <input type="number" name="str" id="str" min="1" max="20" onChange={(e) => handleChange("str", e.target.value)} />
        </div>

        <div className="col-md-2">
          <label htmlFor="dex">Dex</label>
          <input type="number" name="dex" id="dex" min="1" max="20" onChange={(e) => handleChange("dex", e.target.value)}/>
        </div>

        <div className="col-md-2">
          <label htmlFor="con">Con</label>
          <input type="number" name="con" id="con" min="1" max="20" onChange={(e) => handleChange("con", e.target.value)} />
        </div>

        <div className="col-md-2">
          <label htmlFor="wis">Wis</label>
          <input type="number" name="wis" id="wis" min="1" max="20" onChange={(e) => handleChange("wis", e.target.value)}/>
        </div>

        <div className="col-md-2">
          <label htmlFor="int">Int</label>
          <input type="number" name="int" id="int" min="1" max="20" onChange={(e) => handleChange("int", e.target.value)}/>
        </div>

        <div className="col-md-2">
          <label htmlFor="char">Char</label>
          <input type="number" name="char" id="char" min="1" max="20" onChange={(e) => handleChange("char", e.target.value)}/>
        </div>
      </div>

      <div>
        <label htmlFor="img">
          <img
            style={{ width: "40%", height: "40%" }}
            src="https://cdn.discordapp.com/attachments/259737881071976449/1185615190650261594/submit-new2-1439041881__1_.gif?ex=65904131&is=657dcc31&hm=408c6ca3b54375074ca070e6af4ef961e806a1d6f96da6d10a306212629ac975&"
            alt="placeholder"
          />
          <input id="img" type="file" hidden />
        </label>
      </div>
    </div>
  );
}

export default Stats;
