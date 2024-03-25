import React from "react";
import "./modal.css";

// Componentes
import Title from "../layout/title/title";
import Txt from "../layout/text-body/text-body";
import Button from "@/components/button/button";

const Modal = ({ title, message, children, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <Title text={title} tag={"h2"} />
        <Txt content={message} style={"txt--center"} />
        {children}
        <ul className="modal__btns-wrap">
          <li>
            <Button onClick={onCancel} variant={"secundary"}>
              cancelar
            </Button>
          </li>
          <li>
            <Button onClick={onConfirm} variant={"primary"}>
              confirmar
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Modal;
