import React, { useContext, useState } from "react";
import "./user-info.css";

// Contexto
import UserContext from "../../../../context/user/userContext";

// Components
import Title from "../../../../components/layout/title/title";
import Txt from "../../../../components/layout/text-body/text-body";
import ButtonLogout from "./components/button-logout";
import ButtonEditProfile from "./components/button-edit-profile";
import Modal from "../../../../components/modal/modal";

const UserInfo = () => {
  const { user, userLogout } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  const handleLogOut = () => {
    userLogout();
    setShowModal(false);
  };
  return (
    <div className="user-info">
      <header className="user-info__header">
        <img
          className="user-info__avatar"
          src={user.avatar_url}
          alt="foto de perfil del usuario"
        />
        <Title
          text={user.apodo}
          style={"title--uppercase title--small"}
          tag={"h1"}
        />
        <a className="user-info__link" href={user.website}>
          {user.website}
        </a>
        <Txt content={user.bio} />
      </header>
      <ul className="user-info__btns-wrap">
        <li>
          <ButtonEditProfile />
        </li>
        <li>
          <ButtonLogout
            onClick={() => {
              setShowModal(true);
            }}
          />
        </li>
      </ul>
      {showModal && (
        <Modal
          title={"cerrar sesion"}
          message={"¿seguro quieres terminar con la session actual?"}
          onCancel={() => {
            setShowModal(false);
          }}
          onConfirm={handleLogOut}
        />
      )}
    </div>
  );
};

export default UserInfo;
