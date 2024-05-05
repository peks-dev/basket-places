import React, { useState } from "react";
// context
import { useUserStore } from "@/context/userStore.js";
import { useToastStore } from "@/context/toastStore";
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
  const { createToast } = useToastStore();

  function handleModal() {
    setShowModal((prevState) => !prevState);
  }

  async function handleDeleteCourt() {
    await deleteCourtById(profile.id, courtData.id, courtData.images);
  }

  // notification
  if (error) {
    createToast("no se pudo eliminar la cancha", "error");
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
          <h3 className="modal__title">eliminar?</h3>
          <p className="modal__text">
            si borras esta cancha no podrás revertir la acción
          </p>
        </Modal>
      ) : null}
    </>
  );
};

export default DeleteCourtButton;
