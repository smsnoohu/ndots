import React from "react";

import { Button } from "../../../components";
import "./notifications.scss";

const Notifications = (props) => {
  const { notificaionsState, notificaionsActions } = props;
  const { notifications, noOfUnreadNotificaions } = notificaionsState;
  const { setNewsAsReaded, markAllRead } = notificaionsActions;
  return (
    <div className="notification-wrapper">
      {notifications.length && (
        <ul className="notification-list">
          {notifications
            .filter((news) => !news.isRead)
            .map((news) => (
              <li key={news.id} onClick={() => setNewsAsReaded(news.id)}>
                {news.message}
              </li>
            ))}
        </ul>
      )}
      {noOfUnreadNotificaions ? (
        <Button value="Mark all as read" onClick={markAllRead} />
      ) : (
        <p>No notification</p>
      )}
    </div>
  );
};

export default Notifications;
