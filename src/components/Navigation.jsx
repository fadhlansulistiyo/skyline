import React from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const Navigation = ({ authUser, signOut }) => {
  const { id, photo, name } = authUser;

  return (
    <header className="navigation">
      <div className="navigation__profile">
        <img className="navigation__photo" src={photo} alt={id} title={name} />
        <span className="navigation__name">{name}</span>
      </div>
      <nav className="navigation__menu">
        <Link to="/" className="navigation__link">
          Home
        </Link>
      </nav>
      <button type="button" className="navigation__logout" onClick={signOut}>
        <FaSignOutAlt style={{ marginRight: "8px" }} /> Sign out
      </button>
    </header>
  );
};

export default Navigation;
