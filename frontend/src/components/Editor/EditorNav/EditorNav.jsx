import React from "react";
import {NavLink } from "react-router-dom"; // Assuming you're using React Router for navigation
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const ENav = () => {

  return (
    <NavLink to="general">General</NavLink> | <NavLink to="feats">Feats</NavLink> | <NavLink to="spells">Spells</NavLink>
  );
};

export default ENav;
