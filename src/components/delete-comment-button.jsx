import React, { useState } from "react";
// context
import { useToastStore } from "@/context/toastStore";
import { useCommentStore } from "@/context/commentsStore.";
// services
import { deleteDataOnTable } from "@/services/supabase/table-operations.service";

// components
import Button from "@/components/button/button";
import Modal from "@/components/modal/modal";
import LoaderBtn from "@/components/loader-btn/loader-btn";

const DeleteCommentButton = ({ courtId }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { changeFetchCommentsStatus, resetComments } = useCommentStore();
  const { createToast } = useToastStore();

  async function confirmDeleteComment() {
    try {
      setLoading(true);
      await deleteDataOnTable("reviews", "court_id", courtId);
      resetComments();
      changeFetchCommentsStatus();
      handleModal();
    } catch (error) {
      createToast("no se pudo eliminar el comentario", "error");
    } finally {
      setLoading(false);
    }
  }

  function handleModal() {
    setShowModal((prevState) => !prevState);
  }
  return (
    <>
      <Button
        type={"button"}
        onClick={handleModal}
        variant={"secundary"}
        customStyle={"delete-comment-button"}
      >
        eliminar
      </Button>
      {showModal ? (
        <Modal
          onConfirm={confirmDeleteComment}
          confirmBtnChild={loading ? <LoaderBtn /> : "si, eliminar"}
          onCancel={handleModal}
        >
          <h3 className="modal__title">eliminar?</h3>{" "}
          <p className="modal__text">
            al borrar este comentario no podrás recuperarlo
          </p>
        </Modal>
      ) : null}
    </>
  );
};

export default DeleteCommentButton;
