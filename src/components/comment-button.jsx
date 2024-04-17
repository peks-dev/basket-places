import React, { useState } from "react";
// components
import Button from "@/components/button/button";
import Modal from "@/components/modal/modal";
import ReviewForm from "./review-form/review-form";

const CommentButton = () => {
  const [showModal, setShowModal] = useState(false);

  function handleModal() {
    setShowModal((prevState) => !prevState);
  }

  return (
    <>
      <Button type={"button"} onClick={handleModal}>
        comentar
      </Button>
      {showModal ? (
        <Modal onCancel={handleModal} confirmBtnChild={"enviar"}>
          <h4 className="modal__title">dejar valoracion</h4>
          <ReviewForm />
        </Modal>
      ) : null}
    </>
  );
};

export default CommentButton;
