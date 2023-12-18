// AddClass.js

function AddClass({ charInfo, setCharInfo, index }) {
    const addClass = () => {
      const newClassName = document.getElementById(`className${index}`).value;
      const newClassLevel = document.getElementById(`classLevel${index}`).value;
  
      if (newClassName === "" || newClassLevel === "") {
        alert("Please fill out all fields.");
        return;
      } else if (newClassLevel < 1 || newClassLevel > 20) {
        alert("Please enter a valid level.");
        return;
      } else {
        const updatedClasses = charInfo.classes.map((item, i) =>
          i === index ? { name: newClassName, level: newClassLevel } : item
        );
  
        setCharInfo({
          ...charInfo,
          classes: updatedClasses,
        });
      }
    };
  
    const deleteClass = () => {
      const updatedClasses = charInfo.classes.filter((item, i) => i !== index);
  
      setCharInfo({
        ...charInfo,
        classes: updatedClasses,
      });
    };
  
    return (
      <>
        <div
          style={{
            backgroundColor: "grey",
            borderRadius: "5px",
            border: "beige solid 2px",
            justifyContent: "center",
          }}
          className="row"
        >
          <div className="col-md-5">
            <label htmlFor={`className${index}`}>Name</label>
            <input
              type="text"
              className="form-control"
              name={`className${index}`}
              id={`className${index}`}
            />
          </div>
          <div className="col-md-5">
            <label htmlFor={`classLevel${index}`}>Level</label>
            <input
              type="number"
              className="form-control"
              name={`classLevel${index}`}
              id={`classLevel${index}`}
              min="1"
              max="20"
            />
          </div>
          <div className="col-md-2">
            <button type="button" onClick={deleteClass}>
              Delete
            </button>
          </div>
        </div>
      </>
    );
  }
  
  export default AddClass;
  