import React from "react";

import { Inputbox, Button } from "../";
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
          <Inputbox
            name="search"
            id="search"
            autoComplete="off"
            placeholder="Search Dots..."
          />
          <Button type="submit" className="search-btn" icon="search" />
        </form>
        <div className="header-right">
          <div className="header-notification fa fa-bell">05</div>
          <div className="header-profile">
            {false ? (
              <em className="fa fa-user-circle"></em>
            ) : (
              <img src={profileImg} alt="Mohamed Noohu" />
            )}
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
