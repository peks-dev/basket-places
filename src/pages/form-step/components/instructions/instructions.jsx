import React from "react";
import "./instructions.css";
// Components
import Txt from "../../../../components/layout/text-body/text-body";
import Btn from "../../../../components/layout/button/button";

const Instructions = ({ onClick }) => {
  return (
    <div className="instructions">
      <ul className="instructions-content">
        Instrucciones
        <li>
          <Txt content={"1.Usa fotos horizontales"} />
        </li>
        <li>
          <Txt content={"2.Sube 2 fotos como minimo y 4 como máximo"} />
        </li>
        <li>
          <Txt content={"3.Acepta los permisos de ubicacion"} />
        </li>
      </ul>
      <Btn onClick={onClick} variant={"btn--primary"} text={"Empezar"} />
    </div>
  );
};

export default Instructions;
