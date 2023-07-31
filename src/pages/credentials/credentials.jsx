// Hooks
import React, { useState, useEffect, useContext } from "react";
import "./credentials.css";

// context
import UserContext from "../../context/user/userContext";

// componentes
import CredentialImg from "../../assets/profile/add-bp.png";
import Title from "../../components/layout/title/title";
import Txt from "../../components/layout/text-body/text-body";
import Form from "../../components/form/form";
import NotificationPopup from "../../components/notification-popup/notification-popup";

// utilities
import { ResetNotification } from "../../utilities/reset-notification.utilitie";
import { register } from "../../services/auth.service";

function Credentials() {
  // Estados
  const [formValues, setFormValues] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const { userLogin } = useContext(UserContext);

  // Escuchador de notificacion
  useEffect(() => {
    ResetNotification(setShowNotification);
  }, [showNotification]);

  const handleLogin = async () => {
    try {
      await userLogin(formValues.email, formValues.contraseña);
      if (error) {
        throw error;
      }
    } catch (error) {
      if (error.message === "Invalid login credentials") {
        setNotificationMessage("Email o contraseña incorrectos");
        setShowNotification(true);
      }
    }
  };

  const handleSignUp = async () => {
    try {
      console.log("registrar");
      await register(formValues.email, formValues.contraseña);
      if (error) {
        throw error;
      }
      setNotificationMessage("Confirma tu Email");
      setShowNotification(true);
    } catch (error) {
      setNotificationMessage(error.message);
      setShowNotification(true);
      return error;
    }
  };

  // Contruccion del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const CAMPOS = [
    { name: "email", type: "email" },
    { name: "contraseña", type: "password" },
  ];

  const BUTTONS = [
    {
      text: "Registrar",
      type: "button",
      onClick: handleSignUp,
      className: "btn btn--secundary",
    },
    {
      text: "Entrar",
      type: "button",
      onClick: handleLogin,
      className: "btn btn--primary",
    },
  ];

  // Componente a renderizar
  return (
    <section className="credentials">
      <header className="credentials__header">
        <img
          className="credentials__img"
          src={CredentialImg}
          alt="Logo de basketplaces app señalando una registro"
        />
        <Title
          tag={"h1"}
          text={"Comparte y guarda BP's"}
          style={"title--primary"}
        />
        <Txt
          content={"Rellena los campos y registrate o inicia sesión"}
          style={"txt--small txt--center"}
        />
      </header>

      <Form
        campos={CAMPOS}
        buttons={BUTTONS}
        formValues={formValues}
        handleInputChange={handleInputChange}
        style={"form--credentials"}
      />
      {showNotification && <NotificationPopup message={notificationMessage} />}
    </section>
  );
}

export default Credentials;
