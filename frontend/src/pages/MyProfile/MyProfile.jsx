/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./style/MyProfile.css";
import defaultProfilePicture from "./assets/default-profile-picture.png";
import EditProfile from "../../components/MyProfile/EditProfile";
import facade from "../../util/api.mjs";

function MyProfile() {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [isEditProfile, setIsEditProfile] = useState(false);

  useEffect(() => {
    let jwt = sessionStorage.getItem("token");
    if (jwt === undefined || jwt === null) {
      window.location.replace("/");
      return;
    }

    const encodedPayload = jwt.split(".")[1];
    const payload = atob(encodedPayload);
    const decodedPayload = JSON.parse(payload);
    let payloadUserId = decodedPayload.userId;
    if (payloadUserId === undefined || payloadUserId === null) {
      window.location.replace("/");
      return;
    }

    setUserId(payloadUserId);
    let userPromise = facade.fetchData("users/" + payloadUserId, false);
    userPromise.then((data) => {
      let userData = data;
      setUser(userData);
      if (userData === undefined || userData === null) {
        window.location.replace("/");
        return;
      }
    });
  }, [userId]);

  function memberSince() {
    const date = new Date(user?.createdAt);
    const today = new Date();
    const time = (today - date) / 1000;
    return formatTime(time);
  }

  function formatTime(time) {
    const days = Math.floor(time / 86400);
    const hours = Math.floor((time % 86400) / 3600);
    const minutes = Math.floor(((time % 86400) % 3600) / 60);
    const seconds = Math.floor(((time % 86400) % 3600) % 60);
    let result = [];
    if (days > 0) {
      result.push(days + " days");
    }
    if (hours > 0) {
      result.push(hours + " hours");
    }
    if (minutes > 0) {
      result.push(minutes + " minutes");
    }
    if (seconds > 0) {
      result.push(seconds + " seconds");
    }

    if (result.length === 1) return result[0];
    return result[0] + " and " + result[1];
  }

  async function updateUser(newUser, country) {
    const updateUser = { ...user, ...newUser };
    if (country && country !== user.countryCode) {
      const searchCountry = await facade.fetchData(
        "countries/cca2/" + country,
        false
      );
      updateUser.countryCode = searchCountry.cca2;
      updateUser.countryName = searchCountry.name;
      updateUser.countryFlag = searchCountry.svg;
    }
    facade.updateUser(userId, updateUser).then((data) => {
      const updatedUser = data;
      setUser(updatedUser);
      setIsEditProfile(false);
    });
  }

  function editProfileButton(event) {
    event.preventDefault();
    setIsEditProfile(!isEditProfile);
  }

  return (
    <div className="container profile-container row">
      <div className="col-2"></div>
      <div className="col-8">
        <div className="col-12">
          <h1>{user?.username}'s Profile</h1>
        </div>
        <div id="profile-line" className="col-12"></div>
        <div className="col-12 row">
          <div className="col-1">
            <img
              id="profile-picture"
              src={defaultProfilePicture}
              alt="logo"
            ></img>
          </div>
          <div className="col-8">
            <div className="row userinformation">
              <div className="userinformation-username">{user?.username}</div>
              <div>Member for {memberSince()}</div>
              {user?.countryFlag && (
                <div>
                  <img
                    id="country-flag"
                    src={user.countryFlag}
                    style={{ marginRight: "5px" }}
                  ></img>
                  {user.countryName}
                </div>
              )}
            </div>
          </div>
          <div className="col-3 userinformation-buttons">
            <button className="btn btn-primary" onClick={editProfileButton}>
              Edit Profile
            </button>
          </div>
        </div>
        <div className="col-12 userinformation-description">
          {user?.description}
        </div>
        {isEditProfile && (
          <div>
            <EditProfile user={user} updateUser={updateUser} />
          </div>
        )}
      </div>
      <div className="col-2"></div>
    </div>
  );
}

export default MyProfile;
