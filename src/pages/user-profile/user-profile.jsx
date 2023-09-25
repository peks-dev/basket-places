import React, { useState, useContext } from "react";
import "./user-profile.css";

// Context
import UserContext from "../../context/user/userContext";

// components
import UserInfo from "./components/user-info/user-info";
import UserCourts from "./components/user-courts/user-courts";
import Modal from "../../components/modal/modal";
import UserBtns from "./components/user-btns/user-btns";

const UserProfilePage = () => {
  const { user, userLogout } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  //  Modal functions
  const confirmLogOut = () => {
    userLogout();
    closeModal();
  };

  function handleEditProfile() {
    console.log("navega a edit profile");
  }

  const closeModal = () => {
    setContextModal(null);
    setShowModal(false);
  };

  return (
    <section className="user-profile-page">
      <UserBtns
        logoutFn={() => {
          setShowModal(true);
        }}
        editProfileFn={handleEditProfile}
      />
      <UserInfo userData={user} />
      <UserCourts />
      {showModal ? (
        <Modal
          title={"Cerrar sesion"}
          message={"¿Seguro que quieres realizar esta accion?"}
          onCancel={closeModal}
          onConfirm={confirmLogOut}
        />
      ) : null}
    </section>
  );
};

export default UserProfilePage;
