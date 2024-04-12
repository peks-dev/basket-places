import React, { useState } from "react";
//models
import { ConnectionError } from "@/models/errors.model";
// services
import { deleteUser } from "@/services/supabase/auth.service";
// context
import { useUserStore } from "@/context/userStore";
// components
import Button from "@/components/button/button";
import Modal from "@/components/modal/modal";
import AlertIcon from "@/components/icons/alert-icon";

const DeleteAccountButton = () => {
  const [showModal, setShowModal] = useState();
  const { profile, logout } = useUserStore();

  async function handleDeleteAcc() {
    try {
      deleteUser(profile.id);
      logout();
    } catch (error) {
      console.log(error);
    }
  }

  function handleModal() {
    setShowModal((prevState) => !prevState);
  }

  return (
    <>
      <Button variant={"secundary"} onClick={handleModal}>
        eliminar cuenta
      </Button>
      {showModal && (
        <Modal
          onConfirm={handleDeleteAcc}
          onCancel={handleModal}
          confirmBtnChild={"si, eliminar"}
        >
          <div className="modal__icon danger">
            <AlertIcon />
          </div>
          <h3 className="modal__title danger">!Cuidado!</h3>
          <p className="modal__text">
            ¿estas de acuerdo con eliminar tu cuenta?
            <br /> esto no podrá revertirse
          </p>
        </Modal>
      )}
    </>
  );
};

export default DeleteAccountButton;
