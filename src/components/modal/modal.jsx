import React from "react";
import "./modal.css";

// Componentes
import Title from "../layout/title/title";
import Txt from "../layout/text-body/text-body";
import Btn from "../layout/button/button";

const Modal = ({ title, message, children, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <Title text={title} tag={"h2"} />
        <Txt content={message} style={"txt--center"} />
        {children}
        <ul className="modal__btns-wrap">
          <li>
            <Btn
              onClick={onCancel}
              text={"cancelar"}
              variant={"btn--secundary"}
            />
          </li>
          <li>
            <Btn
              onClick={onConfirm}
              text={"confirmar"}
              variant={"btn--primary"}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Modal;
