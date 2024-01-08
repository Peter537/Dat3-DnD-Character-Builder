/* eslint-disable react/prop-types */
import { useEffect } from "react";
import "../Stats/style/Stats.css";

function Stats({ charInfo, setCharInfo }) {
  const changeName = (event) => {
    setCharInfo({
      ...charInfo,
      data : {
        ...charInfo.data,
      name: event.target.value,
      }
    });
  };

  const changeLevel = (event) => {
    setCharInfo({
      ...charInfo,
      data : {
        ...charInfo.data,
      level: event.target.value,
      }
    });
  };

  const handleChange = (attribute, value) => {
    setCharInfo({
      ...charInfo,
      data: {
        ...charInfo.data,
      stats: {
        ...charInfo.data.stats,
        [attribute]: value,
      }
      },
    });
  };


  useEffect(() => {
    console.log(charInfo.data);
  }, [charInfo]);



  function previewImage() {
    var fileInput = document.getElementById('file-input');
    var imagePreview = document.getElementById('image-preview');

    // Check if a file is selected
    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            // Set the source of the image to the selected file
            imagePreview.innerHTML = '<img src="' + e.target.result + '" alt="Image Preview" />';
        };

        // Read the selected file as a Data URL
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        // Display a placeholder image if no file is selected
        imagePreview.innerHTML = '<img src="placeholder.jpg" alt="Placeholder Image" />';
    }
}



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
          <input className="form-control" type="number" name="str" id="str" min="1" max="20" onChange={(e) => handleChange("str", e.target.value)} />
        </div>

        <div className="col-md-2">
          <label htmlFor="dex">Dex</label>
          <input className="form-control" type="number" name="dex" id="dex" min="1" max="20" onChange={(e) => handleChange("dex", e.target.value)}/>
        </div>

        <div className="col-md-2">
          <label htmlFor="con">Con</label>
          <input className="form-control" type="number" name="con" id="con" min="1" max="20" onChange={(e) => handleChange("con", e.target.value)} />
        </div>

        <div className="col-md-2">
          <label htmlFor="wis">Wis</label>
          <input className="form-control" type="number" name="wis" id="wis" min="1" max="20" onChange={(e) => handleChange("wis", e.target.value)}/>
        </div>

        <div className="col-md-2">
          <label htmlFor="int">Int</label>
          <input className="form-control" type="number" name="int" id="int" min="1" max="20" onChange={(e) => handleChange("int", e.target.value)}/>
        </div>

        <div className="col-md-2">
          <label htmlFor="char">Char</label>
          <input className="form-control" type="number" name="char" id="char" min="1" max="20" onChange={(e) => handleChange("char", e.target.value)}/>
        </div>
      </div>

<div style={{margin: "1%"}}></div>
      <div>
    <label htmlFor="file-input">
        <input type="file" id="file-input" accept="image/*" onChange={previewImage} hidden/>
        <div id="image-preview">
            <img src="https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg" alt="Placeholder Image" />
        </div>
    </label>
</div>

    </div>
  );
}

export default Stats;
