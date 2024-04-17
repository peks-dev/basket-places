import React, { useState } from "react";
// context
import { useUserStore } from "@/context/userStore.js";
// components
import Button from "@/components/button/button";
import Modal from "@/components/modal/modal";
import LoaderBtn from "@/components/loader-btn/loader-btn";
// hooks
import { useDeleteCourt } from "@/hooks/use-delete-court.hook";

const DeleteCourtButton = ({ courtData }) => {
  const [showModal, setShowModal] = useState(false);
  const { loading, error, deleteCourtById } = useDeleteCourt();
  const { profile } = useUserStore();

  function handleModal() {
    setShowModal((prevState) => !prevState);
  }

  async function handleDeleteCourt() {
    await deleteCourtById(profile.id, courtData.id, courtData.images);
  }

  return (
    <>
      <Button
        onClick={handleModal}
        variant={"delete"}
        customStyle={"court-card-btn"}
      >
        eliminar
      </Button>
      {showModal ? (
        <Modal
          onConfirm={handleDeleteCourt}
          confirmBtnChild={loading ? <LoaderBtn /> : "si, eliminar"}
          onCancel={handleModal}
        >
          <h3 className="modal__title">eliminar cancha?</h3>
          <p className="modal__text">
            ten en cuenta que es una accion que no se podra revertir
          </p>
          {error ? (
            <div>
              <p>hubo un error al eliminar la cancha</p>
            </div>
          ) : null}
        </Modal>
      ) : null}
    </>
  );
};

export default DeleteCourtButton;
