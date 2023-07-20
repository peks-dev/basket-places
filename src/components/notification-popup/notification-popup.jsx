import React from "react";
import "./notification-popup.css";

const NotificationPopup = ({ message }) => {
  return (
    <div className="notification">
      <p className="notification__message">{message}</p>
    </div>
  );
};
export default NotificationPopup;
