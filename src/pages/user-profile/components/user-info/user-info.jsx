import React, { useContext } from "react";
import "./user-info.css";

// context
import UserContext from "@/context/user/userContext";
// components
import UserOptions from "../user-options/user-options";

const UserInfo = () => {
  const { user } = useContext(UserContext);

  return (
    <header className="user-info">
      <picture className="user-info__avatar">
        <img src={user.avatar_url} alt="foto de perfil del usuario" />
      </picture>
      <div className="user-info__text-wrap">
        <p className="user-info__name">{user.apodo}</p>
        <a className="user-info__link" href={user.website}>
          {user.website}
        </a>
      </div>
      <UserOptions />
    </header>
  );
};

export default UserInfo;
