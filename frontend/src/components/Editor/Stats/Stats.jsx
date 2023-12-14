


function Stats() {
  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Name
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
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
            />
          </div>
        </div>
        <div className="col-md-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Red_Square.svg/2048px-Red_Square.svg.png"
            alt="character portrait"
            style={{ width: "10rem", height: "10rem" }}
          />
        </div>
      </div>

      <div className="row" style={{marginTop: "2%"}}>
        </div>

      <div className="row">
        <button type="btn btn-primary">Roll stats</button>
        <div className="col-md-2">
          <label htmlFor="str">Str</label>
        </div>

        <div className="col-md-2">
          <label htmlFor="dex">Dex</label>
        </div>

        <div className="col-md-2">
          <label htmlFor="con">Con</label>
        </div>

        <div className="col-md-2">
          <label htmlFor="wis">Wis</label>
        </div>

        <div className="col-md-2">
          <label htmlFor="int">Int</label>
        </div>

        <div className="col-md-2">
          <label htmlFor="char">Char</label>
        </div>
      </div>

      <div className="row">
        <div className="col-md-2">
          <input type="number" name="str" id="str" min="1" max="20" />
        </div>

        <div className="col-md-2">
          <input type="number" name="dex" id="dex" min="1" max="20" />
        </div>

        <div className="col-md-2">
          <input type="number" name="con" id="con" min="1" max="20" />
        </div>

        <div className="col-md-2">
          <input type="number" name="wis" id="wis" min="1" max="20" />
        </div>

        <div className="col-md-2">
          <input type="number" name="int" id="int" min="1" max="20" />
        </div>

        <div className="col-md-2">
          <input type="number" name="char" id="char" min="1" max="20" />
        </div>
      </div>
    </>
  );
}

export default Stats;
