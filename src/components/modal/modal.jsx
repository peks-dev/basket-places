import React from "react";
import "./modal.css";

// Componentes
import Button from "@/components/button/button";
import CloseIcon from "@/components/icons/close-icon";

const Modal = ({ children, onConfirm, onCancel, confirmBtnChild }) => {
  return (
    <dialog className="modal-overlay">
      <div className="modal">
        {children}
        <div className="modal__btns-wrap">
          <Button onClick={onCancel} variant={"secundary"}>
            <CloseIcon />
          </Button>
          <Button onClick={onConfirm}>{confirmBtnChild}</Button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
