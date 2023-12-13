/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./style/MyProfile.css";
import defaultProfilePicture from "./assets/default-profile-picture.png";
import EditProfile from "../../components/MyProfile/EditProfile";

function MyProfile() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [flag, setFlag] = useState(null);

  useEffect(() => {
    const user = {
      username: "Username",
      description:
        "heeey dudes and dudettes jeg vil gerne have at i alle sammen skal vide at jeg er en mega sej fy rder kan lide at spille comput er spil og øhh ja det var det jeg ville sige, men lige til sidst ville jeg også sige at ",
      createdOn: 1702402893889,
      country: "dk",
    };
    sessionStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    retrieveFlag(user);
    if (user === undefined || user === null) {
      window.location.replace("/");
      return;
    }
  }, []);

  function memberSince() {
    const date = new Date(user?.createdOn);
    const today = new Date();
    const time = (today - date) / 1000;
    console.log(time);
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

  function retrieveFlag(user) {
    let country = user?.country ? user.country : "dk"; // TODO: shouldn't be a default value
    setFlag({ svg: "", name: "" });
    fetch("https://restcountries.com/v3.1/alpha/" + country)
      .then((res) => res.json())
      .then((data) => {
        const flag = {
          svg: data[0].flags.svg,
          name: data[0].name.common,
        };
        setFlag(flag);
      });
  }

  function updateUser(newUser) {
    setUser(newUser);
    sessionStorage.setItem("user", JSON.stringify(newUser));
    if (newUser.country !== user.country) {
      retrieveFlag(newUser);
    }
    setIsEditProfile(false);
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
            <div className="userinformation-username">{user?.username}</div>
            <div>Member for {memberSince()}</div>
            {flag && (
              <div>
                <img
                  id="country-flag"
                  src={flag.svg}
                  style={{ marginRight: "5px" }}
                ></img>
                {flag.name}
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
  );
}

export default MyProfile;
