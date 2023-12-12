/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./style/MyProfile.css";
import defaultProfilePicture from "./assets/default-profile-picture.png";
import EditProfile from "../../components/MyProfile/EditProfile";

function MyProfile() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [isEditProfile, setIsEditProfile] = useState(false);

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

  function editProfileButton(event) {
    event.preventDefault();
    setIsEditProfile(!isEditProfile);
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
            <div>Member for {memberSince()}</div>
            <div>Last active {lastActive()}</div>
          </div>
        </div>
        <div className="col-3 userinformation-buttons">
          <button className="btn btn-primary" onClick={editProfileButton}>
            Edit Profile
          </button>
        </div>
      </div>
      <div className="col-12 userinformation-description">
        {user?.description} (Om mig)
      </div>
      {isEditProfile && (
        <div>
          <EditProfile user={user} setUser={setUser} />
        </div>
      )}
    </div>
  );
}

export default MyProfile;
