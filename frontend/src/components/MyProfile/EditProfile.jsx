/* eslint-disable react/prop-types */
import { useState } from "react";
import "./style/EditProfile.css";
import { useEffect } from "react";
import facade from "../../util/api.mjs";

function EditProfile({ user, updateUser }) {
  const [countries, setCountries] = useState([]);
  const [chosenCountry, setChosenCountry] = useState(null);

  useEffect(() => {
    facade.fetchData("countries", false).then((data) => {
      setCountries(data);
    });
  }, []);

  function save() {
    const username = document.getElementById("edit-username").value;
    const description = document.getElementById("edit-description").value;
    const country = chosenCountry;
    const newUser = {
      username: username === "" ? user.username : username,
      description: description === "" ? user.description : description,
    };

    updateUser(newUser, country);
  }

  return (
    <div className="container row edit-profile-box">
      <h1>Edit Profile</h1>
      <div>Username</div>
      <input type="text" id="edit-username" className="col-2" />
      <div>Country</div>
      <select
        id="edit-country"
        className="col-3"
        onChange={(event) => setChosenCountry(event.target.value)}
      >
        <option value="">Select Country</option>
        {countries?.map((country) => (
          <option key={country.cca2} value={country.cca2}>
            {country.name}
          </option>
        ))}
      </select>
      <div>Description</div>
      <textarea id="edit-description" />
      <button className="col-1 btn btn-primary" onClick={() => save()}>
        Save
      </button>
    </div>
  );
}

export default EditProfile;
