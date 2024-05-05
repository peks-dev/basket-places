import React from "react";
import "./form-field-set.css";

const FormFieldSet = ({ children, variant, fieldsetTitle }) => {
  return (
    <fieldset className="fieldset" data-variant={variant ? variant : null}>
      {fieldsetTitle ? (
        <legend className="fieldset__title">{fieldsetTitle}:</legend>
      ) : null}
      {children}
    </fieldset>
  );
};

export default FormFieldSet;
