import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom"; // Assuming you're using React Router for navigation
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const ENav = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg justify-content-center">
        <ul className="navbar-nav">
          <li className={`nav-item`}>
            <NavLink className="nav-link" to="general">
            <h3>General</h3>
            </NavLink>
          </li>
          <li className={`nav-item`}>
            {/* TODO: ADD NAVCOLORS TO CSS? */}
            <NavLink className="nav-link" to="features">
              <h3>Features</h3>
            </NavLink>
          </li>
          <li className={`nav-item`}>
            <NavLink className="nav-link" to="spells">
            <h3>Spells</h3>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default ENav;
