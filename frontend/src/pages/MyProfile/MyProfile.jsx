import React, { useEffect, useState } from "react";
import "./style/MyProfile.css";
import defaultProfilePicture from "./assets/default-profile-picture.png";

function MyProfile() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

  useEffect(() => {
    if (user === undefined || user === null) {
      // window.location.replace("/");
      return;
    }
  }, [user]);

  function memberSince() {
    return formatTime();
  }

  function lastActive() {
    return formatTime();
  }

  function formatTime(time) {
    return "0 days";
  }

  return (
    <div className="container row">
      <div className="col-12">
        <h1>{user?.username}'s Profile</h1>
      </div>
      <div id="profile-line" className="col-12"></div>
      <div className="col-12 row">
        <div className="col-2">
          <img
            id="profile-picture"
            src={defaultProfilePicture}
            alt="logo"
          ></img>
        </div>
        <div className="col-7">
          <div className="row userinformation">
            <div className="userinformation-username">
              {user?.username} (Username)
            </div>
            <div>Member for {memberSince}</div>
            <div>Last active {lastActive}</div>
          </div>
        </div>
        <div className="col-3 userinformation-buttons">
          <button>Edit Profile</button>
        </div>
      </div>
      <div className="col-12"></div>
    </div>
  );
}

export default MyProfile;
