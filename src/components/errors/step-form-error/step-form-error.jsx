import React from "react";
import "./step-form-error.css";
// utilities
import { fieldNamesToText } from "./utilities/field-names-to-text";

// components
import Button from "@/components/button/button";
import AlertIcon from "@/components/icons/alert-icon";
import WifiOffIcon from "@/components/icons/wifi-off-icon";

const StepFormError = ({ error, resetError }) => {
  const errorTypeContent = {
    ValidationError: { icon: <AlertIcon />, buttonText: "editar formulario" },
    ConnectionError: { icon: <WifiOffIcon />, buttonText: "volver a intentar" },
  };
  return (
    <div className="step-form-error">
      <div className="step-form-error__icon">
        {errorTypeContent[error.name].icon ? (
          errorTypeContent[error.name].icon
        ) : (
          <AlertIcon />
        )}
      </div>
      <p>{error.message}</p>
      <ul className="step-form-error__fields">
        {error.emptyFields &&
          error.emptyFields.map((field, index) => (
            <li key={index}>{fieldNamesToText[field]}</li>
          ))}
      </ul>
      <Button type={"button"} onClick={resetError}>
        {errorTypeContent[error.name].buttonText
          ? errorTypeContent[error.name].buttonText
          : "regresar"}
      </Button>
    </div>
  );
};

export default StepFormError;
