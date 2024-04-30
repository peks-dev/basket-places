import React from "react";
import "./user-avatar.css";
const defaultImgProfile = "/images/user-profile.svg";

const UserAvatar = ({ imgUrl, variant }) => {
  return (
    <picture className="user-avatar" data-variant={variant}>
      <img src={imgUrl ? imgUrl : defaultImgProfile} alt="imagen de usuario" />
    </picture>
  );
};

export default UserAvatar;
