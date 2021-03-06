import React from "react";

import { Inputbox, Button, Notifications } from "../";
import "./header.scss";
import logo from "../../assets/images/logo.png";
import profileImg from "../../assets/images/profile.png";
import { useEventState, useNotifications } from "../../hooks";
import { BREAKPOINT } from "../../constants/constants";

const Header = () => {
  const { eventState, eventActions } = useEventState();
  const { notificaionsState, notificaionsActions } = useNotifications();

  const { breakPoint, viewPort, isSearchOpen } = eventState;
  const { toggleSidebar, closeSidebar, toggleSearch } = eventActions;

  const {
    isNotificationsWrapperOpen,
    notificationsWrapper,
    noOfUnreadNotificaions,
  } = notificaionsState;
  const { toggleNotificationsWrapper } = notificaionsActions;

  if (!viewPort) return null;
  const { xs, sm, md, lg, xl } = viewPort;
  // console.log("isSearchOpen: ", isSearchOpen);
  return (
    <header>
      <div className="header">
        {xs && (
          <Button
            icon="ellipsis-v"
            className="menu-btn"
            onClick={toggleSidebar}
          />
        )}
        <div className="logo">
          <img src={logo} alt="nDots.io" />
        </div>
        {!xs && !sm && (
          <h1 title="Islamic Education">Islamic Education - {breakPoint}</h1>
        )}
        {(!xs || (xs && isSearchOpen)) && (
          <form className="search-container">
            {xs && (
              <Button
                icon="chevron-left"
                onClick={() => {
                  toggleSearch();
                  closeSidebar();
                }}
              />
            )}
            <Inputbox
              name="search"
              id="search"
              autoComplete="off"
              placeholder="Search Dots..."
            />
            <Button type="submit" className="search-btn" icon="search" />
          </form>
        )}
        <div className="header-right">
          {xs && (
            <Button
              icon="search"
              onClick={() => {
                toggleSearch();
                closeSidebar();
              }}
            />
          )}
          <div className="header-notification" ref={notificationsWrapper}>
            <Button
              icon="bell"
              value={noOfUnreadNotificaions}
              onClick={toggleNotificationsWrapper}
            />
            {isNotificationsWrapperOpen && (
              <Notifications
                notificaionsState={notificaionsState}
                notificaionsActions={notificaionsActions}
              />
            )}
          </div>
          <div className="header-profile">
            {false ? (
              <em className="fa fa-user-circle"></em>
            ) : (
              <img src={profileImg} alt="Mohamed Noohu" />
            )}
            {!xs && !sm && (
              <span role="button">
                Mohamed Noohu <em className="fa fa-chevron-down"></em>
              </span>
            )}
          </div>
        </div>
      </div>
      {(xs || sm) && <h1>Islamic Education - {breakPoint}</h1>}
    </header>
  );
};

export default Header;
