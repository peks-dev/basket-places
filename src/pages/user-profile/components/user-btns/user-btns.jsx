import React from "react";
import "./user-btns.css";

// components
import ButtonLogout from "./components/button-logout";
import ButtonEditProfile from "./components/button-edit-profile";

const UserBtns = ({ logoutFn, editProfileFn }) => {
  return (
    <ul className="user-btns-container">
      <li className="user-btns__item-wrap">
        <ButtonEditProfile onClick={editProfileFn} />
      </li>
      <li className="user-btns__item-wrap">
        <ButtonLogout onClick={logoutFn} />
      </li>
    </ul>
  );
};

export default UserBtns;
