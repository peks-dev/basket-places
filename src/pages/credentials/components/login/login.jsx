import React, { useState, useContext } from "react";
import "./login.css";

// context
import UserContext from "../../../../context/user/userContext";

// components
import Form from "../../../../components/form/form";
import FormField from "../../../../components/form/form-field/form-field";
import Title from "../../../../components/layout/title/title";
import Btn from "../../../../components/layout/button/button";

const Login = ({ notificationState, messageState }) => {
  const [formValues, setFormValues] = useState({ correo: "", contraseña: "" });
  const { userLogin } = useContext(UserContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await userLogin(formValues.correo, formValues.contraseña);
      if (error) {
        throw error;
      }
    } catch (error) {
      if (error.message === "Invalid login credentials") {
        messageState("Email o contraseña incorrectos");
        notificationState(true);
      }
    }
  }

  function handleRecoveryPass(e) {
    e.preventDefault();
    if (formValues.correo === "") {
      messageState("escribe tu correo valido");
      notificationState(true);
    } else {
      messageState("se te ha enviado un link de recuperacion a tu correo");
      notificationState(true);
    }
  }
  return (
    <>
      <Title
        tag={"h1"}
        text={"Bienvenid@ de vuelta!"}
        style={"title--center"}
      />
      <Form>
        <FormField
          inputName={"correo"}
          inputType={"email"}
          inputValue={formValues.correo}
          handleInputChange={handleInputChange}
        />
        <FormField
          inputName={"contraseña"}
          inputType={"password"}
          inputValue={formValues.contraseña}
          handleInputChange={handleInputChange}
        />
        <Btn text={"ingresar"} variant={"btn--primary"} onClick={handleLogin} />
        <Btn
          text={"recuperar contraseña"}
          variant={"btn--secundary btn--small"}
          onClick={handleRecoveryPass}
        />
      </Form>
    </>
  );
};

export default Login;
