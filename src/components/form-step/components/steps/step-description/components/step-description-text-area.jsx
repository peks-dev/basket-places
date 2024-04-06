import React from "react";

const StepDescriptionTextArea = ({ handleValue, handleInputChange }) => {
  return (
    <fieldset className="form__field">
      <label htmlFor="descripcion" className="form__label">
        description
      </label>
      <textarea
        className="form__input"
        type="text"
        name="descripcion"
        value={handleValue}
        onChange={handleInputChange}
        id="descripcion"
        maxLength="135"
      />
    </fieldset>
  );
};

export default StepDescriptionTextArea;
