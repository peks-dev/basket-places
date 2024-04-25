import React from "react";
import "./form-field.css";

const FormField = ({
  inputName,
  inputType,
  inputValue,
  inputId,
  inputChecked,
  handleInputChange,
  legendText,
  limit,
}) => {
  return (
    <fieldset className="form__field">
      {legendText && <legend className="form__legend">{legendText}</legend>}

      <label className="form__label" htmlFor={inputId}>
        {inputName}
      </label>
      <input
        className="form__input"
        type={inputType}
        id={inputId}
        name={inputName}
        value={inputValue || ""}
        onChange={handleInputChange}
        checked={inputChecked}
        maxLength={limit ? limit : null}
      />
    </fieldset>
  );
};

export default FormField;
