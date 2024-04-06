import React from "react";
import "./error-display.css";
// utilities
import { fieldNamesToText } from "./utilities/field-names-to-text";

// components
import Button from "@/components/button/button";
import AlertIcon from "@/components/icons/alert-icon";
import WifiOffIcon from "@/components/icons/wifi-off-icon";

const ErrorDisplay = ({ error, resetError }) => {
  const errorTypeContent = {
    ValidationError: { icon: <AlertIcon />, buttonText: "editar formulario" },
    ConnectionError: { icon: <WifiOffIcon />, buttonText: "volver a intentar" },
  };
  return (
    <div className="error-display">
      <div className="error-display__icon">
        {errorTypeContent[error.name].icon ? (
          errorTypeContent[error.name].icon
        ) : (
          <AlertIcon />
        )}
      </div>
      <p>{error.message}</p>
      <ul className="error-display__fields">
        {error.emptyFields &&
          error.emptyFields.map((field, index) => (
            <li key={index}>{fieldNamesToText[field]}</li>
          ))}
      </ul>

      {resetError && ( // render only when have reset function
        <Button type={"button"} onClick={resetError}>
          {errorTypeContent[error.name].buttonText
            ? errorTypeContent[error.name].buttonText
            : "regresar"}
        </Button>
      )}
    </div>
  );
};

export default ErrorDisplay;
