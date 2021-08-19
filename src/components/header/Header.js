import React from "react";

import "./header.scss";
import logo from "../../assets/images/logo.png";
import profileImg from "../../assets/images/profile.png";

const Header = () => {
  return (
    <header>
      <div className="header">
        <div className="logo">
          <img src={logo} alt="nDots.io" />
        </div>
        <form className="search-container">
          <input
            type="text"
            name="search"
            id="search"
            className="form-control"
            autoComplete="off"
            placeholder="Search Dots..."
          />
          <button type="submit" className="btn search-btn fa fa-search" />
        </form>
        <div className="header-right">
          <div className="header-notification fa fa-bell">05</div>
          <div className="header-profile">
            <img src={profileImg} alt="Mohamed Noohu" />
            <span role="button">
              Mohamed Noohu <em className="fa fa-chevron-down"></em>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
