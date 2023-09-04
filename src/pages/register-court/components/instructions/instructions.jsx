import React from "react";
import "./instructions.css";
// Components
import Title from "../../../../components/layout/title/title";
import Txt from "../../../../components/layout/text-body/text-body";
import Btn from "../../../../components/layout/button/button";
import logoSite from "../../../../assets/global/bp-logo.svg";

const Instructions = ({ onClick }) => {
  return (
    <section className="instructions">
      <header className="instructions__header">
        <Title
          text={"Registrar Basket Place"}
          tag={"h2"}
          style={"title--center"}
        />
      </header>
      <div className="instructions__body">
        <img
          className="instructions__img"
          src={logoSite}
          alt="logo de basket places"
        />
        <Title
          text={"Instrucciones"}
          tag={"h2"}
          style={"title--small title--yellow title--left"}
        />
        <ul className="instructions-content">
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
        <Btn
          onClick={() => {
            onClick(true);
          }}
          variant={"btn--primary"}
          text={"Empezar"}
        />
      </div>
    </section>
  );
};

export default Instructions;
