import React from "react";
import "./user-info.css";

// context

import { useUserStore } from "@/context/userStore";
// components
import UserOptions from "../user-options/user-options";

const UserInfo = () => {
  const { profile } = useUserStore();
  const defaultImgProfile = "/images/user-profile.svg";

  return (
    <header className="user-info">
      <picture className="user-info__avatar">
        <img
          src={profile.avatar_url ? profile.avatar_url : defaultImgProfile}
          alt="foto de perfil del usuario"
        />
      </picture>
      <div className="user-info__text-wrap">
        <p className="user-info__name">{profile.apodo}</p>
        <a className="user-info__link" href={profile.website}>
          {profile.website}
        </a>
      </div>
      <UserOptions />
    </header>
  );
};

export default UserInfo;
