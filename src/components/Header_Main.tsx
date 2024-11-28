import React from "react";
import "./components_styles/Header.css";

const Header_Main = () => {
  return (
    <nav className="header">
      <div className="header__icons">
        <a href="/">
          <img
            className="header__logo"
            src="https://static.vecteezy.com/system/resources/previews/048/229/390/non_2x/sport-logo-design-free-vector.jpg"
            alt="header_logo"
          />
        </a>

        <a href="/create-player">
          <h3>Create Player</h3>
        </a>
        <a href="/create-team">
          <h3>Create Team</h3>
        </a>
        <a href="/player">
          <h3> Players</h3>
        </a>
      </div>
    </nav>
  );
};

export default Header_Main;
