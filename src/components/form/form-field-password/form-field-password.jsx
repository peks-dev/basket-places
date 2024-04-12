import React, { useState } from "react";
import "./form-field-password.css";
// components
import Button from "@/components/button/button";

const FormFieldPassword = ({ inputValue, handleInputChange }) => {
  const [showPass, setShowPass] = useState(false);

  function handleShowPass() {
    setShowPass((prevState) => !prevState);
  }
  return (
    <fieldset className="form__field">
      <label className="form__label" htmlFor={"password"}>
        password
      </label>
      <input
        className="form__input"
        type={showPass ? "text" : "password"}
        id="password"
        name="password"
        value={inputValue || ""}
        onChange={handleInputChange}
      />

      <Button
        type={"button"}
        variant={"secundary"}
        onClick={handleShowPass}
        customStyle={showPass && "active"}
      >
        mostrar
      </Button>
    </fieldset>
  );
};

export default FormFieldPassword;
