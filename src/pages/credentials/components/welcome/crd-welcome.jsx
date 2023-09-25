import React from "react";
import "./crd-welcome.css";

// components
import CredentialImg from "../../../../assets/profile/add-bp.png";
import Btn from "../../../../components/layout/button/button";
import Title from "../../../../components/layout/title/title";
import Txt from "../../../../components/layout/text-body/text-body";

const CredentialsWelcome = ({ setState }) => {
  function renderLoginForm() {
    setState("login");
  }
  function renderRegisterForm() {
    setState("register");
  }
  return (
    <>
      <header className="crd-welcome__header">
        <img
          className="crd-welcome__img"
          src={CredentialImg}
          alt="Logo de basketplaces app señalando una registro"
        />
        <Title
          tag={"h1"}
          text={"Registra y comparte BP's"}
          style={"title--primary"}
        />
        <Txt
          content={"Rellena los campos y registrate o inicia sesión"}
          style={"txt--small txt--center"}
        />
      </header>

      <ul className="crd-welcome__btns-container">
        <li className="crd-welcome__btn-wrap">
          <Btn
            text={"iniciar sesion"}
            variant={"btn--primary"}
            onClick={renderLoginForm}
          />
        </li>
        <li className="crd-welcome__btn-wrap">
          <Btn
            text={"registrarme"}
            variant={"btn--secundary btn--small"}
            onClick={renderRegisterForm}
          />
        </li>
      </ul>
    </>
  );
};

export default CredentialsWelcome;
