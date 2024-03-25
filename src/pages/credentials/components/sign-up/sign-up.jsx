import React, { useState, useContext } from "react";
import "./sign-up.css";

// services
import { register } from "../../../../services/supabase/auth.service";

// components
import Form from "../../../../components/form/form";
import FormField from "../../../../components/form/form-field/form-field";
import Title from "../../../../components/layout/title/title";
import Button from "@/components/button/button";

const SignUp = ({ notificationState, messageState }) => {
  const [formValues, setFormValues] = useState({ correo: "", contraseña: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  async function handleSignUp(e) {
    e.preventDefault();
    try {
      console.log("registrar");
      await register(formValues.correo, formValues.contraseña);
      if (error) {
        throw error;
      }
      messageState("Se te ha enviado un link a tu correo");
      notificationState(true);
    } catch (error) {
      if (error.message === "NetworkError when attempting to fetch resource.") {
        messageState("verifica tu conexion a internet");
        notificationState(true);
      } else {
        messageState("hubo un error al registrarte, intentalo nuevamente");
        notificationState(true);
      }
      console.log(error.message);
      return error;
    }
  }

  return (
    <>
      <Title
        tag={"h1"}
        text={"crear una nueva cuenta"}
        style={"title--center title--uppercase"}
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
        <Button variant={"primary"} onClick={handleSignUp}>
          registrarme
        </Button>
      </Form>
    </>
  );
};

export default SignUp;
