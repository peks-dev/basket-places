import React from "react";
import "./user-info.css";

// Components
import Title from "../../../../components/layout/title/title";
import Txt from "../../../../components/layout/text-body/text-body";

const UserInfo = ({ userData }) => {
  return (
    <div className="user-info">
      <header className="user-info__header">
        <img
          className="user-info__avatar"
          src={userData.avatar_url}
          alt="foto de perfil del usuario"
        />
        <Title
          text={userData.apodo}
          style={"title--uppercase title--small"}
          tag={"h1"}
        />
        <a className="user-info__link" href={userData.website}>
          {userData.website}
        </a>
        <Txt content={userData.bio} />
      </header>
    </div>
  );
};

export default UserInfo;
