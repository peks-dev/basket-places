import React, { useContext } from "react";
import "./user-profile.css";

// Contexto
import UserContext from "../../context/user/userContext";

// Components
import Title from "../../components/layout/title/title";
import Txt from "../../components/layout/text-body/text-body";
import ButtonLogout from "./components/button-logout";
import ButtonEditProfile from "./components/button-edit-profile";

const UserProfilePage = () => {
  const { user, userLogout } = useContext(UserContext);

  return (
    <div className="user-profile">
      <header className="user-profile__header">
        <img
          className="user-profile__avatar"
          src={user.avatar_url}
          alt="foto de perfil del usuario"
        />
        <Title
          text={user.name}
          style={"title--uppercase title--small"}
          tag={"h2"}
        />
        <a className="user-profile__link" href={user.website}>
          {user.website}
        </a>
        <Txt content={user.bio} />
      </header>
      <ul className="user-profile__btns-wrap">
        <li>
          <ButtonEditProfile />
        </li>
        <li>
          <ButtonLogout onClick={userLogout} />
        </li>
      </ul>
    </div>
  );
};

export default UserProfilePage;
